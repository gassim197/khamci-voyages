export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "actualité" | "destination" | "conseil" | "offre";
  image: string;
  author: string;
  date: string;
  readTime: number;
  featured?: boolean;
}

export const blogArticles: BlogArticle[] = [
  {
    id: "fouta-djallon-guide",
    title: "Fouta Djallon : Le Guide Complet pour Découvrir les Cascades de Guinée",
    summary:
      "Découvrez les plus belles cascades de Fouta Djallon, les meilleurs moments pour visiter et nos conseils d'experts pour une expérience inoubliable.",
    content: `
Fouta Djallon est l'une des destinations les plus spectaculaires de Guinée. Cette chaîne montagneuse verdoyante offre des paysages à couper le souffle et des expériences authentiques.

## Pourquoi Fouta Djallon ?

Les montagnes de Fouta Djallon s'élèvent à plus de 1000 mètres et offrent des vues panoramiques spectaculaires. Les cascades cristallines, les villages traditionnels et l'air pur font de cette région un paradis pour les amoureux de nature.

## Les Cascades à Ne Pas Manquer

**Cascade de Kinkon** : La plus haute cascade de Guinée avec une chute de 80 mètres. Idéale pour la photographie et la baignade.

**Cascade de Ditinn** : Entourée de végétation luxuriante, parfaite pour une immersion nature.

**Cascade de Pita** : Accessible et spectaculaire, avec des bassins naturels pour se baigner.

## Meilleure Période pour Visiter

La meilleure période est de novembre à février, pendant la saison sèche. Les températures sont agréables et les routes sont praticables.

## Nos Conseils d'Experts

- Portez des chaussures de randonnée robustes
- Apportez de la crème solaire et un chapeau
- Prévoyez au moins 3-4 jours pour explorer la région
- Engagez un guide local pour une meilleure expérience

Laissez KHAMCI VOYAGES organiser votre aventure à Fouta Djallon. Nous connaissons chaque cascade, chaque village et chaque sentier.
    `,
    category: "destination",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/fouta-djallon-1-HV8GNusJeY7gpwrRiJ3ey2.webp",
    author: "Mamadou Diallo",
    date: "2026-02-28",
    readTime: 8,
    featured: true,
  },
  {
    id: "conakry-weekend",
    title: "Week-end à Conakry : Les Meilleures Activités et Restaurants",
    summary:
      "Explorez la capitale guinéenne en 3 jours : plages dorées, marchés colorés, restaurants authentiques et vie nocturne vibrante.",
    content: `
Conakry, la capitale de la Guinée, est une ville dynamique qui mélange tradition et modernité. Voici notre guide pour un week-end parfait.

## Jour 1 : Découverte Urbaine

Commencez par le Marché Madina, le cœur battant de Conakry. Vous y trouverez des textiles colorés, des artisanats locaux et l'énergie authentique de la ville.

L'après-midi, visitez le Musée National pour comprendre l'histoire riche de la Guinée.

## Jour 2 : Plages et Détente

Les îles de Loos sont accessibles en bateau depuis Conakry. Passez la journée à vous détendre sur des plages de sable blanc avec des eaux turquoise.

Dîner en bord de mer avec vue sur le coucher de soleil.

## Jour 3 : Gastronomie et Culture

Découvrez la cuisine guinéenne authentique. Ne manquez pas :
- Le riz gras (plat national)
- Le poisson grillé frais
- Les jus de fruits tropicaux

Terminez par une soirée dans un club local pour découvrir la musique guinéenne.

## Nos Recommandations

KHAMCI VOYAGES peut organiser votre séjour à Conakry avec des hôtels sélectionnés, des restaurants authentiques et des activités uniques.
    `,
    category: "destination",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/conakry-1-nzgispaK4KkekcAE6qEAu2.webp",
    author: "Aïssatou Bah",
    date: "2026-02-25",
    readTime: 6,
  },
  {
    id: "team-building-afrique",
    title: "Team Building en Afrique : Pourquoi la Guinée est la Destination Idéale",
    summary:
      "Découvrez pourquoi les entreprises choisissent la Guinée pour leurs événements de team building et comment maximiser l'engagement de votre équipe.",
    content: `
Le team building en Afrique est devenu une tendance majeure pour les entreprises qui cherchent à renforcer la cohésion de leurs équipes.

## Pourquoi la Guinée ?

La Guinée offre une combinaison unique de :
- Paysages naturels spectaculaires
- Coûts compétitifs par rapport aux destinations européennes
- Accueil chaleureux et authentique
- Activités variées pour tous les niveaux

## Activités de Team Building Recommandées

**Randonnée Fouta Djallon** : Renforce la confiance et l'esprit d'équipe à travers des défis naturels.

**Immersion Culturelle Conakry** : Découverte des marchés locaux et cuisine traditionnelle ensemble.

**Aventure Îles de Loos** : Activités nautiques et détente en groupe.

**Projet Communautaire** : Travail avec les communautés locales pour un impact social positif.

## Résultats Mesurables

Les entreprises qui organisent des team building en Guinée rapportent :
- 85% d'amélioration dans la cohésion d'équipe
- 70% d'augmentation de la motivation
- Souvenirs durables et liens renforcés

## Logistique Complète

KHAMCI VOYAGES gère tous les détails : transport, hébergement, activités, assurance groupe et suivi post-événement.
    `,
    category: "conseil",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/team-building-corporate-ZouKXetLzNz2fYDPBg9YLD.webp",
    author: "Ibrahim Sow",
    date: "2026-02-20",
    readTime: 7,
    featured: true,
  },
  {
    id: "visa-guinee-guide",
    title: "Demande de Visa pour la Guinée : Guide Complet et Conseils 2026",
    summary:
      "Tout ce que vous devez savoir sur la demande de visa pour la Guinée : documents requis, délais, tarifs et nos conseils pour éviter les erreurs.",
    content: `
La demande de visa pour la Guinée peut sembler compliquée, mais avec les bonnes informations, c'est simple et rapide.

## Qui a Besoin d'un Visa ?

Les ressortissants de la plupart des pays ont besoin d'un visa pour entrer en Guinée. Cependant, certains pays bénéficient d'exemptions (à vérifier auprès de l'ambassade).

## Documents Requis

1. Passeport valide (minimum 6 mois de validité)
2. Formulaire de demande complété
3. 2 photos d'identité
4. Lettre d'invitation ou réservation d'hôtel
5. Preuve de moyens financiers
6. Certificat de vaccination (fièvre jaune recommandée)

## Délais et Tarifs

- **Délai standard** : 5-7 jours
- **Délai express** : 2-3 jours (tarif majoré)
- **Tarif** : Varie selon le pays (30-100 EUR environ)

## Nos Conseils d'Experts

1. Commencez les démarches 2-3 mois avant votre voyage
2. Vérifiez les exigences spécifiques de votre pays
3. Gardez des copies de tous les documents
4. Utilisez un service de visa fiable

## KHAMCI VOYAGES Vous Aide

Notre service d'assistance visa prend en charge :
- Vérification des documents
- Préparation du dossier complet
- Suivi de la demande
- Garantie visa ou remboursement

Ne laissez pas le visa vous stresser. Nous gérons tout.
    `,
    category: "conseil",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/hero-airplane-sunset-64duN9FBfa4CZjHNXpHzzz.webp",
    author: "Fatou Diallo",
    date: "2026-02-18",
    readTime: 9,
  },
  {
    id: "nouvelles-offres-mars",
    title: "Nouvelles Offres Spéciales Mars 2026 : Réductions jusqu'à 30%",
    summary:
      "Découvrez nos offres exclusives du mois de mars : circuits réduits, vols négociés et packages team building à prix spéciaux.",
    content: `
KHAMCI VOYAGES lance ses offres spéciales du mois de mars avec des réductions exceptionnelles.

## Offres Exclusives

**Circuit Fouta Djallon** : 5 jours / 4 nuits
- Prix régulier : 1,200,000 GNF
- Prix spécial mars : 840,000 GNF (-30%)
- Inclus : Transport, hébergement, guide, repas

**Séjour Îles de Loos** : 3 jours / 2 nuits
- Prix régulier : 800,000 GNF
- Prix spécial mars : 560,000 GNF (-30%)
- Inclus : Transport, hôtel 4 étoiles, activités nautiques

**Team Building Complet** : 3 jours / 2 nuits
- Prix régulier : 2,000,000 GNF
- Prix spécial mars : 1,400,000 GNF (-30%)
- Inclus : Tout (transport, hébergement, activités, assurance)

## Conditions

- Réservation avant le 31 mars 2026
- Voyage avant le 30 juin 2026
- Non cumulable avec d'autres offres

## Réservez Maintenant

Les places sont limitées. Contactez-nous dès aujourd'hui pour sécuriser votre réservation à ces tarifs exceptionnels.
    `,
    category: "offre",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/iles-loos-1-2fztnGfEJ2sqUphFxcfmTd.webp",
    author: "Khadija Camara",
    date: "2026-02-15",
    readTime: 5,
    featured: true,
  },
  {
    id: "tendances-voyage-2026",
    title: "Les Tendances du Voyage en 2026 : Tourisme Durable et Expériences Authentiques",
    summary:
      "Découvrez les tendances qui façonnent le secteur du voyage en 2026 : tourisme responsable, voyages sur mesure et immersion locale.",
    content: `
Le secteur du voyage évolue rapidement. Voici les tendances majeures de 2026.

## 1. Tourisme Durable

Les voyageurs cherchent de plus en plus à minimiser leur impact environnemental. Cela signifie :
- Préférence pour les transports locaux
- Soutien aux communautés locales
- Respect de l'environnement

## 2. Voyages sur Mesure

Fini les circuits standardisés. Les voyageurs veulent des expériences personnalisées qui correspondent à leurs intérêts spécifiques.

## 3. Immersion Locale

Les touristes ne veulent plus être des spectateurs. Ils veulent :
- Apprendre la langue locale
- Cuisiner avec les habitants
- Participer à la vie locale

## 4. Bien-être et Détente

Le wellness travel est en hausse. Les voyageurs cherchent à :
- Se reconnecter avec la nature
- Pratiquer le yoga et la méditation
- Échapper au stress urbain

## 5. Voyage en Groupe (Post-Pandémie)

Les voyages en groupe et les team building sont de retour en force.

## Comment KHAMCI VOYAGES S'Adapte

Nous avons ajusté nos offres pour répondre à ces tendances :
- Circuits durables et responsables
- Voyages 100% personnalisés
- Immersion authentique avec les communautés
- Packages bien-être et détente
- Team building transformationnels

Voyagez en 2026 de manière responsable et authentique avec KHAMCI VOYAGES.
    `,
    category: "actualité",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/kindia-1-VSHwFpKEaWVcw3taNQmsGf.webp",
    author: "Moussa Keïta",
    date: "2026-02-10",
    readTime: 7,
  },
];
