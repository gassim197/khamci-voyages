/**
 * Joyaux de la Guinée — contenu des pages /guinee/:slug
 *
 * Contenu statique (V1) : ajouter une destination = ajouter une entrée ici,
 * aucune modification du template GuineaDestinationPage n'est nécessaire.
 */

export type GuineaDestination = {
  slug: string;
  name: string;
  tagline: string;
  benefit: string;
  icon: string;
  heroImage: string;
  intro: string[];
  highlights: { title: string; description: string }[];
  activities: string[];
  practical: {
    access: string;
    duration: string;
    bestSeason: string;
    goodFor: string;
  };
  gallery: { src: string; title: string }[];
  teamBuildingLink: boolean;
};

export const guineaDestinations: GuineaDestination[] = [
  {
    slug: "fouta-djallon",
    name: "Fouta Djallon",
    tagline: "Le château d'eau de l'Afrique de l'Ouest",
    benefit: "Aventure & Nature",
    icon: "⛰️",
    heroImage: "/images/fouta-djallon-1.webp",
    intro: [
      "Surnommé le château d'eau de l'Afrique de l'Ouest, le Fouta Djallon est un massif montagneux unique où naissent trois des plus grands fleuves de la région : le Sénégal, la Gambie et le Niger. Ses plateaux verdoyants, ses cascades spectaculaires et son climat tempéré en font la destination nature par excellence de la Guinée.",
      "Terre de la culture peule, le Fouta offre bien plus que des paysages : villages accrochés aux montagnes, artisanat séculaire, hospitalité légendaire. C'est une immersion complète que vivent nos voyageurs, entre randonnées au lever du soleil et soirées de contes au coin du feu.",
    ],
    highlights: [
      {
        title: "La Dame de Mali",
        description:
          "Formation rocheuse emblématique culminant à plus de 1 500 m, offrant un panorama saisissant sur les plaines.",
      },
      {
        title: "Chute de Ditinn",
        description:
          "L'une des plus hautes cascades de Guinée, jaillissant d'une falaise de 80 mètres dans un écrin de verdure.",
      },
      {
        title: "Dalaba, la perle du Fouta",
        description:
          "Ancienne station climatique au charme colonial, jardins suspendus et air frais toute l'année.",
      },
      {
        title: "Villages peuls traditionnels",
        description:
          "Rencontres authentiques avec les communautés, découverte de l'artisanat et de l'architecture locale.",
      },
    ],
    activities: [
      "Randonnées guidées en altitude",
      "Baignade aux cascades",
      "Visites de villages peuls",
      "Ateliers d'artisanat",
      "Observation des paysages au lever du soleil",
      "Soirées culturelles",
    ],
    practical: {
      access:
        "4 à 5 heures de route depuis Conakry (Dalaba/Pita), routes goudronnées principales",
      duration: "3 à 4 jours recommandés",
      bestSeason: "Novembre à avril (saison sèche, climat frais en altitude)",
      goodFor: "Familles, groupes d'amis, séminaires d'entreprise, randonneurs",
    },
    gallery: [
      {
        src: "/images/fouta-djallon-1.webp",
        title: "Panorama montagneux au coucher de soleil",
      },
      {
        src: "/images/fouta-djallon-2.webp",
        title: "Cascade cristalline dans la forêt",
      },
      {
        src: "/images/fouta-djallon-3.webp",
        title: "Village traditionnel dans les montagnes",
      },
    ],
    teamBuildingLink: true,
  },
  {
    slug: "conakry",
    name: "Conakry",
    tagline: "La capitale entre océan et culture",
    benefit: "Culture & Détente",
    icon: "🏖️",
    heroImage: "/images/conakry-1.webp",
    intro: [
      "Presqu'île étirée sur l'Atlantique, Conakry est une capitale vivante où la culture guinéenne bat son plein rythme. Marchés colorés, scène musicale légendaire, gastronomie de rue et couchers de soleil sur l'océan : la ville se découvre comme une expérience totale.",
      "Point de départ de toutes les aventures guinéennes, Conakry mérite qu'on s'y attarde. Entre le charme historique de Kaloum, l'effervescence du marché Madina et la douceur des corniches, chaque quartier raconte une facette du pays.",
    ],
    highlights: [
      {
        title: "Marché Madina",
        description:
          "L'un des plus grands marchés d'Afrique de l'Ouest, labyrinthe fascinant de tissus, épices et artisanat.",
      },
      {
        title: "Les corniches",
        description:
          "Promenades en bord d'océan, idéales au coucher du soleil, ponctuées de restaurants et maquis conviviaux.",
      },
      {
        title: "Kaloum historique",
        description:
          "Le cœur administratif et son architecture, la grande mosquée Fayçal et le palais du peuple.",
      },
      {
        title: "Scène culturelle",
        description:
          "Concerts, ballets traditionnels et festivals : Conakry vibre au rythme du djembé et de la kora.",
      },
    ],
    activities: [
      "Visite guidée des marchés",
      "Détente sur les plages",
      "Sorties gastronomiques",
      "Concerts et spectacles",
      "Shopping artisanat",
      "Excursions en pirogue",
    ],
    practical: {
      access:
        "Aéroport international Ahmed Sékou Touré — porte d'entrée du pays",
      duration: "2 à 3 jours",
      bestSeason: "Novembre à mai (saison sèche)",
      goodFor: "Voyageurs d'affaires, courts séjours, premières découvertes",
    },
    gallery: [
      {
        src: "/images/conakry-1.webp",
        title: "Coucher de soleil sur la plage de Conakry",
      },
      {
        src: "/images/conakry-2.webp",
        title: "Marché Madina - cœur culturel de Conakry",
      },
      {
        src: "/images/conakry-3.webp",
        title: "Promenade waterfront au coucher de soleil",
      },
    ],
    teamBuildingLink: false,
  },
  {
    slug: "kindia",
    name: "Kindia",
    tagline: "Cascades et forêts aux portes de la capitale",
    benefit: "Découverte & Immersion",
    icon: "🌳",
    heroImage: "/images/kindia-1.webp",
    intro: [
      "À seulement deux heures de Conakry, Kindia est l'escapade nature idéale. Sa région regorge de cascades cristallines, de forêts tropicales et de paysages de montagne qui en font la destination week-end préférée des Conakrykas.",
      "Le joyau de la région, la Voile de la Mariée, est une cascade spectaculaire dont le voile d'eau évoque une robe de mariée. Autour, les eaux de Kilissi, les plantations et les villages soussous composent un tableau d'une Guinée verte et accueillante.",
    ],
    highlights: [
      {
        title: "La Voile de la Mariée",
        description:
          "Cascade emblématique de 70 mètres, baignade possible au pied des chutes dans un cadre enchanteur.",
      },
      {
        title: "Les eaux de Kilissi",
        description:
          "Rivières et bassins naturels d'eau claire, parfaits pour une journée de détente en pleine nature.",
      },
      {
        title: "Le mont Gangan",
        description:
          "Massif dominant la ville, randonnées avec vues panoramiques sur toute la région.",
      },
      {
        title: "Marchés et artisanat",
        description:
          "Kindia est réputée pour ses fruits, son marché animé et ses teintures artisanales.",
      },
    ],
    activities: [
      "Baignade aux cascades",
      "Randonnées en forêt",
      "Pique-niques en famille",
      "Découverte des plantations",
      "Photographie de nature",
      "Rencontres villageoises",
    ],
    practical: {
      access: "2 heures de route depuis Conakry, route nationale goudronnée",
      duration: "1 à 2 jours (excursion ou week-end)",
      bestSeason:
        "Toute l'année — les cascades sont plus spectaculaires de juin à novembre",
      goodFor: "Familles, excursions à la journée, team buildings, couples",
    },
    gallery: [
      {
        src: "/images/kindia-1.webp",
        title: "Cascade de Kindia avec arc-en-ciel",
      },
      {
        src: "/images/kindia-2.webp",
        title: "Forêt tropicale vierge avec faune sauvage",
      },
    ],
    teamBuildingLink: true,
  },
  {
    slug: "iles-de-loos",
    name: "Îles de Loos",
    tagline: "L'archipel paradisiaque face à Conakry",
    benefit: "Paradis Tropical",
    icon: "🏝️",
    heroImage: "/images/iles-loos-1.webp",
    intro: [
      "À 30 minutes de pirogue de Conakry, les îles de Loos offrent un dépaysement total : plages de sable blanc, eaux turquoise, villages de pêcheurs et rythme insulaire. Kassa, Room et Fotoba composent cet archipel où le temps semble suspendu.",
      "Refuge des Conakrykas en quête d'évasion, les îles se prêtent aussi bien à la journée détente qu'au week-end complet. Poisson grillé les pieds dans le sable, baignades, balades entre les fromagers géants : l'essence même de la douceur de vivre guinéenne.",
    ],
    highlights: [
      {
        title: "Île de Kassa",
        description:
          "La plus accessible, plages aménagées, paillotes et ambiance conviviale le week-end.",
      },
      {
        title: "Île Room",
        description:
          "Plus sauvage et préservée, criques secrètes et végétation luxuriante.",
      },
      {
        title: "Fotoba et son histoire",
        description:
          "Ancien pénitencier colonial, village de pêcheurs authentique et église centenaire.",
      },
      {
        title: "Gastronomie de la mer",
        description:
          "Poissons et fruits de mer grillés au feu de bois, directement des pirogues à l'assiette.",
      },
    ],
    activities: [
      "Baignade et farniente",
      "Sports nautiques",
      "Balades en pirogue",
      "Dégustation de poissons grillés",
      "Randonnées côtières",
      "Couchers de soleil sur l'océan",
    ],
    practical: {
      access:
        "30 minutes en pirogue depuis le port de Boulbinet (Conakry), départs réguliers",
      duration: "1 journée à un week-end",
      bestSeason: "Novembre à mai (mer calme, ciel dégagé)",
      goodFor: "Couples, familles, groupes d'amis, team buildings",
    },
    gallery: [
      {
        src: "/images/iles-loos-1.webp",
        title: "Plage paradisiaque aux Îles de Loos",
      },
      {
        src: "/images/iles-loos-2.webp",
        title: "Coucher de soleil romantique aux Îles de Loos",
      },
    ],
    teamBuildingLink: true,
  },
];

export function getGuineaDestination(slug: string): GuineaDestination | undefined {
  return guineaDestinations.find((d) => d.slug === slug);
}
