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
