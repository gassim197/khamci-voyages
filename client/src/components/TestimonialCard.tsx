import { Star, CheckCircle } from "lucide-react";
import { Testimonial } from "@/data/testimonials";

// Génère les initiales à partir du nom complet (ex: "Aminata Diallo" → "AD")
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join("");
}

// Génère une couleur de fond déterministe basée sur le nom
const AVATAR_COLORS = [
  "bg-[#FF6B35] text-white",
  "bg-[#0D1B3E] text-white",
  "bg-emerald-600 text-white",
  "bg-purple-600 text-white",
  "bg-rose-600 text-white",
  "bg-amber-600 text-white",
];

function getAvatarColor(name: string): string {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

/**
 * TestimonialCard - Composant pour afficher un témoignage client
 * 
 * Affiche le rating, le commentaire, le nom et la localisation du client
 */

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      {/* Header with Rating */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        {testimonial.verified && (
          <CheckCircle className="w-5 h-5 text-green-500" />
        )}
      </div>

      {/* Comment */}
      <p className="text-gray-700 mb-6 leading-relaxed italic">
        "{testimonial.comment}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg shrink-0 ${getAvatarColor(testimonial.name)}`}>
          {getInitials(testimonial.name)}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.title}</p>
          <p className="text-xs text-gray-500">{testimonial.location}</p>
        </div>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-400 mt-4">
        {new Date(testimonial.date).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric"
        })}
      </p>
    </div>
  );
}
