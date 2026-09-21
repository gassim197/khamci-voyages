import { TRPCError } from "@trpc/server";
import {
  studyApplicationSchema,
  studyApplicationMessage,
} from "../shared/studyFrance";
import { router, publicProcedure } from "./_core/trpc";
import { createQuote } from "./db";
import { sendStudyApplicationNotification } from "./email";

export const studyFranceRouter = router({
  submit: publicProcedure
    .input(studyApplicationSchema)
    .mutation(async ({ input }) => {
      const message = studyApplicationMessage(input, new Date().toISOString());
      try {
        await createQuote({
          clientName: input.name,
          clientEmail: input.email,
          clientPhone: input.phone,
          destination: "France",
          serviceType: "etudes_france",
          source: "etudes-france",
          status: "pending",
          passengers: null,
          message,
        });
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Votre demande n’a pas pu être enregistrée. Réessayez ou appelez le +224 611 14 58 92.",
        });
      }
      // Storage is authoritative: an email outage must not trigger duplicate submissions.
      void sendStudyApplicationNotification({
        name: input.name,
        email: input.email,
        phone: input.phone,
        message,
      }).catch(() =>
        console.error(
          "[Études France] Notification indisponible ; demande enregistrée."
        )
      );
      return { success: true } as const;
    }),
});
