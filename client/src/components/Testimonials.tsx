import { useState } from "react";
import { trpc } from "@/lib/trpc";
import TestimonialCard from "./TestimonialCard";
import { MessageSquare, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Testimonials - Section des témoignages clients
 *
 * Charge les témoignages approuvés depuis la base de données via tRPC.
 * Fallback sur des données statiques si aucun témoignage n'est disponible.
 */

interface TestimonialsProps {
  onAddTestimonial?: () => void;
}

// Témoignages de secours affichés si la BDD est vide
const fallbackTestimonials = [
  {
    id: "f1",
    name: "Mamadou Diallo",
    location: "Conakry, Guinée",
    rating: 5,
    content:
      "Service exceptionnel ! Mon billet Paris-Conakry a été réservé en moins d'une heure. L'équipe KHAMCI est très professionnelle et réactive.",
    service: "Billetterie",
    date: "Février 2025",
    featured: true,
  },
  {
    id: "f2",
    name: "Aïssatou Bah",
    location: "Labé, Guinée",
    rating: 5,
    content:
      "Grâce à KHAMCI VOYAGES, j'ai obtenu mon visa Schengen sans stress. Ils ont préparé tous mes documents et m'ont guidée à chaque étape.",
    service: "Assistance Visa",
    date: "Janvier 2025",
    featured: true,
  },
  {
    id: "f3",
    name: "Ibrahim Kouyaté",
    location: "Kindia, Guinée",
    rating: 5,
    content:
      "Notre groupe de 12 personnes pour l'Oumra a été parfaitement pris en charge. Hôtel à 200m de la Mosquée, transferts inclus. Je recommande vivement !",
    service: "Hadj & Oumra",
    date: "Décembre 2024",
    featured: true,
  },
];

export default function Testimonials({ onAddTestimonial }: TestimonialsProps) {
  const [showAll, setShowAll] = useState(false);

  const { data: dbTestimonials, isLoading } = trpc.testimonials.listApproved.useQuery();

  // Utiliser les témoignages BDD si disponibles, sinon fallback
  const testimonials =
    dbTestimonials && dbTestimonials.length > 0
      ? dbTestimonials.map((t) => ({
          id: String(t.id),
          name: t.clientName,
          location: t.clientLocation ?? "Guinée",
          rating: t.rating ?? 5,
          content: t.content,
          service: "Voyage",
          date: t.createdAt
            ? new Date(t.createdAt).toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })
            : "",
          featured: true,
        }))
      : fallbackTestimonials;

  const featured = testimonials.slice(0, 3);
  const displayedTestimonials = showAll ? testimonials : featured;
  const avgRating =
    testimonials.length > 0
      ? (
          testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
        ).toFixed(1)
      : "5.0";

  return (
    <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-100 rounded-full">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">TÉMOIGNAGES CLIENTS</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Ce que disent nos clients
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Découvrez les expériences de nos clients satisfaits à travers le monde
          </p>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(parseFloat(avgRating))
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {avgRating} / 5 ({testimonials.length} avis)
            </span>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF6B35]" />
          </div>
        )}

        {/* Testimonials Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial as any} />
            ))}
          </div>
        )}

        {/* Show More Button */}
        {!isLoading && testimonials.length > 3 && !showAll && (
          <div className="text-center mb-12">
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="px-8 py-3 border-2 border-gray-300 hover:border-gray-400"
            >
              Voir tous les témoignages ({testimonials.length})
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-lg p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Partagez votre expérience !</h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Vous avez voyagé avec KHAMCI VOYAGES ? Laissez un témoignage pour aider d'autres
            voyageurs
          </p>
          <Button
            onClick={onAddTestimonial}
            className="bg-white text-[#FF6B35] hover:bg-gray-100 font-bold px-8 py-3 text-lg"
          >
            Laisser un Témoignage
          </Button>
        </div>
      </div>
    </section>
  );
}
