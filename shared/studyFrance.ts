import { z } from "zod";

export const studyOptions = {
  level: [
    "Licence 1",
    "Licence 2 ou 3",
    "Master",
    "Doctorat",
    "Autre / à préciser",
  ],
  progress: [
    "Je commence mon projet",
    "Je prépare mon dossier",
    "J’ai déjà candidaté",
    "J’ai une admission",
  ],
  funding: [
    "Financement prévu",
    "Financement en recherche",
    "À préciser avec le conseiller",
  ],
} as const;

export const studyContactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom complet.").max(120),
  phone: z
    .string()
    .trim()
    .min(9, "Indiquez un numéro joignable avec son indicatif.")
    .max(30)
    .regex(/^\+?[0-9 ()-]+$/, "Vérifiez le numéro de téléphone.")
    .refine(
      v =>
        v.replace(/\D/g, "").length >= 9 && v.replace(/\D/g, "").length <= 15,
      "Vérifiez le numéro de téléphone."
    ),
  email: z.string().trim().email("Indiquez une adresse email valide.").max(320),
  city: z.string().trim().min(2, "Indiquez votre ville de résidence.").max(100),
});
export const studyApplicationSchema = studyContactSchema.extend({
  diploma: z
    .string()
    .trim()
    .min(2, "Indiquez votre dernier diplôme ou votre classe actuelle.")
    .max(120),
  level: z.enum(studyOptions.level, { error: "Choisissez le niveau visé." }),
  field: z
    .string()
    .trim()
    .min(2, "Indiquez le domaine qui vous intéresse.")
    .max(160),
  intake: z
    .string()
    .trim()
    .min(4, "Précisez la rentrée souhaitée, ou indiquez « À définir ».")
    .max(80),
  progress: z.enum(studyOptions.progress, {
    error: "Précisez votre avancement.",
  }),
  funding: z.enum(studyOptions.funding, {
    error: "Précisez la situation du financement.",
  }),
  notes: z.string().trim().max(1000).default(""),
  consent: z.literal(true, {
    error:
      "Votre accord est nécessaire pour traiter la demande et vous recontacter.",
  }),
  website: z.string().max(0).default(""),
  campaign: z
    .object({
      source: z.string().max(100).default(""),
      medium: z.string().max(100).default(""),
      name: z.string().max(100).default(""),
      content: z.string().max(100).default(""),
    })
    .default({ source: "", medium: "", name: "", content: "" }),
});
export type StudyApplication = z.infer<typeof studyApplicationSchema>;

// A readable record keeps the existing admin details and CSV export compatible.
export function studyApplicationMessage(
  input: StudyApplication,
  receivedAt: string
) {
  return [
    "PRÉINSCRIPTION ÉTUDES FRANCE",
    `Ville de résidence : ${input.city}`,
    `Dernier diplôme / classe : ${input.diploma}`,
    `Niveau visé : ${input.level}`,
    `Domaine souhaité : ${input.field}`,
    `Rentrée envisagée : ${input.intake}`,
    `Avancement : ${input.progress}`,
    `Financement : ${input.funding}`,
    `Précisions : ${input.notes || "Non renseignées"}`,
    `Accord de contact et traitement : oui — ${receivedAt} (formulaire France v1)`,
    `Campagne : ${JSON.stringify(input.campaign)}`,
  ].join("\n");
}
