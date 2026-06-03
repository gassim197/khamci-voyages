# KHAMCI VOYAGES - Agence de Voyages

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-22.13.0-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)

Site web professionnel pour **KHAMCI VOYAGES**, agence de voyages basée en Guinée proposant billets d'avion, réservations d'hôtels, assistance visa, voyages organisés et services de team building.

**Site en production :** [khamcivoyages.com](https://khamcivoyages.com)

---

## 🚀 Caractéristiques Principales

### Pour les Clients
- ✈️ **Formulaires de Devis** : Vols, hôtels, voitures, visas, team building
- 🌍 **Pages de Destinations** : Paris, Dubaï, New York, Casablanca, Bangkok, Barcelone
- 📱 **Responsive Design** : Optimisé pour mobile, tablette et desktop
- 🌙 **Mode Sombre** : Basculement automatique selon les préférences système
- 💬 **Chatbot IA** : Assistant virtuel avec suggestions rapides
- 📝 **Blog Dynamique** : Articles avec partage social et barre de progression de lecture
- 🔍 **SEO Optimisé** : Sitemap, robots.txt, Open Graph, Schema.org
- 📊 **Google Analytics** : Suivi des conversions et des interactions

### Pour l'Administration
- 🔐 **Dashboard Admin** : Gestion des devis, témoignages, articles de blog
- 📈 **Statistiques en Temps Réel** : Graphiques et KPIs
- 📧 **Notifications Email** : Alertes automatiques pour chaque nouveau devis
- 👤 **Profil Admin** : Édition du profil et changement de mot de passe
- 📋 **Export CSV** : Téléchargement des contacts clients

---

## 🛠️ Stack Technique

| Couche | Technologies |
|--------|-------------|
| **Frontend** | React 19, TypeScript, Tailwind CSS 4, shadcn/ui |
| **Backend** | Node.js, Express 4, tRPC 11 |
| **Base de Données** | MySQL/TiDB, Drizzle ORM |
| **Authentification** | Manus OAuth + JWT |
| **IA** | Forge API (LLM, Image Generation) |
| **Email** | Nodemailer (Gmail SMTP) |
| **Analytics** | Google Analytics 4 (G-9E2RM59EN1) |
| **Déploiement** | Manus Platform |

---

## 📁 Structure du Projet

```
khamci-voyages/
├── client/                          # Application React (frontend)
│   ├── src/
│   │   ├── components/              # Composants réutilisables
│   │   │   ├── Header.tsx           # Navigation principale
│   │   │   ├── SocialShareButtons.tsx # Boutons de partage social
│   │   │   ├── ReadingProgressBar.tsx # Barre de progression de lecture
│   │   │   ├── ChatWidget.tsx       # Chatbot IA
│   │   │   └── ...
│   │   ├── pages/                   # Pages principales
│   │   │   ├── Home.tsx             # Page d'accueil
│   │   │   ├── BlogArticlePage.tsx  # Article de blog individuel
│   │   │   ├── AdminDashboard.tsx   # Dashboard admin
│   │   │   └── ...
│   │   ├── hooks/                   # Hooks personnalisés
│   │   │   └── useReadingProgress.ts # Hook pour la barre de progression
│   │   ├── lib/
│   │   │   ├── trpc.ts              # Configuration tRPC client
│   │   │   └── analytics.ts         # Événements Google Analytics
│   │   ├── App.tsx                  # Routeur principal
│   │   └── index.html               # Point d'entrée HTML
│   └── public/                      # Actifs statiques
├── server/                          # Serveur Node.js (backend)
│   ├── routers.ts                   # Procédures tRPC
│   ├── db.ts                        # Helpers de base de données
│   ├── storage.ts                   # Intégration S3
│   ├── ogMiddleware.ts              # Middleware Open Graph SSR
│   └── _core/                       # Infrastructure (OAuth, Auth, etc.)
├── drizzle/                         # Schéma et migrations
│   ├── schema.ts                    # Définition des tables
│   └── migrations/                  # Fichiers de migration
├── shared/                          # Code partagé frontend/backend
├── package.json                     # Dépendances et scripts
├── vite.config.ts                   # Configuration Vite
├── tsconfig.json                    # Configuration TypeScript
└── README.md                        # Ce fichier
```

---

## 🚀 Installation et Démarrage

### Prérequis
- **Node.js** 22.13.0 ou supérieur
- **pnpm** (gestionnaire de paquets)
- **MySQL/TiDB** (base de données)

### Installation Locale

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/khamci-voyages/khamci-voyages.git
   cd khamci-voyages
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```

3. **Configurer les variables d'environnement**
   
   Créer un fichier `.env.local` à la racine du projet :
   ```env
   # Base de données
   DATABASE_URL=mysql://user:password@localhost:3306/khamci_voyages

   # Authentification
   JWT_SECRET=your_jwt_secret_here
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://manus.im
   VITE_APP_ID=your_app_id

   # Email (Gmail)
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your_app_password

   # Manus APIs
   BUILT_IN_FORGE_API_URL=https://forge.manus.ai
   BUILT_IN_FORGE_API_KEY=your_forge_api_key
   VITE_FRONTEND_FORGE_API_KEY=your_frontend_forge_key
   VITE_FRONTEND_FORGE_API_URL=https://forge.manus.ai

   # Analytics
   VITE_ANALYTICS_WEBSITE_ID=your_analytics_id
   VITE_ANALYTICS_ENDPOINT=https://manus-analytics.com

   # Propriétaire
   OWNER_NAME=khamci voyages
   OWNER_OPEN_ID=your_owner_id

   # Titre et logo
   VITE_APP_TITLE=KHAMCI VOYAGES - Agence de Voyages
   VITE_APP_LOGO=https://your-logo-url.png
   ```

4. **Initialiser la base de données**
   ```bash
   pnpm db:push
   ```

5. **Démarrer le serveur de développement**
   ```bash
   pnpm dev
   ```

   Le site sera accessible à `http://localhost:3000`

---

## 📚 Fonctionnalités Détaillées

### Blog Dynamique avec Open Graph

Le système de blog permet de créer, éditer et publier des articles avec :
- **Métadonnées Open Graph dynamiques** : titre, description, image par article
- **Partage sur les réseaux sociaux** : Facebook, WhatsApp, Twitter/X, LinkedIn
- **Barre de progression de lecture** : suivi du scroll en temps réel
- **Tracking GA4** : événements de partage et de lecture

**Fichiers clés :**
- `client/src/pages/BlogArticlePage.tsx` - Page d'article individuel
- `client/src/components/SocialShareButtons.tsx` - Boutons de partage
- `client/src/components/ReadingProgressBar.tsx` - Barre de progression
- `server/ogMiddleware.ts` - Middleware SSR pour Open Graph

### Formulaires de Devis

Cinq types de formulaires avec validation et tracking GA4 :
- **Vols** : compagnies aériennes, dates, destinations
- **Hôtels** : type d'établissement, dates, nombre de personnes
- **Voitures** : type de véhicule, dates, localisation
- **Visas** : type de visa, destination
- **Team Building** : nombre de participants, type d'activité

Tous les formulaires envoient des emails de notification et enregistrent les données en base de données.

### Dashboard Admin

Accès sécurisé avec authentification :
- **Vue Tableau de Bord** : KPIs, statistiques, activité récente
- **Gestion des Devis** : liste, filtrage, statuts, notes
- **Gestion des Témoignages** : approbation/rejet
- **Gestion du Blog** : création/édition d'articles
- **Gestion de la Newsletter** : liste des abonnés
- **Profil Admin** : édition des informations personnelles
- **Paramètres** : changement de mot de passe

**URL :** `/admin/login`

### Chatbot IA

Widget flottant avec suggestions rapides :
- Informations sur les destinations
- Tarifs et offres
- Assistance visa
- Contact direct

Utilise l'API Forge pour les réponses intelligentes.

---

## 🔧 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `pnpm dev` | Démarrer le serveur de développement |
| `pnpm build` | Construire pour la production |
| `pnpm preview` | Prévisualiser la build de production |
| `pnpm db:push` | Générer et appliquer les migrations |
| `pnpm test` | Exécuter les tests Vitest |
| `pnpm format` | Formater le code avec Prettier |

---

## 🔐 Authentification

### Manus OAuth
L'application utilise **Manus OAuth** pour l'authentification des utilisateurs :
- Connexion sécurisée via `/api/oauth/callback`
- Session stockée en cookie JWT
- Contexte utilisateur disponible dans les procédures tRPC protégées

### Dashboard Admin
Authentification par mot de passe (hashé avec bcrypt) :
- Mot de passe par défaut : `khamci2024`
- Changeable depuis les paramètres du dashboard
- Stocké dans la table `admin_settings`

---

## 📊 Base de Données

### Tables Principales

| Table | Description |
|-------|-------------|
| `users` | Utilisateurs authentifiés via Manus OAuth |
| `quotes` | Demandes de devis (vols, hôtels, voitures, etc.) |
| `testimonials` | Témoignages clients |
| `blog_posts` | Articles de blog |
| `newsletter_subscribers` | Abonnés à la newsletter |
| `admin_settings` | Paramètres admin (mot de passe, profil) |

### Migrations

Les migrations sont gérées avec **Drizzle Kit** :
```bash
pnpm db:push  # Générer et appliquer les migrations
```

---

## 📈 Google Analytics

L'application enregistre les événements de conversion suivants :

| Événement | Déclencheur |
|-----------|------------|
| `demande_devis` | Soumission d'un formulaire de devis |
| `whatsapp_click` | Clic sur le bouton WhatsApp |
| `phone_click` | Clic sur le numéro de téléphone |
| `destination_view` | Visite d'une page de destination |
| `newsletter_signup` | Inscription à la newsletter |
| `chatbot_open` | Ouverture du chatbot |
| `cta_click` | Clic sur un CTA principal |
| `article_share` | Partage d'un article de blog |

**ID de mesure :** `G-9E2RM59EN1`

---

## 🌐 SEO

L'application inclut une optimisation SEO complète :

- **Sitemap** : `/sitemap.xml` - Liste de toutes les pages
- **Robots.txt** : `/robots.txt` - Instructions pour les crawlers
- **Open Graph** : Métadonnées pour le partage sur les réseaux sociaux
- **Twitter Cards** : Optimisation pour Twitter/X
- **Schema.org** : Balisage structuré (TravelAgency, LocalBusiness)
- **Meta Tags** : Titre, description, keywords par page

---

## 🎨 Design et Couleurs

| Élément | Couleur | Code |
|---------|---------|------|
| Primaire | Bleu Marine | `#0D1B3E` |
| Accent | Orange | `#FF6B35` |
| Fond Clair | Blanc | `#FFFFFF` |
| Fond Sombre | Gris Foncé | `#111827` |

---

## 📱 Responsive Design

L'application est optimisée pour tous les appareils :
- **Mobile** : 320px et plus
- **Tablette** : 768px et plus
- **Desktop** : 1024px et plus

Utilise **Tailwind CSS 4** avec breakpoints standards.

---

## 🚀 Déploiement

### Sur Manus Platform

1. **Créer un checkpoint**
   ```bash
   # Via l'interface Manus
   ```

2. **Publier**
   - Cliquer sur le bouton "Publish" dans le Management UI
   - Sélectionner le checkpoint à déployer

3. **Domaine personnalisé**
   - Configuration disponible dans Settings → Domains
   - Domaine actuel : `khamcivoyages.com`

### Variables d'Environnement en Production

Toutes les variables d'environnement doivent être configurées via le Management UI de Manus :
- Secrets → Ajouter/Modifier les variables
- Les variables sont injectées automatiquement au déploiement

---

## 🧪 Tests

L'application inclut des tests unitaires avec **Vitest** :

```bash
# Exécuter tous les tests
pnpm test

# Exécuter les tests en mode watch
pnpm test --watch
```

**Fichiers de test :**
- `server/auth.logout.test.ts` - Tests d'authentification
- Autres fichiers `.test.ts` dans le projet

---

## 📞 Support et Contact

- **Email** : khamcivoyages@gmail.com
- **WhatsApp** : +224 611 145 892
- **Site** : [khamcivoyages.com](https://khamcivoyages.com)
- **Adresse** : Conakry, Guinée

---

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer :

1. **Fork** le dépôt
2. **Créer une branche** : `git checkout -b feature/ma-fonctionnalite`
3. **Commiter les changements** : `git commit -m "Ajouter ma fonctionnalité"`
4. **Pousser vers la branche** : `git push origin feature/ma-fonctionnalite`
5. **Ouvrir une Pull Request**

### Guidelines

- Respecter le style de code existant (Prettier, ESLint)
- Ajouter des tests pour les nouvelles fonctionnalités
- Mettre à jour la documentation si nécessaire
- Utiliser des messages de commit descriptifs

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📚 Ressources Supplémentaires

- [Documentation React](https://react.dev/)
- [Documentation Tailwind CSS](https://tailwindcss.com/)
- [Documentation tRPC](https://trpc.io/)
- [Documentation Drizzle ORM](https://orm.drizzle.team/)
- [Documentation Manus](https://manus.im/)

---

## 🎯 Roadmap Futur

- [ ] Application mobile (React Native)
- [ ] Intégration paiement (Stripe)
- [ ] Système de réservation en ligne
- [ ] Calendrier de disponibilité
- [ ] Notifications push
- [ ] Multilangue (FR, EN, AR)
- [ ] Système de notation et avis

---

**Dernière mise à jour :** Juin 2026

**Mainteneur :** KHAMCI VOYAGES Team
