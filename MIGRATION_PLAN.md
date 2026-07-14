# Plan de migration — Khamci Voyages : sortie de Manus

> **Objectif** : détacher complètement le site `khamci-voyages` de l'écosystème Manus (runtime, OAuth, proxy forge, CDN, infra), le retravailler en local avec Claude Code, et le redéployer sous un nouveau nom de domaine.
>
> **Audit de référence** : effectué le 3 juin 2026 sur le dépôt `https://github.com/khamcivoyages-ship-it/khamci-voyages` (commit `e67a3ce`).

---

## Décisions à prendre AVANT de commencer

Ces choix conditionnent la suite. À trancher dès maintenant :

| Décision | Option A (rapide) | Option B (alignée AssoHub) | Décision actée |
|---|---|---|---|
| **Base de données** | Garder MySQL → **PlanetScale** ou **Aiven** | Migrer vers **Neon Postgres** | ✅ **Postgres (Neon)** |
| **Hébergement** | **Render** (Web Service) — tier gratuit + 7 $/mois sans veille | **Railway** ou **Fly.io** | Render pour la simplicité, Railway si tu veux du CI/CD plus poussé. |
| **Stockage fichiers** | **Cloudflare R2** (S3-compat, egress gratuit) | AWS S3 | R2 — plus économique pour ton volume. |
| **Provider IA chatbot** | **Anthropic Claude** (cohérent avec ton stack) | OpenAI direct | ✅ **Standby V1.5** (chatbot retiré) |
| **Nom de domaine** | À acheter (Namecheap, OVH, Porkbun) | — | Choisir maintenant pour configurer les emails. |

> **Choix par défaut retenus dans ce plan** : MySQL conservé (PlanetScale), Render pour l'hébergement, Cloudflare R2 pour le stockage, Anthropic pour le chatbot. Adapte si tu choisis différemment.

---

## Phase 0 — Préparation locale (½ journée)

**Objectif** : avoir le projet qui tourne en local, même cassé partiellement, sans rien pousser.

- [ ] Forker le dépôt vers ton compte GitHub personnel (ou créer un nouveau dépôt privé `khamci-voyages-v2`).
- [ ] Cloner en local : `git clone <ton-fork>`
- [ ] Installer pnpm 10+ : `npm i -g pnpm`
- [ ] `pnpm install` (attention : le projet utilise un patch sur wouter, c'est normal).
- [ ] Créer un fichier `.env.local` à la racine avec les variables strictement nécessaires pour démarrer (voir section "Variables d'environnement" plus bas).
- [ ] Lancer `pnpm dev` — le serveur démarrera mais le chat, l'OAuth, les uploads et les Maps planteront. C'est attendu.
- [ ] Placer le `CLAUDE.md` (livré séparément) à la racine.
- [ ] Créer une branche `migration/detach-manus` pour tout le travail.

---

## Phase 1 — Suppression du poids mort Manus (1 journée)

**Objectif** : retirer tout ce qui est purement Manus et inutilisé. Le site doit toujours builder à la fin.

### Fichiers à SUPPRIMER intégralement

```
.manus/                                          # dossier complet (artefacts Manus)
client/src/components/ManusDialog.tsx            # composant inutilisé
client/src/components/DashboardLayout.tsx        # code mort (uniquement référencé par son skeleton)
client/src/components/DashboardLayoutSkeleton.tsx  # skeleton du code mort
client/src/_core/hooks/useAuth.ts                # hook OAuth Manus
server/_core/oauth.ts                            # routes OAuth Manus
server/_core/sdk.ts                              # SDK Manus
server/_core/types/manusTypes.ts                 # types OAuth Manus
server/_core/patchedFetch.ts                     # fix spécifique au proxy forge
server/_core/imageGeneration.ts                  # NON UTILISÉ (forge-dep)
server/_core/voiceTranscription.ts               # NON UTILISÉ (forge-dep)
server/_core/dataApi.ts                          # NON UTILISÉ (forge-dep)
server/_core/chat.ts                             # chat générique (forge-dep) — chatKhamci.ts est le vrai
server/auth.logout.test.ts                       # test du flow OAuth supprimé
server/index.ts                                  # entrée alternative inutilisée (vraie entrée : server/_core/index.ts)
```

### Dépendances à RETIRER de `package.json`

```json
// devDependencies à supprimer
"vite-plugin-manus-runtime": "...",
"@builder.io/vite-plugin-jsx-loc": "..."
```

```json
// dependencies à supprimer (le chat passera à Anthropic)
"@ai-sdk/openai": "..."
```

Puis : `pnpm install` pour régénérer le lockfile.

### Fichiers à MODIFIER pour retirer les imports cassés

**`server/_core/index.ts`** — retirer ces lignes :
```ts
import { registerOAuthRoutes } from "./oauth";
import { registerChatRoutes } from "./chat";
// ...
registerOAuthRoutes(app);
registerChatRoutes(app);
```

**`vite.config.ts`** — retirer les plugins Manus :
- L'import et l'usage de `vite-plugin-manus-runtime`
- L'import et l'usage de `@builder.io/vite-plugin-jsx-loc`

**`server/_core/systemRouter.ts`** — supprimer la mutation `notifyOwner` (et l'import `notifyOwner` de `./notification`). Le routeur ne garde que `health`.

### Vérification de fin de Phase 1

```bash
pnpm check       # tsc --noEmit doit passer
pnpm build       # doit produire dist/ sans erreur
```

Le site doit builder. Le chatbot, les uploads et la Map peuvent encore être cassés — c'est l'objet de la Phase 2.

---

## Phase 2 — Remplacement des services qui servent (1 à 1,5 jour)

**Objectif** : reconnecter les fonctionnalités utilisées à des services indépendants.

### 2.1 — Storage (uploads d'images blog) → Cloudflare R2

❌ **Reportée V1.5 — Option A choisie (upload manuel via commit) pour économiser du setup et éviter les blocages Cloudflare.**

Pour la V1, les images de blog sont ajoutées manuellement dans `client/public/images/blog/` et l'admin saisit le chemin (ex : `/images/blog/mon-article.webp`) dans le champ URL du formulaire d'article. Aucune infra de stockage externe n'est nécessaire.

- [x] Supprimé `server/storage.ts` et `server/uploadRoutes.ts` (derniers consommateurs du proxy forge).
- [x] Retiré le bouton d'upload de l'éditeur blog (`AdminDashboardNew.tsx`), conservé le champ chemin/URL avec un texte d'aide.
- Réactivation R2 possible en V1.5 si le volume justifie l'infra (ou disque persistant Render).

### 2.2 — Chatbot Khamci Bot → Anthropic

✅ **Mis en standby — suppression effective le 3 juin 2026.** Réactivation possible via `git revert` du commit Phase 2.

Fichiers retirés : `server/chatKhamci.ts`, `client/src/components/AIChatBox.tsx`, `client/src/components/ChatWidget.tsx` (widget flottant), `client/src/hooks/useFileUpload.ts`, `server/_core/patchedFetch.ts`. Dépendances retirées : `@ai-sdk/openai`, `@ai-sdk/react`, `ai`. Décision réévaluée en V1.5 si les données de trafic confirment l'intérêt.

### 2.3 — Google Maps → API directe

✅ **Code mort supprimé (`Map.tsx` n'était jamais importé).** Pas d'API Google externe nécessaire pour le projet. Dépendance `@types/google.maps` retirée.

### 2.4 — Vidéo Hero (Manus CDN expirant)

✅ **Effectué.** `client/src/components/HeroSection.tsx` pointe désormais vers le fichier local `/videos/hero.mp4` (dans `client/public/videos/`) au lieu de l'URL signée Manus CDN.

### 2.5 — Emails (URL admin en dur)

- [x] **Modifier `server/email.ts` lignes 131 et 272** : remplacer `https://khamcivoyage-tggjc7uo.manus.space/admin/dashboard` par `${ENV.publicSiteUrl}/admin/dashboard`.
- [x] Ajouter `PUBLIC_SITE_URL` à `server/_core/env.ts` (exposé via `ENV.publicSiteUrl`).

### 2.6 — Mentions Légales

- [ ] Mettre à jour `client/src/pages/MentionsLegales.tsx` : retirer toute mention de Manus, mettre les informations légales de Khamci Voyages (hébergeur Render, adresse du siège, etc.).

### 2.7 — Base de données

✅ **Migration vers Postgres/Neon effectuée** (3 juin 2026) :
- [x] `drizzle.config.ts` → `dialect: "postgresql"`.
- [x] `drizzle/schema.ts` réécrit : `mysqlTable` → `pgTable`, `mysqlEnum` → `pgEnum` (déclarés en amont), `int().autoincrement()` → `serial`, `int` → `integer`, `.onUpdateNow()` → `.$onUpdate(() => new Date())`.
- [x] `server/db.ts` : driver `drizzle-orm/mysql2` → `drizzle-orm/neon-http` + `neon()` de `@neondatabase/serverless`.
- [x] `mysql2` remplacé par `@neondatabase/serverless` dans `package.json`.
- [x] 4 `onDuplicateKeyUpdate` → `onConflictDoUpdate` (targets : `users.openId`, `adminSettings.key` ×2, `newsletterSubscribers.email`).
- [x] Migrations Drizzle MySQL supprimées et régénérées pour Postgres.
- [ ] Provisionner la base Neon, renseigner `DATABASE_URL` dans `.env.local`, puis `pnpm db:push` (reste à faire, hors de cette session).
- [ ] Import des données existantes (si encore accessibles).

### Vérification de fin de Phase 2

```bash
pnpm dev
# Tester manuellement :
# - Soumission d'un devis vol (formulaire + email reçu)
# - Soumission d'un témoignage
# - Connexion admin
# - Upload d'une image de blog
# - Le chatbot répond
# - La carte s'affiche
```

---

## Phase 3 — Refonte de l'environnement (½ journée)

**Objectif** : `server/_core/env.ts` doit être propre et documenté.

### Nouveau contenu cible de `server/_core/env.ts`

```ts
export const ENV = {
  // App
  isProduction: process.env.NODE_ENV === "production",
  publicSiteUrl: process.env.PUBLIC_SITE_URL ?? "http://localhost:3000",

  // Database
  databaseUrl: process.env.DATABASE_URL ?? "",

  // Admin auth
  adminPassword: process.env.ADMIN_PASSWORD ?? "",  // OBLIGATOIRE en prod
  jwtSecret: process.env.JWT_SECRET ?? "",

  // Email (Nodemailer / Gmail SMTP)
  gmailUser: process.env.GMAIL_USER ?? "",
  gmailAppPassword: process.env.GMAIL_APP_PASSWORD ?? "",

  // AI Chatbot (Anthropic)
  anthropicApiKey: process.env.ANTHROPIC_API_KEY ?? "",

  // Storage (Cloudflare R2)
  r2AccountId: process.env.R2_ACCOUNT_ID ?? "",
  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  r2BucketName: process.env.R2_BUCKET_NAME ?? "",
  r2PublicUrl: process.env.R2_PUBLIC_URL ?? "",

  // Google Maps (optionnel, côté client via VITE_)
  // VITE_GOOGLE_MAPS_API_KEY est lu directement par Vite dans le bundle client
};
```

### Variables à supprimer (anciennes Manus)

```
VITE_APP_ID
OAUTH_SERVER_URL
OWNER_OPEN_ID
BUILT_IN_FORGE_API_URL
BUILT_IN_FORGE_API_KEY
```

### Nouveau `.env.example` à committer

À créer à la racine, sans valeurs réelles :

```bash
# === Application ===
NODE_ENV=development
PUBLIC_SITE_URL=http://localhost:3000

# === Database (PlanetScale ou autre MySQL) ===
DATABASE_URL=mysql://user:pass@host/db?ssl={"rejectUnauthorized":true}

# === Admin Auth ===
ADMIN_PASSWORD=                    # OBLIGATOIRE — pas de fallback en prod
JWT_SECRET=                        # générer avec: openssl rand -base64 32

# === Email ===
GMAIL_USER=khamcivoyages@gmail.com
GMAIL_APP_PASSWORD=                # mot de passe d'application Gmail

# === IA Chatbot ===
ANTHROPIC_API_KEY=sk-ant-...

# === Cloudflare R2 ===
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=khamci-uploads
R2_PUBLIC_URL=https://files.khamci.com

# === Côté client (Vite) ===
VITE_GOOGLE_MAPS_API_KEY=
```

### Point de sécurité critique

Dans `server/db.ts` ligne ~169, **supprimer** le fallback de mot de passe par défaut :

```ts
// AVANT (vulnérable sur dépôt public)
const defaultPassword = process.env.ADMIN_PASSWORD || "khamci2024";

// APRÈS
const defaultPassword = process.env.ADMIN_PASSWORD;
if (!defaultPassword) throw new Error("ADMIN_PASSWORD environment variable is required");
```

Et mettre à jour `todo.md` pour retirer la mention du mot de passe `khamci2024`.

---

## Phase 4 — Déploiement (½ à 1 journée)

### Sur Render (recommandé)

- [ ] Pousser la branche `migration/detach-manus` sur GitHub.
- [ ] Sur Render : **New → Web Service** → connecter le dépôt.
- [ ] Configuration :
  - **Environment** : Node
  - **Build command** : `pnpm install && pnpm build`
  - **Start command** : `pnpm start`
  - **Plan** : Free pour les tests, Starter (7 $/mois) pour la prod (pas de spin-down).
- [ ] Ajouter toutes les variables d'environnement de prod.
- [ ] Premier déploiement → vérifier les logs.

### Configuration du domaine

- [ ] Acheter le nouveau domaine (ex : `khamcivoyages.com`).
- [ ] Sur Render → Custom Domain → ajouter le domaine.
- [ ] Configurer les enregistrements DNS chez le registrar :
  - `A` record → IP fournie par Render, OU
  - `CNAME` → URL `.onrender.com`
- [ ] Attendre la propagation (jusqu'à 24h, souvent <1h).
- [ ] Render génère le certificat SSL automatiquement.

### Mise à jour des URLs

- [ ] Variable `PUBLIC_SITE_URL` mise à jour sur Render.
- [ ] System prompt du chatbot vérifié (le domaine doit être correct).
- [ ] Sitemap (`client/public/sitemap.xml` si présent) régénéré avec les nouvelles URLs.
- [ ] Google Search Console : ajouter le nouveau domaine, soumettre le sitemap.

---

## Phase 5 — Vérifications post-déploiement (½ journée)

### Checklist fonctionnelle

- [ ] Page d'accueil charge correctement (vidéo Hero visible).
- [ ] Toutes les pages destinations s'affichent (Paris, Dubai, NY, Casablanca, Bangkok, Barcelone).
- [ ] Toutes les pages services s'affichent (6 services).
- [ ] Formulaire devis vol → soumission OK → email reçu côté admin.
- [ ] Formulaire devis hôtel → idem.
- [ ] Formulaire devis voiture → idem.
- [ ] Formulaire de contact général → idem.
- [ ] Formulaire témoignage → soumission OK → apparaît en "pending" dans l'admin.
- [ ] Newsletter → inscription OK.
- [ ] Blog : les 7 articles s'affichent.
- [ ] Open Graph : tester le partage d'un article sur WhatsApp et Facebook (carte preview correcte).
- [ ] Bouton WhatsApp flottant fonctionne.
- [ ] Chatbot Khamci Bot répond (Anthropic).
- [ ] Carte Google Maps s'affiche.
- [ ] Mode sombre fonctionne sur toutes les pages.
- [ ] Mobile responsive OK.

### Checklist admin

- [ ] Connexion `/admin/login` avec mot de passe fort.
- [ ] Liste des devis visible.
- [ ] Modification de statut OK.
- [ ] Approbation/rejet de témoignage OK.
- [ ] Création d'article blog OK + upload d'image OK.
- [ ] Newsletter subscribers visibles.

### Checklist technique

- [ ] `pnpm test` passe (18 tests Vitest existants).
- [ ] Pas d'erreurs 500 dans les logs Render.
- [ ] Google Analytics (G-9E2RM59EN1) reçoit du trafic.
- [ ] `robots.txt` et `sitemap.xml` accessibles.

---

## Récapitulatif du temps total

| Phase | Estimation |
|---|---|
| 0 — Préparation locale | ½ journée |
| 1 — Suppression du poids mort | 1 journée |
| 2 — Remplacement des services | 1 à 1,5 journée (+1 jour si migration Postgres) |
| 3 — Refonte env | ½ journée |
| 4 — Déploiement + domaine | ½ à 1 journée |
| 5 — Vérifications | ½ journée |
| **TOTAL** | **4 à 6 jours** (focused) ou **1 à 2 semaines** part-time |

---

## Coûts mensuels estimés (après migration)

| Poste | Tier | Coût mensuel |
|---|---|---|
| Render Starter | Sans spin-down | 7 $ |
| Neon Postgres | Free tier (autoscale au besoin) | ~0 $ |
| Stockage images | Upload manuel via commit git (R2 reporté V1.5) | 0 $ |
| Anthropic API | Chatbot en standby (V1.5) | 0 $ |
| Domaine `.com` | — | ~1 $/mois amorti |
| **Total** | | **~13 $/mois** |

À comparer avec ton abonnement Manus actuel.

---

## Notes de sécurité à appliquer pendant la migration

1. **Mot de passe admin par défaut** : suppression obligatoire du fallback `khamci2024` (vu Phase 3).
2. **Token de session admin = mot de passe en clair** : à refondre dans une V1.5 avec un vrai JWT signé. Pas bloquant pour le déploiement, mais à mettre dans `todo.md`.
3. **Variables d'environnement** : ne **jamais** committer de `.env`. Le `.gitignore` actuel est correct, le garder tel quel.
4. **Rate limiting** : les formulaires de devis sont publics. Ajouter un rate limit (par IP) sur `/trpc/quotes.submit` est une bonne idée pour la V1.5.

---

## Ce qui reste hors-scope de cette migration

Pour ne pas étendre le périmètre, ces points sont volontairement reportés à plus tard :

- Refonte du flow d'authentification admin (token = password)
- Migration vers Next.js (le stack Vite + Express actuel est fonctionnel)
- Ajout de tests E2E (Playwright)
- Internationalisation (le site est tout-français actuellement)
- Optimisation des images (passer en WebP/AVIF avec `sharp` au build)

Ces sujets iront dans le `todo.md` pour une itération V2.
