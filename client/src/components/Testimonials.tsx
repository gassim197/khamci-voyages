import { useState, useEffect } from "react";
import { Testimonial, initialTestimonials } from "@/data/testimonials";
import TestimonialCard from "./TestimonialCard";
import { MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Testimonials - Section des témoignages clients
 * 
 * Affiche les témoignages clients avec ratings et permet de voir tous les avis
 * Inclut un CTA pour laisser un témoignage
 */

interface TestimonialsProps {
  onAddTestimonial?: () => void;
}

export default function Testimonials({ onAddTestimonial }: TestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Charger les témoignages depuis localStorage
    const stored = localStorage.getItem("khamci-testimonials");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTestimonials([...initialTestimonials, ...parsed]);
      } catch {
        setTestimonials(initialTestimonials);
      }
    } else {
      setTestimonials(initialTestimonials);
    }
  }, []);

  const featured = testimonials.filter(t => t.featured).slice(0, 3);
  const displayedTestimonials = showAll ? testimonials : featured;
  const avgRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1);

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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Show More Button */}
        {testimonials.length > 3 && !showAll && (
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
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Partagez votre expérience !
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Vous avez voyagé avec KHAMCI VOYAGES ? Laissez un témoignage pour aider d'autres voyageurs
          </p>
          <Button
            onClick={onAddTestimonial}
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg"
          >
            Laisser un Témoignage
          </Button>
        </div>
      </div>
    </section>
  );
}
