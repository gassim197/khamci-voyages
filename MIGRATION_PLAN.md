# Khamci Voyages — Plan de projet & Roadmap

> Ce document retrace la migration hors de Manus (V1, close) et structure
> les évolutions à venir (V1.5, V2). Il sert de mémoire de projet : à
> rouvrir avant chaque nouvelle session de travail pour se resituer.
>
> Dépôt : github.com/gassim197/khamci-voyages
> Production : https://khamci-voyages.com (Render + Neon Postgres + Resend)

---

## ✅ V1 — CLÔTURÉE

Objectif initial : détacher complètement le site de l'écosystème Manus,
le redéployer sous un domaine propre, et l'enrichir pour le lancement.
**Résultat : atteint à 100%.**

### Détachement Manus

- [x] Suppression du runtime Manus (OAuth, proxy forge, plugin Vite, 16 fichiers)
- [x] Migration base de données MySQL → Postgres (Neon)
- [x] Chatbot Khamci Bot mis en standby (réactivable via git revert)
- [x] Suppression du code Google Maps mort
- [x] 37 images rapatriées du CDN Manus vers hébergement local
- [x] 15 images de destinations sourcées depuis Wikimedia Commons (CC)
- [x] URLs et mentions Manus retirées partout (code, emails, mentions légales)
- [x] Transfert du dépôt GitHub vers le compte personnel (gassim197)
- [x] Déploiement Manus arrêté

### Infrastructure

- [x] Hébergement sur Render (Web Service Node)
- [x] Base Postgres sur Neon
- [x] Emails transactionnels via Resend (domaine vérifié DKIM/SPF/DMARC)
- [x] Domaine khamci-voyages.com (Namecheap) + HTTPS
- [x] Variables d'environnement propres + .env.example documenté

### Sécurité

- [x] Suppression du mot de passe par défaut « khamci2024 »
- [x] Rotation du mot de passe admin (hash bcrypt)
- [x] Rotation de la connection string Neon
- [x] Script de secours reset:owner pour récupération d'accès

### Produit & contenu

- [x] Page Team Building dédiée (offre B2B complète, 6 destinations, 4 formules)
- [x] 4 pages « Joyaux de la Guinée » (Fouta Djallon, Conakry, Kindia, Îles de Loos)
- [x] Architecture data-driven pour ajouter facilement de nouvelles destinations
- [x] Liste d'aéroports étendue (Conakry + 27 destinations sur 6 régions)
- [x] Devise en GNF (au lieu de USD)
- [x] Blog migré vers la base de données (6 articles seedés)
- [x] Éditeur de blog WYSIWYG (Tiptap) avec mise en forme riche
- [x] 5 types de callouts éditoriaux (À retenir, Conseil Khamci, Exemple, Erreur, Résultat)
- [x] 1er article B2B publié (guide travel management, 3736 mots)
- [x] Widget contact flottant (formulaire + WhatsApp)
- [x] Gestion multi-admin (rôles owner / editor)
- [x] Bannière promo -10% avec compte à rebours (jusqu'au 20 août 2026)
- [x] Métadonnées SEO / Open Graph correctes (previews sociales fonctionnelles)

---

## 🔧 V1.5 — Dette technique & finitions

Ces éléments ne bloquent rien mais renforcent la solidité et la propreté.
À traiter progressivement, sans urgence.

### Corrections SEO restantes
- [ ] og:description manquante dans certaines previews sociales
- [ ] Sitemap.xml à régénérer avec le bon domaine (khamci-voyages.com avec tiret)
- [ ] Vérifier l'indexation Google Search Console (soumettre le sitemap)

### Sécurité & robustesse
- [ ] Refonte du token de session admin (actuellement = mot de passe en clair
      dans le header ; passer à un vrai JWT signé)
- [ ] Rate limiting sur les formulaires publics (/trpc/quotes.submit) pour
      éviter le spam
- [ ] Compléter les mocks de tests (12 tests admin actuellement en échec sur
      un mock ./db incomplet)

### Éditeur & contenu
- [ ] Support des tableaux dans l'éditeur blog (utile pour les grilles KPI,
      comparatifs)
- [ ] Bloc CTA réutilisable dans l'éditeur (bouton stylé + lien)
- [ ] Champ meta-description dédié par article (aujourd'hui l'excerpt sert des deux)

---

## 🚀 V2 — Croissance & impact utilisateur

Priorisées par impact business, pas par complexité technique. L'idée
directrice : transformer un site vitrine en machine à convertir et à
fidéliser.

### Priorité 1 — Conversion (transformer les visiteurs en leads)

**Suivi analytics (rebrancher ce qui a été neutralisé)**
Sans données, impossible de savoir ce qui marche. Rebrancher un analytics
respectueux de la vie privée (Plausible ou Umami, ~9$/mois ou self-hosted).
Mesurer : pages vues, sources de trafic, taux de conversion des formulaires
de devis, articles blog les plus lus. C'est le prérequis à toute optimisation.

**Optimisation du tunnel de devis**
Analyser où les visiteurs abandonnent les formulaires. Réduire les frictions
(champs inutiles, étapes trop longues). Ajouter une confirmation visuelle
rassurante après soumission. Tester un formulaire court en une étape vs le
formulaire actuel.

**Preuves sociales renforcées**
Les témoignages existent mais peuvent être mis en avant plus fortement :
logos des entreprises partenaires (SOGEFEL, EIFFAGE, etc. si accord),
chiffres clés animés (nombre de voyages organisés, satisfaction), avis
Google intégrés.

### Priorité 2 — Contenu & SEO (attirer du trafic gratuit)

**Rythme éditorial régulier sur le blog**
Le 1er article B2B est excellent. L'enjeu est la constance : viser 1 à 2
articles par mois, ancrés géographiquement (« depuis Conakry », « en Guinée »)
pour capter un SEO local peu concurrentiel. Sujets à fort potentiel : guides
visa par pays, préparation Hadj/Oumra, conseils voyage d'affaires, découverte
des régions guinéennes.

**Nouvelles pages Joyaux de la Guinée**
L'architecture data-driven permet d'ajouter Dalaba, Pita, Kankan, Boké en
quelques lignes chacune. Chaque page = une porte d'entrée SEO supplémentaire
sur le tourisme domestique guinéen.

**Newsletter**
La collecte d'emails existe déjà. La prochaine étape : envoyer une vraie
newsletter (mensuelle) avec les nouveaux articles, les promos, les
destinations. Fidélise et ramène du trafic. Resend gère déjà l'envoi.

### Priorité 3 — Engagement & fidélisation

**Réactivation du chatbot Khamci Bot**
Mis en standby en V1 pour économiser. À rebrancher une fois qu'il y a assez
de trafic pour justifier le coût, en migrant vers Anthropic. Utile pour
répondre aux questions fréquentes 24/7 et pré-qualifier les demandes.

**Espace client / suivi de demande**
Permettre à un client de suivre l'état de sa demande de devis en ligne
(en attente / traité / devis envoyé). Réduit les allers-retours et
professionnalise l'expérience.

**Programme de parrainage / fidélité**
Récompenser les clients qui recommandent Khamci. Levier de croissance
organique puissant dans un marché où le bouche-à-oreille compte beaucoup.

### Priorité 4 — Portée & accessibilité

**Version multilingue (anglais)**
Pour toucher les partenaires internationaux, les expatriés, les voyageurs
anglophones de la sous-région. Le contenu est prêt, c'est un travail de
traduction + routing i18n.

**Optimisation mobile poussée & PWA**
La majorité du trafic ouest-africain est mobile. Aller au-delà du responsive :
temps de chargement optimisés (images WebP/AVIF, lazy loading), voire une
Progressive Web App installable sur l'écran d'accueil.

**Accessibilité (a11y)**
Contrastes, navigation clavier, lecteurs d'écran. Bon pour les utilisateurs
et pour le SEO.

---

## Notes de maintenance

**Stack actuelle**
React 19 + Vite + Wouter · Express + tRPC · Drizzle ORM + Neon Postgres ·
Tailwind + shadcn/ui · Resend (email) · Render (hébergement) · Tiptap (éditeur blog)

**Workflow de déploiement**
Commit sur `main` → push GitHub → Render redéploie automatiquement (2-5 min).
Toujours valider en local (`pnpm dev` + `pnpm check` + `pnpm build`) avant push.

**Publication d'un article de blog**
1. Déposer la cover image dans client/public/images/blog/ (+ commit + push)
2. Créer l'article dans le dashboard admin (/admin → Blog)
3. Renseigner titre, slug, excerpt, cover image, catégorie, contenu (éditeur riche)
4. Statut « published »
5. Vérifier la preview sociale via developers.facebook.com/tools/debug/

**Scripts utilitaires disponibles**
- `pnpm seed:blog` — réimporter les articles depuis le fichier statique
- `pnpm reset:owner` — réinitialiser le mot de passe owner (secours)
- `pnpm migrate:blog-html` — convertir Markdown → HTML (déjà exécuté)
