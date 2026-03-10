/**
 * KHAMCI VOYAGES — Chatbot IA spécialisé
 *
 * Endpoint de chat avec un system prompt dédié à l'agence de voyages.
 * Répond aux questions fréquentes et guide vers la demande de devis.
 */

import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import type { Express } from "express";
import { ENV } from "./_core/env";
import { createPatchedFetch } from "./_core/patchedFetch";

const KHAMCI_SYSTEM_PROMPT = `Tu es l'assistant virtuel de KHAMCI VOYAGES, une agence de voyages basée en Guinée Conakry.
Tu t'appelles "Khamci Bot" et tu réponds toujours en français, de manière chaleureuse, professionnelle et concise.

## À propos de KHAMCI VOYAGES
- Agence de voyages basée à Conakry, Guinée
- Spécialisée dans les vols, hôtels, location de voitures, voyages organisés, assistance visa et team building
- Contact : +224 611 145 892 | khamcivoyages@gmail.com
- Réponse garantie sous 24h pour tous les devis
- Plus de 15 ans d'expertise locale
- Plus de 500 voyageurs satisfaits

## Destinations populaires
- Paris (France) — Vols depuis Conakry via Air Sénégal, Royal Air Maroc, Air France
- Dubaï (Émirats Arabes Unis) — Destination luxe et affaires
- New York (USA) — Visa requis, délai 2-4 semaines
- Casablanca (Maroc) — Vols directs fréquents
- Bangkok (Thaïlande) — Destination exotique
- Barcelone (Espagne) — Visa Schengen requis

## Services proposés
1. **Billets d'avion** — Toutes compagnies, meilleurs tarifs, vols directs et avec escales
2. **Réservations d'hôtels** — De l'économique au luxe, partout dans le monde
3. **Location de voitures** — Avec ou sans chauffeur, à l'arrivée ou sur place
4. **Voyages organisés** — Circuits complets avec hébergement, transport et guide
5. **Assistance visa** — Préparation du dossier, rendez-vous consulaires, suivi
6. **Team Building** — Séminaires d'entreprise, voyages de motivation, événements

## Informations sur les visas
- Schengen (Europe) : délai 15-21 jours, documents requis : passeport, photos, justificatifs financiers, assurance voyage
- USA : délai 4-8 semaines, entretien consulaire obligatoire
- Dubaï : visa à l'arrivée pour certains passeports, sinon 3-5 jours
- Maroc : pas de visa pour les Guinéens (séjour < 90 jours)
- Thaïlande : visa on arrival disponible

## Tarifs indicatifs (prix variables selon disponibilité)
- Vol Conakry-Paris : à partir de 650 000 GNF (aller simple)
- Vol Conakry-Casablanca : à partir de 280 000 GNF (aller simple)
- Hôtel 3 étoiles Paris : à partir de 80€/nuit
- Assistance visa Schengen : 50 000 GNF (frais de service)

## Règles de réponse
- Réponds toujours en français
- Sois chaleureux, professionnel et concis (max 3-4 phrases par réponse)
- Pour les demandes de devis précis, invite toujours à remplir le formulaire sur le site ou à appeler le +224 611 145 892
- Si tu ne connais pas un tarif précis, dis que les prix varient et invite à demander un devis gratuit
- N'invente jamais de prix ou de disponibilités spécifiques
- Mentionne le délai de réponse de 24h pour rassurer
- Utilise des emojis avec modération pour rendre les réponses plus vivantes

## Exemples de questions fréquentes
- "Combien coûte un vol pour Paris ?" → Donne une fourchette et invite à demander un devis
- "Avez-vous besoin d'un visa pour Dubai ?" → Explique les conditions
- "Comment réserver un hôtel ?" → Explique le processus et invite à contacter l'agence
- "Quels documents pour le visa Schengen ?" → Liste les documents principaux
`;

// Convert UIMessage format (parts) to CoreMessage format (content string)
function toCoreMsgs(messages: unknown[]): { role: "user" | "assistant"; content: string }[] {
  return messages
    .filter((m): m is { role: string; parts?: { type: string; text?: string }[]; content?: string } =>
      typeof m === "object" && m !== null && "role" in m
    )
    .filter(m => m.role === "user" || m.role === "assistant")
    .map(m => {
      let content = "";
      if (typeof m.content === "string") {
        content = m.content;
      } else if (Array.isArray(m.parts)) {
        content = m.parts
          .filter(p => p.type === "text" && typeof p.text === "string")
          .map(p => p.text!)
          .join("");
      }
      return { role: m.role as "user" | "assistant", content };
    })
    .filter(m => m.content.trim().length > 0);
}

export function registerKhamciChatRoutes(app: Express) {
  const openai = createOpenAI({
    baseURL: ENV.forgeApiUrl.endsWith("/v1")
      ? ENV.forgeApiUrl
      : `${ENV.forgeApiUrl}/v1`,
    apiKey: ENV.forgeApiKey,
    fetch: createPatchedFetch(fetch),
  });

  app.post("/api/chat/khamci", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "messages array is required" });
        return;
      }

      // Convert UIMessage (parts) format to CoreMessage (content) format
      const coreMessages = toCoreMsgs(messages);

      if (coreMessages.length === 0) {
        res.status(400).json({ error: "No valid messages found" });
        return;
      }

      const result = streamText({
        model: openai.chat("gpt-4o-mini"),
        system: KHAMCI_SYSTEM_PROMPT,
        messages: coreMessages,
        maxOutputTokens: 400,
      });

      result.pipeUIMessageStreamToResponse(res);
    } catch (error) {
      console.error("[/api/chat/khamci] Error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
}
