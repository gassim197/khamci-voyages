import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  createQuote, getAllQuotes, updateQuoteStatus, deleteQuote,
  createTestimonial, getAllTestimonials, getApprovedTestimonials, updateTestimonialStatus, deleteTestimonial,
} from "./db";
import { sendNewQuoteNotification, sendQuoteConfirmationToClient, sendNewTestimonialNotification } from "./email";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "khamci2024";

const adminProcedure = publicProcedure.use(({ ctx, next }) => {
  const token = (ctx.req as any).headers["x-admin-token"];
  if (token !== ADMIN_PASSWORD) {
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
      .mutation(({ input }) => {
        if (input.password !== ADMIN_PASSWORD) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Mot de passe incorrect" });
        }
        return { success: true, token: ADMIN_PASSWORD };
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
