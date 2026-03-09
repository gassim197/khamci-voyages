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
