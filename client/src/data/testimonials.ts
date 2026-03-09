/**
 * Testimonials Data - KHAMCI VOYAGES
 * 
 * Données des témoignages clients avec ratings et commentaires
 */

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  date: string;
  verified: boolean;
  featured?: boolean;
}

export const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Aminata Diallo",
    title: "Directrice Marketing",
    location: "Conakry, Guinée",
    rating: 5,
    comment: "KHAMCI VOYAGES a organisé mon voyage en famille à Paris en seulement 24h ! L'équipe était très professionnelle et attentive à tous les détails. Je recommande vivement !",
    image: "👩‍💼",
    date: "2026-02-15",
    verified: true,
    featured: true
  },
  {
    id: "2",
    name: "Mohamed Keita",
    title: "Entrepreneur",
    location: "Dakar, Sénégal",
    rating: 5,
    comment: "Voyage d'affaires à Dubaï parfaitement organisé. Les hôtels choisis étaient excellents et les vols bien coordonnés. Service impeccable du début à la fin.",
    image: "👨‍💼",
    date: "2026-02-10",
    verified: true,
    featured: true
  },
  {
    id: "3",
    name: "Fatoumata Bah",
    title: "Étudiante",
    location: "Kindia, Guinée",
    rating: 5,
    comment: "Mon voyage à New York était un rêve ! KHAMCI VOYAGES a rendu tout cela possible avec des prix abordables et une excellente organisation. Merci beaucoup !",
    image: "👩‍🎓",
    date: "2026-02-05",
    verified: true,
    featured: true
  },
  {
    id: "4",
    name: "Ibrahima Sow",
    title: "Chef d'Entreprise",
    location: "Mamou, Guinée",
    rating: 4,
    comment: "Team building en Guinée très réussi ! L'équipe de KHAMCI a bien coordonné toutes les activités. Nos collaborateurs ont adoré l'expérience.",
    image: "👨‍💼",
    date: "2026-01-28",
    verified: true
  },
  {
    id: "5",
    name: "Aïssatou Sy",
    title: "Consultante",
    location: "Bamako, Mali",
    rating: 5,
    comment: "Assistance visa très efficace ! J'ai reçu mon visa pour la France en moins d'une semaine. KHAMCI VOYAGES gère tous les détails administratifs.",
    image: "👩‍💼",
    date: "2026-01-20",
    verified: true
  },
  {
    id: "6",
    name: "Ousmane Diop",
    title: "Ingénieur",
    location: "Abidjan, Côte d'Ivoire",
    rating: 4,
    comment: "Voyage à Barcelone magnifique ! Les recommandations de restaurants et hôtels étaient parfaites. Je vais refaire appel à KHAMCI pour mon prochain voyage.",
    image: "👨‍💼",
    date: "2026-01-15",
    verified: true
  }
];
