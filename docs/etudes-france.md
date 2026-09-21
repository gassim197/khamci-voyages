# Page Études France

Route : `/etudes-france`, accessible depuis le menu Services. Intégration au site React/Express existant, sans nouvelle base ni migration.

## Parcours et suivi

Le formulaire comporte deux étapes. Aucune pièce jointe ni aucun paiement n’est demandé. Les coordonnées, le projet, le consentement horodaté et les quatre paramètres de campagne sont validés côté serveur puis enregistrés dans `quotes`.

Dans `/admin`, ouvrir **Devis**, choisir **Études France**, puis ouvrir la demande. Le projet apparaît dans le message ; les notes internes servent au compte rendu et à la prochaine action. Les statuts existants restent En attente, En cours, Complété et Rejeté. Ils décrivent le traitement interne, jamais une décision de visa ou d’admission. Le filtre de statut se combine au filtre de service. L’export CSV respecte les filtres et conserve les détails du projet. Une sélection vide n’exporte pas d’autres demandes.

Une notification email en texte brut est envoyée à l’adresse de réception existante de l’agence. La demande reste enregistrée si l’envoi email échoue. Aucun accusé de réception email au candidat n’est promis. Une erreur de base de données affiche un message de nouvel essai ; aucune réussite n’est affichée sans enregistrement.

Le consentement à ce premier contact ne vaut pas abonnement à la newsletter. Les données du candidat ne sont pas envoyées aux événements Analytics et ne sont pas conservées dans le stockage local du navigateur.

## Configuration et campagnes

Le site utilise sa configuration existante : `DATABASE_URL` pour Neon PostgreSQL, `RESEND_API_KEY` et `EMAIL_FROM` pour les notifications, et l’URL publique existante pour les aperçus sociaux. Aucun secret n’est ajouté au code.

Exemple de lien :

`https://khamci-voyages.com/etudes-france?utm_source=facebook&utm_medium=social&utm_campaign=objectif-france&utm_content=carrousel-2`

Les quatre paramètres sont limités à 100 caractères et conservés dans la demande. Les événements `study_france_started` et `study_france_submitted` utilisent le mécanisme Analytics existant ; le second se déclenche uniquement après enregistrement.

## Vérification avant publication

Vérifier les tarifs affichés avec l’offre commerciale : 1 000 000 GNF avant admission, puis 500 000 GNF après admission ; frais externes exclus. Aucun calendrier officiel ou délai de réponse n’est annoncé.

Dans un environnement de préproduction avec les services configurés, effectuer une demande de test autorisée et vérifier sa réception dans Devis → Études France ainsi que la notification email. Les tests automatisés simulent ces services et n’envoient pas de message réel.

Commandes : `pnpm check`, `pnpm test`, `pnpm build` (version de pnpm définie dans package.json).

## Validation réalisée

- TypeScript : `npm run check` réussi.
- Tests : 44 tests réussis, dont 16 couvrant la préinscription et le CSV et 2 nouveaux tests d’aperçu social.
- Production : `npm run build` réussi. L’avertissement Vite sur la taille du bundle global reste présent.
- Navigateur : vues 1440 px et 390 px inspectées ; aucun débordement horizontal sur mobile ni erreur JavaScript. Champs requis, consentement, retour à l’étape précédente, attribution de campagne et confirmation vérifiés.
- Enregistrement : échec réel vérifié avec une base non configurée, puis succès simulé dans le navigateur. La sauvegarde et la notification sont couvertes par des tests avec services simulés ; la réception réelle en production reste à vérifier après configuration.

Aperçus : [ordinateur](previews/etudes-france-desktop.jpg) · [mobile](previews/etudes-france-mobile.jpg).
