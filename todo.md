# KHAMCI VOYAGES - TODO

## Dashboard Admin & Backend

- [x] Ajouter le backend (Node.js + Express + tRPC)
- [x] Ajouter la base de données MySQL (tables quotes et testimonials)
- [x] Créer les helpers de base de données (db.ts)
- [x] Créer le service d'envoi d'emails (Nodemailer SMTP Gmail)
- [x] Créer les routes tRPC pour les devis (submit, list, updateStatus, delete)
- [x] Créer les routes tRPC pour les témoignages (submit, listApproved, listAll, updateStatus, delete)
- [x] Créer le dashboard admin amélioré (AdminDashboardNew.tsx)
  - [x] Authentification avec mot de passe (khamci2024)
  - [x] Statistiques en temps réel
  - [x] Gestion des devis avec tri par statut (en attente, en cours, complété, rejeté)
  - [x] Gestion des témoignages avec approbation/rejet
  - [x] Recherche et filtrage
  - [x] Notes admin pour chaque devis
- [x] Connecter FlightQuoteForm à l'API backend
- [x] Connecter HotelQuoteForm à l'API backend
- [x] Connecter CarQuoteForm à l'API backend
- [x] Connecter TestimonialForm à l'API backend
- [x] Corriger les balises <a> imbriquées dans PopularDestinations
- [x] Écrire les tests Vitest (18 tests passent)
- [x] Configurer les secrets Gmail (GMAIL_USER, GMAIL_APP_PASSWORD)

## Site Principal

- [x] Page d'accueil avec toutes les sections
- [x] Header avec navigation
- [x] Section Hero
- [x] Section Services
- [x] Section Destinations populaires
- [x] Section Témoignages
- [x] Formulaires de devis (vols, hôtels, voitures)
- [x] Pages de destinations (Paris, Dubai, New York, Casablanca, Bangkok, Barcelone)
- [x] Pages de services (Vols, Hôtels, Voitures)
- [x] Page de remerciement
- [x] Bouton WhatsApp flottant
- [x] CTA sticky pour les devis

## Bugs à corriger

- [x] Les devis soumis n'apparaissent pas dans le dashboard admin (corrigé : provider tRPC dédié avec token admin)
- [x] Les emails de notification (nécessite GMAIL_USER + GMAIL_APP_PASSWORD dans les secrets Manus)

## Statistiques Dashboard

- [x] Ajouter route tRPC quotes.stats pour les données statistiques
- [x] Créer graphique devis par jour (7 derniers jours)
- [x] Créer graphique devis par semaine (8 dernières semaines)
- [x] Ajouter répartition par type de service (camembert)
- [x] Ajouter répartition par statut (barres)
- [x] Intégrer la section stats dans AdminDashboardNew.tsx

## Amélioration visuelle Dashboard Admin

- [x] Refondre le design du dashboard avec les couleurs KHAMCI VOYAGES (bleu marine + orange)
- [x] Améliorer les cartes de statistiques avec icônes et couleurs
- [x] Améliorer les tableaux de devis et témoignages
- [x] Améliorer la page de connexion admin

## Paramètres Admin - Changement de mot de passe

- [x] Ajouter la table admin_settings en base de données pour stocker le mot de passe hashé
- [x] Ajouter route tRPC auth.changeAdminPassword (vérif ancien MDP + hash bcrypt)
- [x] Ajouter onglet "Paramètres" dans le dashboard avec formulaire de changement de mot de passe

## Profil Administrateur

- [x] Ajouter les champs profil dans la table admin_settings (nom, email, téléphone, bio, avatar)
- [x] Ajouter routes tRPC auth.getAdminProfile et auth.updateAdminProfile
- [x] Créer la section Profil dans le dashboard (onglet dédié)
- [x] Formulaire de modification : nom, email, téléphone, poste, bio
- [x] Upload de photo de profil (avatar)
- [x] Afficher le nom et l'avatar de l'admin dans le header du dashboard
## Refonte Page Profil Admin

- [ ] Reconstruire la section Profil avec un design moderne et une meilleure UX

## Correction Bug tRPC (Session actuelle)

- [x] Corriger l'erreur "client[procedureType] is not a function" dans le dashboard admin
- [x] Refactoriser l'architecture tRPC : supprimer le double provider adminTrpc/trpc
- [x] Modifier main.tsx pour injecter dynamiquement le token admin depuis localStorage
- [x] Remplacer tous les usages de adminTrpc par trpc dans AdminDashboardNew.tsx
- [x] Valider que tous les onglets du dashboard fonctionnent (Devis, Témoignages, Profil, Paramètres)

## Refonte Complète Dashboard Admin (Design Professionnel)

- [x] Créer une sidebar de navigation fixe à gauche (logo, profil admin, liens de navigation)
- [x] Créer un header fixe en haut avec titre de page, barre de recherche et actions rapides
- [x] Reconstruire les KPI cards (Total devis, En attente, Complétés, Témoignages)
- [x] Créer la vue Tableau de bord (vue d'ensemble avec statistiques et activité récente)
- [x] Créer la vue Devis (liste complète avec filtres et actions)
- [x] Créer la vue Témoignages (liste avec modération)
- [x] Créer la vue Profil (édition du profil admin)
- [x] Créer la vue Paramètres (changement de mot de passe)
- [x] Appliquer le design KHAMCI VOYAGES (bleu marine #0D1B3E + orange #FF6B35)
- [x] Rendre le dashboard responsive (mobile-friendly)

## Affichage Informations Clients dans le Dashboard

- [x] Afficher nom complet, téléphone et email visibles directement sur les cartes de devis (sans cliquer)
- [x] Vérifier que les formulaires collectent bien toutes les infos (nom, prénom, téléphone, email)
- [x] Améliorer la vue liste des devis avec un tableau structuré des informations clients

## Export CSV des contacts clients

- [x] Ajouter fonction exportQuotesToCSV dans le dashboard admin
- [x] Ajouter bouton "Exporter CSV" dans la vue Devis (avec filtre par statut actif)
- [x] Inclure dans le CSV : nom, email, téléphone, destination, service, statut, date

## Corrections Critiques (Analyse du 10/03/2026)

- [x] Activer envoi email automatique à chaque nouveau devis soumis (configurer nodemailer)
- [x] Ajouter header de navigation sur la page /vols
- [x] Ajouter header de navigation sur la page /hotels
- [x] Ajouter header de navigation sur la page /voitures

## Priorité Haute - UX & Design (10/03/2026)

- [x] Harmoniser les couleurs de la page /hotels (remplacer bleu-cyan par bleu marine + orange)
- [x] Harmoniser les couleurs de la page /voitures (remplacer violet-rose par bleu marine + orange)
- [x] Harmoniser les couleurs de la page /vols (vérifier cohérence avec la charte)
- [x] Refondre le formulaire principal ContactForm en 2 étapes (Étape 1 : service + destination + dates, Étape 2 : coordonnées)
- [x] Ajouter une barre de progression visuelle entre les 2 étapes du formulaire
- [x] Conserver la validation des champs à chaque étape

## Newsletter, Blog Dynamique & SEO (10/03/2026)

### Newsletter
- [x] Ajouter table `newsletter_subscribers` dans drizzle/schema.ts
- [x] Ajouter route tRPC newsletter.subscribe (email + nom optionnel)
- [x] Ajouter formulaire newsletter dans le Footer avec validation email
- [x] Afficher les abonnés dans le dashboard admin (vue dédiée)

### Blog Dynamique
- [x] Ajouter table `blog_posts` dans drizzle/schema.ts (titre, contenu, image, catégorie, statut, slug)
- [x] Ajouter routes tRPC blog.create, blog.update, blog.delete, blog.list, blog.getBySlug
- [x] Créer la vue Blog dans le dashboard admin (liste + éditeur d'articles)
- [x] Connecter la section Blog de la page d'accueil aux articles dynamiques
- [x] Créer une page /blog et /blog/:slug pour afficher les articles

### SEO de Base
- [x] Personnaliser le <title> de chaque page (accueil, vols, hotels, voitures, destinations)
- [x] Ajouter balises Open Graph (og:title, og:description, og:image, og:url) dans index.html
- [x] Ajouter meta description unique pour chaque page
- [x] Ajouter balises Twitter Card pour partage sur Twitter/X

## Page de Confirmation Post-Devis

- [x] Créer la page ThankYou (/merci) avec message de remerciement professionnel
- [x] Afficher le délai de réponse (24h garantie)
- [x] Ajouter bouton WhatsApp pour contact immédiat
- [x] Ajouter bouton "Retour à l'accueil"
- [x] Connecter la redirection depuis ContactForm après soumission réussie
- [x] Connecter la redirection depuis QuickQuoteModal après soumission réussie

## Numéro de Téléphone dans le Header

- [x] Ajouter le numéro +224 611 145 892 cliquable (tel:) dans Header.tsx (visible desktop + mobile)
- [x] Ajouter le numéro +224 611 145 892 cliquable dans HeaderNav.tsx (pages de services)

## Chatbot IA Widget

- [x] Créer route tRPC chatbot.ask avec IA (contexte KHAMCI VOYAGES)
- [x] Créer composant ChatWidget.tsx (widget flottant avec bulle de chat)
- [x] Ajouter suggestions rapides (destinations, tarifs, visa, contact)
- [x] Intégrer ChatWidget dans App.tsx sur toutes les pages

## Corrections Critiques — Diagnostic 11/03/2026

- [ ] Générer images Paris (Tour Eiffel, Louvre, Seine, Notre-Dame, Montmartre)
- [ ] Générer images Casablanca (Mosquée Hassan II, Médina, Corniche, Vieux quartier, Port)
- [ ] Générer images Bangkok (Grand Palace, Marché flottant, Night market, Rivière, Skyline)
- [ ] Générer images Barcelone (Gothic Quarter, Las Ramblas, Barceloneta)
- [ ] Mettre à jour ParisPage.tsx avec nouvelles URLs CDN
- [ ] Mettre à jour CasablancaPage.tsx avec nouvelles URLs CDN
- [ ] Mettre à jour BangkokPage.tsx avec nouvelles URLs CDN
- [ ] Mettre à jour BarcelonaPage.tsx avec nouvelles URLs CDN
- [ ] Corriger liens footer (/vols→/services/billetterie, /hotels→/services/hotel, /voitures→/services/location-vehicule)
- [ ] Supprimer pages orphelines (AdminDashboard.tsx, AdminLogin.tsx, ComponentShowcase.tsx)
- [ ] Corriger "15 ans" → "depuis 2021" dans Footer.tsx et WhyChooseUs.tsx

## Améliorations Diagnostic — 11/03/2026 (session actuelle)

- [x] Activer notifications email automatiques (Gmail configuré)
- [x] Ajouter liens réseaux sociaux réels (Facebook + Instagram) dans le footer
- [x] Publier 3 articles de blog avec images IA
- [x] Créer pages légales (Mentions Légales, Politique de Confidentialité, Conditions d'Utilisation)
- [x] Connecter liens légaux dans le footer vers les vraies pages
- [x] Créer sitemap.xml pour le SEO
- [x] Connecter section Témoignages à la base de données (trpc.testimonials.listApproved)
- [ ] Générer images cassées (Paris, Casablanca, Bangkok, Barcelone)
- [ ] Corriger "15 ans" → "depuis 2021" dans WhyChooseUs.tsx
- [ ] Ajouter WhatsApp cliquable dans le menu mobile du Header
- [ ] Ajouter prix indicatifs sur les cartes de destination

## Galerie Inauguration & Profil Fondatrice — 11/03/2026

- [x] Extraire et sélectionner les 12 meilleures photos de l'inauguration
- [x] Uploader les photos sur le CDN
- [x] Intégrer la galerie inauguration dans la page À Propos (grille + lightbox)
- [x] Ajouter photo couverture équipe en veste (IMG_9862) en hero de la page À Propos
- [x] Créer section profil fondatrice/directrice générale (placeholder en attente de la photo)
- [x] Remplacer le placeholder fondatrice par la vraie photo (Kadija Diaka Cissé)

## Bugs Blog Admin — 11/03/2026
- [x] Articles publiés depuis le dashboard admin n'apparaissent pas sur le site
- [x] Ajouter option upload image de couverture dans le formulaire de création d'article

## Modifications Page d'Accueil — 12/03/2026
- [x] Remplacer "Quelle est votre destination ?" par "Demander un service"
- [x] Corriger le lien "Voir les destinations" pour mener vers la page de découverte des villes
- [x] Supprimer l'espace vide entre la barre de navigation et le titre de la page d'accueil
- [x] Remplacer "Devis personnalisé en moins de 24H" par "Recevez votre demande de réservation en moins de 30 minutes" (garder Gratuit et sans engagement)

## Modifications Formulaire Devis — 12/03/2026
- [x] Transformer la grille 2 colonnes des compagnies aériennes en liste verticale

## Remplacement textes CTA — 12/03/2026
- [x] Remplacer toutes les occurrences de "Demander un/mon devis" par "Demander un service"

## Images de couverture pages — 12/03/2026
- [x] Ajouter images de couverture sur les pages services (Vols, Hôtels, Voitures)
- [x] Ajouter images de couverture sur les pages destinations (Paris, Dubaï, New York, Casablanca, Bangkok, Barcelone)

## Bugs Témoignages — 12/03/2026
- [x] Texte du commentaire ne s'affiche pas dans les cartes de témoignages
- [x] Ajouter le champ "poste/profession" dans les témoignages (BDD + formulaire + affichage)

## Mode Sombre Automatique — 12/03/2026
- [x] Configurer ThemeProvider en mode système (prefers-color-scheme)
- [x] Définir les variables CSS du mode sombre dans index.css
- [x] Adapter Header, Hero, Footer pour le mode sombre
- [x] Adapter les cartes de services, témoignages, destinations
- [x] Adapter les pages de destination et de services
- [x] Adapter le dashboard admin pour le mode sombre

## Bouton Bascule Thème — 12/03/2026
- [x] Activer ThemeProvider en mode switchable
- [x] Ajouter bouton bascule mode clair/sombre dans le Header (desktop + mobile)

## Corrections Mode Sombre — 12/03/2026
- [ ] Corriger les textes invisibles en mode sombre
- [ ] Corriger les fonds de cartes et sections en mode sombre
- [ ] Corriger les formulaires et champs de saisie en mode sombre
- [ ] Corriger les pages de destination et services en mode sombre
- [ ] Corriger les pages légales en mode sombre

## Corrections Mode Sombre (Mars 2026)

- [x] Corriger Blog.tsx - fond, textes et badges de catégorie
- [x] Corriger BlogCard.tsx - fond, textes, badges et boutons
- [x] Corriger BlogArticleDetail.tsx - fond et textes
- [x] Corriger FlightQuoteForm.tsx - inputs, labels, fond
- [x] Corriger HotelQuoteForm.tsx - inputs, labels, fond
- [x] Corriger CarQuoteForm.tsx - inputs, labels, fond
- [x] Corriger ServiceQuoteForm.tsx - inputs, labels, fond
- [x] Corriger ContactForm.tsx - fond, textes, inputs
- [x] Corriger WhyChooseUs.tsx - fond et textes
- [x] Corriger Services.tsx - cartes et textes
- [x] Corriger PopularDestinations.tsx - cartes et textes
- [x] Corriger TestimonialCard.tsx - fond et textes
- [x] Corriger Testimonials.tsx - fond et textes
- [x] Corriger HowItWorks.tsx - fond et textes
- [x] Corriger TeamBuilding.tsx - fond et textes
- [x] Corriger QuickQuoteModal.tsx - fond et textes
- [x] Corriger DiscoverGuinea.tsx - fond et textes
- [x] Corriger CityCombobox.tsx - dropdown et inputs
- [x] Corriger DestinationGalleries.tsx - fond et dégradés
- [x] Corriger ReassuranceBadges.tsx - cartes et textes
- [x] Corriger FAQ.tsx - fond, accordion et textes
- [x] Corriger ChatWidget.tsx - fenêtre chat et messages
- [x] Corriger Header.tsx - menu mobile
- [x] Corriger AdminLogin.tsx - formulaire de connexion
- [x] Corriger pages de destination (Paris, Dubai, New York, Casablanca, Bangkok, Barcelona)
- [x] Corriger pages de service (Billetterie, Hotel, Location, Assurance, Visa, Hadj)
- [x] Corriger pages légales (A Propos, Mentions Légales, Politique, CGU)
- [x] Corriger BlogArticlePage.tsx


## Optimisation SEO Complète (Mars 2026)

- [x] Ajouter/optimiser les métadonnées (index.html) (title, description) pour toutes les pages
- [x] Implémenter le balisage structuré (TravelAgency) Schema.org (LocalBusiness, Organization, BreadcrumbList)
- [x] Ajouter les balises Open Graph (index.html) et Twitter Card optimisées
- [x] Créer sitemap.xml et robots.txt
- [ ] Optimiser les images (alt text, compression)
- [ ] Améliorer la performance (Core Web Vitals)
- [ ] Ajouter des balises hreflang pour les variantes linguistiques
- [ ] Configurer Google Search Console et Bing Webmaster Tools

## Google Analytics — Mai 2026
- [x] Intégration balise Google Analytics (G-9E2RM59EN1) dans index.html

## Événements de Conversion Google Analytics — Mai 2026
- [x] Créer un helper gtag pour les événements de conversion (client/src/lib/analytics.ts)
- [x] Ajouter événement gtag dans ContactForm (soumission devis)
- [x] Ajouter événement gtag dans QuickQuoteModal (via ServiceQuoteForm)
- [x] Ajouter événement gtag dans FlightQuoteForm (devis vol)
- [x] Ajouter événement gtag dans HotelQuoteForm (devis hôtel)
- [x] Ajouter événement gtag dans CarQuoteForm (devis voiture)
- [x] Ajouter événement gtag dans ServiceQuoteForm (via sous-formulaires)
- [x] Ajouter événement gtag pour clic WhatsApp
- [x] Ajouter événement gtag pour clic téléphone
