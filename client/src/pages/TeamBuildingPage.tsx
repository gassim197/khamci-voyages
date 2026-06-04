import { useState } from "react";
import {
  Users,
  Mountain,
  MessageCircle,
  Zap,
  Lightbulb,
  Award,
  Heart,
  Compass,
  Target,
  Coffee,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import QuickQuoteModal from "@/components/QuickQuoteModal";
import { Button } from "@/components/ui/button";

/**
 * TeamBuildingPage — Page dédiée /team-building
 * Contenu issu de l'offre officielle Khamci Voyages Team Building 2026.
 * Stratégie images : gradient de fallback + chemins /images/team-building/*.webp
 * (les photos seront ajoutées plus tard sans modification du code).
 */

const WHATSAPP_URL = "https://wa.me/224611145892";
const PHONE_TEL = "tel:+224611145892";
const EMAIL_MAILTO = "mailto:khamcivoyages@gmail.com";

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const benefits = [
  {
    icon: Users,
    title: "Cohésion d'équipe",
    description:
      "Les barrières hiérarchiques s'atténuent. Les collaborateurs se redécouvrent dans un contexte informel. Les tensions latentes entre services se dissolvent naturellement.",
  },
  {
    icon: MessageCircle,
    title: "Communication interne",
    description:
      "Les échanges deviennent plus fluides. Les équipes communiquent plus directement. Les projets transverses avancent plus vite.",
  },
  {
    icon: Zap,
    title: "Motivation & engagement",
    description:
      "Vos collaborateurs se sentent reconnus. Le sentiment d'appartenance s'intensifie. L'absentéisme et le turnover reculent.",
  },
  {
    icon: Lightbulb,
    title: "Créativité",
    description:
      "Un changement d'environnement débloque la pensée. Les équipes reviennent avec des idées neuves et une vision plus large.",
  },
  {
    icon: Award,
    title: "Marque employeur",
    description:
      "Les photos, les récits et les souvenirs deviennent un atout pour le recrutement. Vos équipes deviennent les meilleurs ambassadeurs.",
  },
  {
    icon: Heart,
    title: "Responsabilité sociétale",
    description:
      "Votre entreprise s'inscrit activement dans le développement du tourisme domestique et le soutien à l'économie locale guinéenne.",
  },
];

const destinations = [
  {
    name: "Les Îles de Loos",
    image: "/images/team-building/iles-de-loos.webp",
    gradient: "linear-gradient(to bottom right, #2dd4bf, #0e7490)",
    badges: ["30 min de Conakry", "Mer & détente"],
    description:
      "Archipel face à Conakry. Kassa, Room et Fotoba offrent des plages préservées, des villages de pêcheurs authentiques. Idéal pour formats d'une journée ou un weekend. Baignade, sports nautiques, dégustation de poissons frais.",
  },
  {
    name: "Kindia & la Voile de la Mariée",
    image: "/images/team-building/kindia.webp",
    gradient: "linear-gradient(to bottom right, #34d399, #0d9488)",
    badges: ["2h de Conakry", "Cascades & forêts"],
    description:
      "Destination phare pour un week-end corporate. La Voile de la Mariée est l'un des joyaux naturels de la Guinée. Randonnées, baignade au pied des chutes, découverte de la Soumba, ateliers d'artisanat local.",
  },
  {
    name: "Dalaba & le Fouta Djallon",
    image: "/images/team-building/dalaba.webp",
    gradient: "linear-gradient(to bottom right, #38bdf8, #0369a1)",
    badges: ["4-5h de route", "Altitude & fraîcheur"],
    description:
      "La perle du Fouta. Climat tempéré toute l'année, chute de Ditinn, Dame de Mali, jardins suspendus, villages peuls. Parfait pour 3-4 jours de séminaire combiné à l'activité physique de plein air.",
  },
  {
    name: "Pita & la Chute de Kinkon",
    image: "/images/team-building/pita.webp",
    gradient: "linear-gradient(to bottom right, #fdba74, #ef4444)",
    badges: ["5h de route", "Géologie spectaculaire"],
    description:
      "L'une des plus belles cascades d'Afrique de l'Ouest. Pour les équipes qui cherchent le dépaysement profond et les paysages grandioses. Randonnées encadrées, villages, soirées culturelles.",
  },
  {
    name: "Kankan & la Haute-Guinée",
    image: "/images/team-building/kankan.webp",
    gradient: "linear-gradient(to bottom right, #fbbf24, #d97706)",
    badges: ["Avion ou 1j de route", "Culture mandingue"],
    description:
      "Pour les entreprises souhaitant une immersion culturelle forte. Ville historique de la culture mandingue, fleuve Milo, patrimoine religieux et artistique.",
  },
  {
    name: "Boké & la Côte Atlantique",
    image: "/images/team-building/boke.webp",
    gradient: "linear-gradient(to bottom right, #34d399, #047857)",
    badges: ["4h de route", "Littoral & mangroves"],
    description:
      "Alternative moins connue pour un team building nature. Rio Nuñez, îles de pêcheurs, découverte des mangroves. Ambiance conviviale et dépaysement assuré.",
  },
];

const formulas = [
  {
    number: "01",
    duration: "1 journée",
    title: "Escapade Conakry",
    subtitle:
      "Une journée pour souffler, se retrouver, et ressouder l'équipe sans quitter la région de Conakry.",
    specs: [
      {
        label: "Format idéal pour",
        value:
          "Équipes de 10 à 40 collaborateurs, cadres intermédiaires, séminaires mensuels ou trimestriels.",
      },
      {
        label: "Destinations types",
        value: "Îles de Loos (Kassa, Room), Cascades de la Soumba, Kindia.",
      },
      {
        label: "Rythme",
        value:
          "Départ matinal, activités en matinée, déjeuner convivial, activités en après-midi, retour en fin d'après-midi.",
      },
      {
        label: "Activités phares",
        value:
          "Jeux de cohésion encadrés, baignade, dégustation locale, mini-challenges par équipe, clôture en cercle de partage.",
      },
    ],
  },
  {
    number: "02",
    duration: "2 jours / 1 nuit",
    title: "Expédition Kindia",
    subtitle:
      "Un weekend en pleine nature pour marier cohésion d'équipe et émerveillement devant les paysages guinéens.",
    specs: [
      {
        label: "Format idéal pour",
        value:
          "Équipes de 15 à 60 personnes, événement annuel d'entreprise, lancement d'exercice, fusion d'équipes.",
      },
      {
        label: "Destinations types",
        value: "Kindia, la Voile de la Mariée et les Eaux Kilissi.",
      },
      {
        label: "Rythme",
        value:
          "Départ samedi matin, activités toute la journée, soirée au bivouac ou hébergement, matinée active dimanche, retour début après-midi.",
      },
      {
        label: "Activités phares",
        value:
          "Randonnée guidée vers la cascade, baignade, ateliers culturels, soirée autour du feu, photos souvenirs professionnelles.",
      },
    ],
  },
  {
    number: "03",
    duration: "3 à 4 jours / 2 à 3 nuits",
    title: "Immersion Fouta Djallon",
    subtitle:
      "Le format premium pour un séminaire d'entreprise combinant travail stratégique, cohésion profonde et immersion dans les plus beaux paysages de Guinée.",
    specs: [
      {
        label: "Format idéal pour",
        value:
          "Comités de direction, équipes commerciales, séminaires stratégiques annuels, équipes à forte valeur ajoutée de 10 à 40 personnes.",
      },
      {
        label: "Destinations types",
        value:
          "Dalaba, Pita, Mali-Yoro, Chute de Kinkon, Dame de Mali. Possibilité de combiner plusieurs sites.",
      },
      {
        label: "Rythme",
        value:
          "Trajet aller organisé, matinées consacrées aux sessions stratégiques, après-midi dédiés aux activités et découvertes, soirées de cohésion.",
      },
      {
        label: "Activités phares",
        value:
          "Facilitation de séminaire, randonnées en altitude, découverte de la culture peule, ateliers de leadership, soirées culturelles, challenges inter-équipes.",
      },
    ],
  },
  {
    number: "04",
    duration: "Sur mesure",
    title: "Destination Sur Mesure",
    subtitle:
      "Votre projet est unique. Nous le construisons avec vous, de la première idée à la dernière photo souvenir.",
    specs: [
      {
        label: "Format idéal pour",
        value:
          "Entreprises avec un besoin atypique — anniversaire d'entreprise, fusion, intégration d'une nouvelle équipe, événement client interne.",
      },
      {
        label: "Destinations",
        value:
          "Toutes les destinations guinéennes. Possibilité d'inclure des partenaires internationaux si besoin.",
      },
      {
        label: "Démarche",
        value:
          "Atelier de cadrage avec votre équipe RH ou direction, co-construction de l'expérience, validation par étapes, exécution pilotée par un chef de projet dédié.",
      },
      {
        label: "Spécificité",
        value:
          "Liberté totale sur le programme, les activités, le niveau de prestation et les moments clés de l'événement.",
      },
    ],
  },
];

const activityUniverses = [
  {
    icon: Mountain,
    title: "Nature & Aventure",
    description:
      "Randonnées guidées, ascensions modérées, découvertes de cascades, baignades en rivière, traversées en pirogue. Pour les équipes qui veulent transpirer ensemble et dépasser leurs limites.",
    examples:
      "Randonnée vers la Voile de la Mariée • Ascension des panoramas du Fouta • Traversées des îles de Loos • Baignade aux chutes de la Soumba.",
  },
  {
    icon: Compass,
    title: "Culture & Découverte",
    description:
      "Immersions dans les villages, rencontres avec artisans et anciens, découvertes culinaires, visites du patrimoine. Pour les équipes qui cherchent du sens et de l'authenticité.",
    examples:
      "Ateliers d'artisanat peul • Dégustations de mets traditionnels • Contes au coin du feu • Rencontres avec les griots.",
  },
  {
    icon: Target,
    title: "Cohésion & Performance",
    description:
      "Jeux de cohésion structurés, challenges inter-équipes, ateliers de leadership, sessions de coaching, rétrospectives d'équipe facilitées. Pour les équipes qui veulent repartir avec des acquis concrets.",
    examples:
      "Chasses au trésor personnalisées • Escape game grandeur nature • Ateliers leadership • Sessions de facilitation stratégique.",
  },
  {
    icon: Coffee,
    title: "Bien-être & Détente",
    description:
      "Moments de partage conviviaux, soirées thématiques, feux de camp, dégustations, yoga en pleine nature, temps libres organisés. Pour les équipes qui ont besoin de décompresser avant de redémarrer plus fort.",
    examples:
      "Soirées feu de camp • Dîners de gala en extérieur • Sessions bien-être au lever du soleil • Cocktails face à l'océan.",
  },
];

const services = [
  {
    label: "Transport",
    text: "aller-retour, véhicules adaptés (minibus/autocar/4x4), chauffeurs expérimentés.",
  },
  {
    label: "Hébergement",
    text: "hôtels, campements de charme, résidences rénovées, partenaires validés.",
  },
  {
    label: "Restauration",
    text: "tous les repas organisés, menus équilibrés, gastronomie locale, adaptations possibles.",
  },
  {
    label: "Encadrement",
    text: "chef de projet Khamci dédié, guides locaux, animateurs de cohésion, facilitateurs premium.",
  },
  {
    label: "Sécurité",
    text: "assistance médicale, trousse d'urgence, itinéraires validés, coordination autorités locales.",
  },
  {
    label: "Logistique événementielle",
    text: "matériel d'animation, sonorisation, décoration, équipement sportif, t-shirts personnalisés sur demande.",
  },
  {
    label: "Captation",
    text: "photographe professionnel, reportage photo et courte vidéo souvenir sur demande.",
  },
  {
    label: "Assurance",
    text: "couverture voyage collective pour tous les participants pendant toute la durée.",
  },
  {
    label: "Accompagnement post-séjour",
    text: "dossier de restitution, photos, moments-clés, retours qualitatifs, debriefing RH possible.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Premier échange",
    delay: "délai indicatif 30 minutes",
    text: "Nous écoutons vos objectifs, vos contraintes et vos envies. Format libre : en visioconférence ou dans vos bureaux. Aucun engagement à cette étape.",
  },
  {
    number: "02",
    title: "Proposition sur mesure",
    delay: "sous 5 jours ouvrés",
    text: "Nous vous envoyons une proposition détaillée : destinations recommandées, programme-type, prestations incluses, budget global et options. Vous ajustez jusqu'à ce que tout vous convienne.",
  },
  {
    number: "03",
    title: "Validation & contrat",
    delay: "1 semaine",
    text: "Une fois la proposition validée, nous signons un contrat de prestation clair. Acompte de réservation, calendrier de paiement adapté à vos procédures internes.",
  },
  {
    number: "04",
    title: "Organisation & coordination",
    delay: "selon la date prévue",
    text: "Nous prenons en charge toute l'organisation : transport, hébergement, restauration, intervenants, matériel. Vous recevez des points d'étape réguliers et un livret participant à distribuer à vos équipes.",
  },
  {
    number: "05",
    title: "Exécution du séjour",
    delay: "durée du séjour",
    text: "Notre chef de projet accompagne physiquement l'équipe pendant toute la durée de l'expérience. Il est votre interlocuteur unique. Vous restez concentré sur votre équipe.",
  },
  {
    number: "06",
    title: "Restitution & mémoire",
    delay: "sous 2 semaines après le séjour",
    text: "Nous vous livrons un dossier souvenir complet (photos, vidéo, retours qualitatifs). Nous proposons un debrief avec votre direction RH pour mesurer les bénéfices et préparer la prochaine édition.",
  },
];

const reasons = [
  {
    number: "01",
    title: "Une expertise double : voyages professionnels & événementiel",
    text: "Khamci est avant tout une agence de voyage d'affaires reconnue par des entreprises partenaires B2B. Cette expérience opérationnelle nous distingue des simples organisateurs : nous maîtrisons la logistique ET la relation entreprise.",
  },
  {
    number: "02",
    title: "Un ancrage local fort",
    text: "Nous sommes Guinéens et basés à Conakry. Nous connaissons le terrain, les saisons, les routes, les acteurs locaux. Cette connaissance intime nous permet d'éviter les pièges et de bâtir des expériences authentiques.",
  },
  {
    number: "03",
    title: "Un interlocuteur unique",
    text: "Vous ne parlez qu'à une seule personne pendant toute la durée du projet. Notre chef de projet dédié vous accompagne de la première réunion au débriefing post-séjour. Pas de dispersion, pas de messages perdus.",
  },
  {
    number: "04",
    title: "Une logique de partenariat, pas de prestataire",
    text: "Nous ne vendons pas une prestation standardisée. Nous co-construisons avec vous un programme qui sert vos objectifs. Notre réussite se mesure à la vôtre.",
  },
  {
    number: "05",
    title: "Une exigence de sécurité",
    text: "La sécurité de vos collaborateurs est notre priorité absolue. Chaque destination est reconnue en amont, chaque prestataire validé, chaque itinéraire sécurisé. Nous refuserons toujours une destination si nous avons un doute.",
  },
  {
    number: "06",
    title: "Un engagement pour le tourisme domestique",
    text: "En travaillant avec nous, vous soutenez les communautés locales, les artisans, les hébergeurs et les guides guinéens. C'est une démarche dont vos collaborateurs et vos parties prenantes seront fiers.",
  },
];

const quoteInfos = [
  "Nom de votre entreprise et secteur d'activité",
  "Taille de l'équipe concernée (nombre de participants prévus)",
  "Objectifs recherchés (cohésion, séminaire stratégique, célébration...)",
  "Formule qui attire votre attention (Escapade, Expédition, Immersion, Sur mesure)",
  "Destination souhaitée si vous avez une préférence",
  "Dates envisagées ou période approximative",
  "Enveloppe budgétaire indicative si vous en avez une",
  "Toute contrainte particulière (alimentation, mobilité, langue)",
];

const contactItems = [
  { icon: Phone, label: "Téléphone", value: "+224 611 14 58 92", href: PHONE_TEL },
  { icon: Mail, label: "Email", value: "khamcivoyages@gmail.com", href: EMAIL_MAILTO },
  {
    icon: MapPin,
    label: "En agence",
    value: "Almamya, derrière la bluezone de Kaloum — Conakry, Guinée",
    href: null,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Discuter sur WhatsApp",
    href: WHATSAPP_URL,
  },
];

export default function TeamBuildingPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <HeaderNav />

      {/* A. HERO */}
      <section
        className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 bg-cover bg-center py-28 md:py-36"
        style={{
          backgroundImage:
            "url(/images/team-building/hero.webp), linear-gradient(to bottom right, #f97316, #dc2626)",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative container z-10 text-center text-white max-w-4xl">
          <span className="inline-block bg-orange-500 text-white text-sm font-bold tracking-wide uppercase px-4 py-1.5 rounded-full mb-6">
            Corporate & Événementiel
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Team Building & Tourisme Domestique
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Une offre corporate pensée pour vos équipes. Une célébration de la Guinée que vos
            collaborateurs méritent de découvrir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToId("devis")}
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-base"
            >
              Demander un devis
            </Button>
            <Button
              onClick={() => scrollToId("formules")}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg text-base"
            >
              Découvrir nos formules
            </Button>
          </div>
        </div>
      </section>

      {/* B. NOTRE DOUBLE PROMESSE */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg gradient-text mb-4">Notre double promesse</h2>
            <p className="text-body text-gray-600 dark:text-gray-300">
              Un Team Building Khamci ne ressemble à aucun autre. Il s'articule autour de deux
              missions indissociables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/40">
              <div className="inline-flex p-3 rounded-xl bg-orange-100 dark:bg-orange-900/40 mb-4">
                <Users size={28} className="text-orange-500 dark:text-orange-400" />
              </div>
              <h3 className="heading-md mb-3 text-gray-900 dark:text-white">
                Renforcer la performance collective
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Nous concevons chaque expérience comme un levier concret de cohésion, de
                motivation et d'alignement d'équipes. Vous repartez avec une équipe plus soudée,
                plus créative, plus engagée — et avec des bénéfices mesurables au retour au bureau.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40">
              <div className="inline-flex p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 mb-4">
                <Mountain size={28} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="heading-md mb-3 text-gray-900 dark:text-white">
                Faire rayonner les trésors guinéens
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Nous construisons chaque programme autour de sites guinéens d'exception : Fouta
                Djallon, îles de Loos, cascades de Kindia, montagnes de Dalaba. Vos collaborateurs
                deviennent des ambassadeurs de leur propre pays et en reviennent avec un attachement
                renouvelé.
              </p>
            </div>
          </div>

          <blockquote className="max-w-3xl mx-auto mt-12 text-center text-lg md:text-xl italic text-gray-700 dark:text-gray-300">
            « Les meilleures équipes ne se décrètent pas depuis un bureau. Elles se construisent sur
            le terrain, dans le partage et la découverte. »
          </blockquote>
        </div>
      </section>

      {/* C. BÉNÉFICES POUR L'ENTREPRISE */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg gradient-text mb-4">Pourquoi investir dans un Team Building</h2>
            <p className="text-body text-gray-600 dark:text-gray-300">
              Un Team Building n'est pas une dépense. C'est un investissement stratégique dont les
              retombées se mesurent sur plusieurs axes de performance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="service-card group">
                  <div className="mb-4 inline-block p-3 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon size={28} className="text-orange-500 dark:text-orange-400" />
                  </div>
                  <h3 className="heading-md mb-2 text-gray-900 dark:text-white">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* D. NOS DESTINATIONS */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg gradient-text mb-4">Nos destinations en Guinée</h2>
            <p className="text-body text-gray-600 dark:text-gray-300">
              Nous avons sélectionné des sites qui combinent beauté exceptionnelle, accessibilité
              maîtrisée et richesse culturelle. Chacune a fait l'objet d'une reconnaissance
              personnelle de notre équipe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover-lift"
              >
                <div
                  className="aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(${dest.image}), ${dest.gradient}` }}
                  role="img"
                  aria-label={dest.name}
                />
                <div className="p-6">
                  <h3 className="heading-md mb-3 text-gray-900 dark:text-white">{dest.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {dest.badges.map((badge) => (
                      <span
                        key={badge}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {dest.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-10 p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/40">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-bold text-gray-900 dark:text-white">Une flexibilité totale —</span>{" "}
              Vous avez un lieu précis en tête qui n'apparaît pas dans cette liste ? Nous savons
              organiser des séjours sur mesure partout en Guinée.
            </p>
          </div>
        </div>
      </section>

      {/* E. NOS FORMULES */}
      <section id="formules" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 scroll-mt-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg gradient-text mb-4">Nos formules Team Building</h2>
            <p className="text-body text-gray-600 dark:text-gray-300">
              Quatre formats clés, pensés pour s'adapter à vos objectifs, vos budgets et la taille de
              vos équipes. Chaque formule peut être personnalisée.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {formulas.map((formula) => (
              <div
                key={formula.number}
                className="flex flex-col p-8 rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm hover-lift"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold text-lg">
                    {formula.number}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-3 py-1 rounded-full">
                    {formula.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {formula.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 italic mb-6">{formula.subtitle}</p>

                <dl className="space-y-3 mb-8 flex-1">
                  {formula.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt className="text-sm font-semibold text-gray-900 dark:text-white">
                        {spec.label}
                      </dt>
                      <dd className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="mt-auto inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  Demander un devis pour cette formule
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F. NOS UNIVERS D'ACTIVITÉS */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg gradient-text mb-4">Nos univers d'activités</h2>
            <p className="text-body text-gray-600 dark:text-gray-300">
              Nos programmes combinent quatre univers complémentaires. Chaque séjour peut panacher
              les quatre selon le profil et les objectifs de votre équipe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {activityUniverses.map((universe) => {
              const Icon = universe.icon;
              return (
                <div
                  key={universe.title}
                  className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 mb-4">
                    <Icon size={28} className="text-orange-500 dark:text-orange-400" />
                  </div>
                  <h3 className="heading-md mb-3 text-gray-900 dark:text-white">{universe.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {universe.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Exemples :</span>{" "}
                    {universe.examples}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* G. NOS PRESTATIONS */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg gradient-text mb-4">
              Nos prestations : ce que Khamci prend en charge
            </h2>
            <p className="text-body text-gray-600 dark:text-gray-300">
              Vous vous concentrez sur vos équipes. Nous nous occupons du reste. Chaque formule
              inclut un socle complet de prestations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 max-w-5xl mx-auto">
            {services.map((service) => (
              <div key={service.label} className="flex gap-3">
                <CheckCircle
                  size={22}
                  className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                />
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {service.label} :
                  </span>{" "}
                  {service.text}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto mt-10 p-6 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/40">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Prestations optionnelles</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Sur demande, nous enrichissons votre séjour : coach professionnel, animateur célèbre,
              séances de team coaching, production vidéo professionnelle, cadeaux personnalisés,
              invités VIP, interventions de speakers locaux. Chiffré dans le devis personnalisé.
            </p>
          </div>
        </div>
      </section>

      {/* H. NOTRE PROCESSUS */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg gradient-text mb-4">Comment nous travaillons ensemble</h2>
            <p className="text-body text-gray-600 dark:text-gray-300">
              De la première prise de contact au débriefing post-événement, notre méthode est
              structurée en six étapes. Vous gardez la maîtrise à chaque moment-clé.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="relative p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <span className="text-4xl font-bold text-orange-500/30 dark:text-orange-400/30">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400 mb-3">
                  {step.delay}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* I. POURQUOI CHOISIR KHAMCI */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg gradient-text mb-4">Pourquoi choisir Khamci Voyages</h2>
            <p className="text-body text-gray-600 dark:text-gray-300">
              Vous avez peut-être d'autres interlocuteurs possibles. Voici les six raisons qui font
              la différence avec Khamci.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reasons.map((reason) => (
              <div
                key={reason.number}
                className="p-6 rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold mb-4">
                  {reason.number}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {reason.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* J. CTA FINAL — DEMANDER UN DEVIS */}
      <section
        id="devis"
        className="py-16 md:py-24 bg-gradient-to-br from-orange-500 to-red-600 scroll-mt-20"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Et maintenant, à vous de jouer</h2>
            <p className="text-lg text-white/90">
              Si cette offre résonne avec les envies de votre entreprise, la suite est très simple.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-950 rounded-2xl p-8 md:p-10 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Demander un devis personnalisé
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Un devis Khamci est toujours sur mesure. Nous ne pratiquons pas de tarification
              standardisée : chaque séjour est unique. Pour construire un devis adapté, nous avons
              besoin de quelques informations.
            </p>

            <ul className="space-y-2 mb-8">
              {quoteInfos.map((info) => (
                <li key={info} className="flex gap-3 text-gray-700 dark:text-gray-300">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{info}</span>
                </li>
              ))}
            </ul>

            <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/40 mb-8">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-bold text-gray-900 dark:text-white">Engagement Khamci —</span>{" "}
                Dès réception de vos éléments, nous vous transmettrons un devis détaillé sous 5 jours
                ouvrés. La consultation et la proposition sont gratuites et sans engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <Icon size={22} className="text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  </>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Demander un devis par formulaire
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp direct
              </a>
              <a
                href={PHONE_TEL}
                className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                <Phone size={18} />
                Appeler maintenant
              </a>
            </div>
          </div>

          <p className="text-center text-white/90 italic mt-10 max-w-2xl mx-auto">
            Merci de votre confiance. Et à bientôt sur les plus belles terres de Guinée.
            <br />— L'équipe Khamci Voyages
          </p>
        </div>
      </section>

      <Footer />

      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        source="team-building"
      />
    </div>
  );
}
