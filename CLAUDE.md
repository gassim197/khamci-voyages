# CLAUDE.md — Khamci Voyages

> Fichier de contexte pour les sessions Claude Code travaillant sur ce projet.
> **Phase actuelle** : migration de sortie de Manus (branche `migration/detach-manus`).
> Voir `MIGRATION_PLAN.md` pour le plan détaillé.

---

## Projet

**Khamci Voyages** est le site web de l'agence de voyages basée à Conakry (Guinée), spécialisée dans la billetterie aérienne, l'hôtellerie, la location de véhicules, les visas et le team building. Le site sert deux fonctions : vitrine institutionnelle et captation de leads via des formulaires de devis. WhatsApp est le canal de conversion principal.

- **Cible** : voyageurs guinéens et entreprises ouest-africaines.
- **Langue** : français exclusivement.
- **Public** : large (B2C particuliers + B2B entreprises).

---

## État actuel : migration en cours

Le projet a été initialement généré avec **Manus**. Une migration est en cours pour le détacher complètement de l'écosystème Manus et le redéployer de manière autonome. Avant chaque modification, vérifier dans quelle phase de `MIGRATION_PLAN.md` nous sommes.

### Couches Manus à éliminer

1. ❌ OAuth Manus (`server/_core/oauth.ts`, `sdk.ts`, `types/manusTypes.ts`) — à supprimer
2. ❌ Proxy forge (storage, AI, maps, image gen, voice) — à remplacer
3. ❌ Plugin runtime Vite (`vite-plugin-manus-runtime`) — à supprimer
4. ❌ CDN Manus (vidéo hero, URLs admin dans emails) — à remplacer

### Cibles de remplacement

| Service Manus | Remplaçant |
|---|---|
| Forge storage proxy | **Cloudflare R2** (S3-compatible) |
| Forge AI proxy (OpenAI) | ❌ **Chatbot retiré (standby V1.5)** |
| Forge Google Maps proxy | ❌ **Code Maps mort supprimé** |
| OAuth Manus | **Supprimé** (les visiteurs n'ont pas de compte ; admin reste sur password) |
| Hébergement Manus | **Render** (Web Service Node) |
| Base Manus | **Neon** (Postgres) |

---

## Stack technique

### Frontend
- **React 19** + TypeScript strict
- **Vite 7** comme bundler
- **Wouter** pour le routing (léger, pas React Router)
- **Tailwind CSS 4** + **shadcn/ui** (composants Radix)
- **framer-motion** pour les animations
- **TanStack Query** + **tRPC client** pour les appels API
- **react-hook-form** + **zod** pour les formulaires

### Backend
- **Express** + **tRPC** (serveur unique qui sert l'API et le SPA buildé)
- **Drizzle ORM** sur **Postgres** (Neon serverless)
- **Nodemailer** (SMTP Gmail) pour les emails transactionnels
- **bcryptjs** pour le hash du mot de passe admin
- **AI SDK** (`ai`) pour le streaming du chatbot

### Architecture de déploiement
**Un seul processus Node** sert à la fois l'API tRPC et le SPA React buildé. Le build produit `dist/index.js` (serveur) + `dist/public/` (SPA). Pas de séparation front/back en production — important pour le choix d'hébergement (Render/Railway, pas Vercel/Netlify nativement).

---

## Structure du projet

```
khamci-voyages/
├── client/                    # Frontend React (Vite)
│   ├── public/                # Assets statiques (logo, favicon, robots, sitemap)
│   └── src/
│       ├── components/        # Composants applicatifs
│       │   └── ui/            # Composants shadcn/ui (ne pas modifier directement)
│       ├── pages/             # Pages routées par Wouter
│       │   └── services/      # Pages de chaque service (visa, hôtel, etc.)
│       ├── contexts/          # Contextes React (Admin, Theme)
│       ├── hooks/             # Hooks custom
│       ├── data/              # Données statiques (blog, témoignages, destinations)
│       ├── lib/               # Utilitaires (tRPC client, analytics)
│       └── App.tsx            # Routing principal
├── server/                    # Backend Express + tRPC
│   ├── _core/                 # Infrastructure (à nettoyer pendant la migration)
│   ├── chatKhamci.ts          # Chatbot Khamci Bot (à migrer vers Anthropic)
│   ├── db.ts                  # Helpers DB Drizzle
│   ├── email.ts               # Templates et envoi d'emails
│   ├── routers.ts             # Routeur tRPC principal
│   ├── storage.ts             # Upload fichiers (à migrer vers R2)
│   └── uploadRoutes.ts        # Routes Express upload
├── shared/                    # Code partagé client/serveur
│   └── types.ts               # Types Drizzle réexportés
├── drizzle/                   # Schémas et migrations Drizzle
│   ├── schema.ts              # Schéma des 6 tables
│   └── migrations/            # Migrations SQL générées
└── patches/                   # Patches pnpm (wouter)
```

---

## Commandes

```bash
# Développement
pnpm dev              # tsx watch sur server/_core/index.ts (sert API + Vite HMR)

# Type checking
pnpm check            # tsc --noEmit (à passer avant chaque commit)

# Tests
pnpm test             # vitest run (18 tests existants à préserver)

# Build production
pnpm build            # vite build + esbuild server → dist/
pnpm start            # node dist/index.js (test de la prod en local)

# Database
pnpm db:push          # drizzle-kit generate && drizzle-kit migrate

# Formatage
pnpm format           # prettier --write .
```

---

## Conventions de code

### Style général
- **TypeScript strict** activé — pas de `any` implicite, gérer tous les cas.
- **Imports** : alias `@/` pour `client/src/`, `@shared/` pour `shared/`. Vérifier dans `tsconfig.json` et `vite.config.ts`.
- **Composants** : un composant par fichier, nommé en PascalCase.
- **Hooks custom** : préfixe `use`, dans `client/src/hooks/`.

### Tailwind / shadcn
- Toujours utiliser les variables de couleur Tailwind avec les variantes `dark:` (le mode sombre est en production).
- Les composants `client/src/components/ui/*` sont générés par shadcn — ne pas les modifier sauf nécessité réelle.
- Pour ajouter un composant shadcn : `pnpm dlx shadcn-ui@latest add <component>`.

### tRPC
- Toutes les routes serveur passent par `server/routers.ts`.
- Les routes admin utilisent `adminProcedure` (vérifie le mot de passe dans le header Authorization).
- Les routes publiques utilisent `publicProcedure`.
- Pas de nouvelle route REST sauf cas justifié (uploads, OAuth callback) — privilégier tRPC.

### Base de données (Drizzle)
- Schéma dans `drizzle/schema.ts`. Toute modification doit être suivie de `pnpm db:push`.
- Les helpers DB sont dans `server/db.ts` — y centraliser les requêtes plutôt que d'inliner.
- `getDb()` retourne `null` si pas de `DATABASE_URL` (pour permettre le tooling local).

### Formulaires
- `react-hook-form` + résolveur `zod`. Schéma zod dans le composant ou dans `shared/`.
- Toujours afficher les erreurs de validation inline.
- Toujours tracker l'événement de conversion via `client/src/lib/analytics.ts` après soumission réussie.

### Emails
- Templates HTML dans `server/email.ts` (fonctions `*Template`).
- Toujours utiliser `process.env.PUBLIC_SITE_URL` pour les liens admin — **jamais d'URL en dur**.

---

## Règles strictes

### À ne JAMAIS faire

- ❌ Committer un fichier `.env` ou une clé API (même un commit éphémère).
- ❌ Hardcoder le mot de passe admin ou un fallback (`"khamci2024"` doit disparaître — voir `server/db.ts`).
- ❌ Ajouter une dépendance Manus (`vite-plugin-manus-runtime`, `manuscdn`, proxy forge).
- ❌ Mettre une URL `manus.space` ou `manuscdn.com` dans le code ou les templates email.
- ❌ Utiliser `localStorage` / `sessionStorage` pour de l'état sensible (CSRF, auth) — passer par les cookies httpOnly.
- ❌ Modifier les composants `client/src/components/ui/*` sans bonne raison.
- ❌ Désactiver le mode strict TypeScript.

### À TOUJOURS faire

- ✅ Lancer `pnpm check` avant de commit.
- ✅ Vérifier que `pnpm test` passe (18 tests Vitest).
- ✅ Vérifier qu'une variable d'environnement n'est utilisée que via `ENV` (depuis `server/_core/env.ts`), jamais via `process.env` direct dans le code applicatif.
- ✅ Pour toute modification de schéma DB : générer la migration avec `pnpm db:push`.
- ✅ Pour tout texte affiché : en **français** (la cible est francophone).
- ✅ Conserver le **dark mode** : tester chaque composant avec `dark:` classes.
- ✅ Pour les images : alt text descriptif (accessibilité + SEO).

---

## Variables d'environnement

Voir `.env.example` pour la liste complète. Variables critiques :

| Variable | Usage | Obligatoire |
|---|---|---|
| `DATABASE_URL` | Chaîne MySQL (PlanetScale) | Oui |
| `ADMIN_PASSWORD` | Mot de passe du dashboard admin | Oui (prod) |
| `JWT_SECRET` | Signature des sessions admin | Oui |
| `GMAIL_USER` + `GMAIL_APP_PASSWORD` | SMTP transactionnel | Oui |
| `R2_*` | Stockage uploads | Oui (après Phase 2.1) |
| `PUBLIC_SITE_URL` | URL canonique (liens emails, OG) | Oui |

**Variables supprimées (anciennes Manus)** : `VITE_APP_ID`, `OAUTH_SERVER_URL`, `OWNER_OPEN_ID`, `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY`.

---

## Tables de la base de données

6 tables, toutes MySQL pour l'instant :

- **`users`** — comptes utilisateurs (ne sert plus depuis suppression de l'OAuth ; peut être supprimée en V1.5).
- **`quotes`** — demandes de devis (vols/hôtels/voitures/services). Cœur métier.
- **`testimonials`** — témoignages clients avec workflow d'approbation.
- **`admin_settings`** — paire clé/valeur pour mot de passe hashé et profil admin.
- **`newsletter_subscribers`** — abonnés à la newsletter.
- **`blog_posts`** — articles de blog avec slug, statut publication.

---

## Points d'attention métier

- **Numéro WhatsApp** : `+224 611 14 58 92` — bouton flottant, lien dans le footer, system prompt chatbot.
- **Email contact** : `khamcivoyages@gmail.com`.
- **Promesse** : réponse sous 24h pour tous les devis. À refléter partout.
- **Offre de lancement** : -5% sur tout billet d'avion après devis.
- **Partenaires institutionnels** mentionnés dans le chatbot : SOGEFEL, Métal Plus, EIFFAGE, Guinée Gaz, Ministère de la Pêche.
- **Services Hadj & Oumra** : présents mais avec une saisonnalité forte.

---

## Sessions Claude Code typiques

### Pour une nouvelle tâche de migration

1. Vérifier la phase actuelle dans `MIGRATION_PLAN.md`.
2. Confirmer la liste exacte des fichiers concernés.
3. Exécuter les modifications dans un seul commit logique par sous-phase.
4. Lancer `pnpm check && pnpm test` avant de signaler "terminé".
5. Mettre à jour la case correspondante dans `MIGRATION_PLAN.md`.

### Pour une nouvelle feature (post-migration)

1. Définir le routing (tRPC procedure, page Wouter).
2. Créer/modifier le schéma DB si nécessaire + migration Drizzle.
3. Composant React + formulaire si saisie utilisateur.
4. Test Vitest si logique métier non-triviale.
5. Vérifier dark mode + responsive mobile.
6. Mettre à jour `todo.md`.

---

## Hors-scope (volontairement reporté)

- Refonte du token de session admin (actuellement = mot de passe en clair dans header).
- Migration vers Next.js (Vite + Express fonctionne).
- Tests E2E Playwright.
- Internationalisation EN/AR.
- Optimisation images (WebP/AVIF avec sharp).
- Refactor `users` table (devenue obsolète).
- Réactivation du chatbot Khamci Bot (V1.5 si data trafic confirme l'intérêt).

À garder dans `todo.md`, pas dans le scope de la migration courante.
