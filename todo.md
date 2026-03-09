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

- [ ] Refondre le design du dashboard avec les couleurs KHAMCI VOYAGES (bleu marine + orange)
- [ ] Améliorer les cartes de statistiques avec icônes et couleurs
- [ ] Améliorer les tableaux de devis et témoignages
- [ ] Améliorer la page de connexion admin

## Paramètres Admin - Changement de mot de passe

- [ ] Ajouter la table admin_settings en base de données pour stocker le mot de passe hashé
- [ ] Ajouter route tRPC auth.changeAdminPassword (vérif ancien MDP + hash bcrypt)
- [ ] Ajouter onglet "Paramètres" dans le dashboard avec formulaire de changement de mot de passe

## Profil Administrateur

- [ ] Ajouter les champs profil dans la table admin_settings (nom, email, téléphone, bio, avatar)
- [ ] Ajouter routes tRPC auth.getAdminProfile et auth.updateAdminProfile
- [ ] Créer la section Profil dans le dashboard (onglet dédié)
- [ ] Formulaire de modification : nom, email, téléphone, poste, bio
- [ ] Upload de photo de profil (avatar)
- [ ] Afficher le nom/avatar dans le header du dashboard
