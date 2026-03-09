import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  createQuote, getAllQuotes, updateQuoteStatus, deleteQuote, getQuoteStats,
  createTestimonial, getAllTestimonials, getApprovedTestimonials, updateTestimonialStatus, deleteTestimonial,
  verifyAdminPassword, setAdminPassword,
} from "./db";
import { sendNewQuoteNotification, sendQuoteConfirmationToClient, sendNewTestimonialNotification } from "./email";

// adminProcedure vérifie le token dans les headers (token = mot de passe en clair pour la session)
const adminProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const token = (ctx.req as any).headers["x-admin-token"] as string | undefined;
  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Accès non autorisé" });
  }
  const isValid = await verifyAdminPassword(token);
  if (!isValid) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Accès non autorisé" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    adminLogin: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(async ({ input }) => {
        const isValid = await verifyAdminPassword(input.password);
        if (!isValid) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Mot de passe incorrect" });
        }
        // Le token de session = le mot de passe en clair (vérifié côté serveur à chaque requête)
        return { success: true, token: input.password };
      }),

    changeAdminPassword: adminProcedure
      .input(z.object({
        currentPassword: z.string().min(1),
        newPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
        confirmPassword: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        if (input.newPassword !== input.confirmPassword) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Les mots de passe ne correspondent pas" });
        }
        // Vérifier l'ancien mot de passe
        const isValid = await verifyAdminPassword(input.currentPassword);
        if (!isValid) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Mot de passe actuel incorrect" });
        }
        await setAdminPassword(input.newPassword);
        return { success: true };
      }),
  }),

  quotes: router({
    submit: publicProcedure
      .input(z.object({
        clientName: z.string().min(2),
        clientEmail: z.string().email(),
        clientPhone: z.string().optional(),
        destination: z.string().optional(),
        departureDate: z.string().optional(),
        returnDate: z.string().optional(),
        passengers: z.number().min(1).max(20).optional(),
        serviceType: z.string().optional(),
        message: z.string().optional(),
        source: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createQuote({
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          clientPhone: input.clientPhone ?? null,
          destination: input.destination ?? null,
          departureDate: input.departureDate ?? null,
          returnDate: input.returnDate ?? null,
          passengers: input.passengers ?? 1,
          serviceType: input.serviceType ?? null,
          message: input.message ?? null,
          source: input.source ?? "website",
          status: "pending",
        });
        Promise.all([
          sendNewQuoteNotification(input),
          sendQuoteConfirmationToClient(input),
        ]).catch(err => console.error("[Email] Error:", err));
        return { success: true };
      }),

    list: adminProcedure.query(async () => getAllQuotes()),

    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "in_progress", "completed", "rejected"]),
        adminNotes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateQuoteStatus(input.id, input.status, input.adminNotes);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteQuote(input.id);
        return { success: true };
      }),

    stats: adminProcedure.query(async () => {
      const { recentQuotes, allQuotes } = await getQuoteStats();

      // Agrégation par jour (7 derniers jours)
      const last7Days: Record<string, { date: string; total: number; pending: number; completed: number }> = {};
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const label = d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
        last7Days[key] = { date: label, total: 0, pending: 0, completed: 0 };
      }

      // Agrégation par semaine (8 dernières semaines)
      const last8Weeks: Record<string, { week: string; total: number; pending: number; completed: number }> = {};
      for (let i = 7; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i * 7);
        // Trouver le lundi de cette semaine
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        d.setDate(diff);
        const key = d.toISOString().slice(0, 10);
        const label = `Sem. ${d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`;
        if (!last8Weeks[key]) {
          last8Weeks[key] = { week: label, total: 0, pending: 0, completed: 0 };
        }
      }

      // Remplir les données
      for (const q of recentQuotes) {
        const dateKey = new Date(q.createdAt).toISOString().slice(0, 10);
        if (last7Days[dateKey]) {
          last7Days[dateKey].total++;
          if (q.status === "pending") last7Days[dateKey].pending++;
          if (q.status === "completed") last7Days[dateKey].completed++;
        }
        // Trouver la semaine
        const qDate = new Date(q.createdAt);
        const day = qDate.getDay();
        const diff = qDate.getDate() - day + (day === 0 ? -6 : 1);
        qDate.setDate(diff);
        const weekKey = qDate.toISOString().slice(0, 10);
        if (last8Weeks[weekKey]) {
          last8Weeks[weekKey].total++;
          if (q.status === "pending") last8Weeks[weekKey].pending++;
          if (q.status === "completed") last8Weeks[weekKey].completed++;
        }
      }

      // Répartition par type de service
      const serviceCount: Record<string, number> = {};
      for (const q of allQuotes) {
        const svc = q.serviceType || "autre";
        serviceCount[svc] = (serviceCount[svc] || 0) + 1;
      }
      const serviceData = Object.entries(serviceCount).map(([name, value]) => ({
        name: { vol: "Vols", hotel: "Hôtels", visa: "Visa", circuit: "Circuits", custom: "Personnalisé", team_building: "Team Building", autre: "Autre" }[name] || name,
        value,
      }));

      // Répartition par statut
      const statusCount = {
        pending: allQuotes.filter(q => q.status === "pending").length,
        in_progress: allQuotes.filter(q => q.status === "in_progress").length,
        completed: allQuotes.filter(q => q.status === "completed").length,
        rejected: allQuotes.filter(q => q.status === "rejected").length,
      };

      return {
        byDay: Object.values(last7Days),
        byWeek: Object.values(last8Weeks),
        byService: serviceData,
        byStatus: [
          { name: "En attente", value: statusCount.pending, color: "#F59E0B" },
          { name: "En cours", value: statusCount.in_progress, color: "#3B82F6" },
          { name: "Complétés", value: statusCount.completed, color: "#10B981" },
          { name: "Rejetés", value: statusCount.rejected, color: "#EF4444" },
        ],
        totals: {
          all: allQuotes.length,
          pending: statusCount.pending,
          inProgress: statusCount.in_progress,
          completed: statusCount.completed,
          rejected: statusCount.rejected,
        },
      };
    }),
  }),

  testimonials: router({
    submit: publicProcedure
      .input(z.object({
        clientName: z.string().min(2),
        clientTitle: z.string().optional(),
        clientLocation: z.string().optional(),
        content: z.string().min(20),
        rating: z.number().min(1).max(5).optional(),
      }))
      .mutation(async ({ input }) => {
        await createTestimonial({
          clientName: input.clientName,
          clientTitle: input.clientTitle ?? null,
          clientLocation: input.clientLocation ?? null,
          content: input.content,
          rating: input.rating ?? 5,
          status: "pending",
        });
        sendNewTestimonialNotification(input).catch(console.error);
        return { success: true };
      }),

    listApproved: publicProcedure.query(async () => getApprovedTestimonials()),

    listAll: adminProcedure.query(async () => getAllTestimonials()),

    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "approved", "rejected"]),
      }))
      .mutation(async ({ input }) => {
        await updateTestimonialStatus(input.id, input.status);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteTestimonial(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
