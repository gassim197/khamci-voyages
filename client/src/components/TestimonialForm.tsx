import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/data/testimonials";
import { Star, X } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

/**
 * TestimonialForm - Formulaire pour laisser un témoignage
 * 
 * Permet aux visiteurs de soumettre leurs avis avec rating, commentaire et infos personnelles
 */

interface TestimonialFormProps {
  onClose: () => void;
  onSubmit: (testimonial: Testimonial) => void;
}

export default function TestimonialForm({ onClose, onSubmit }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    location: "",
    comment: "",
    rating: 5
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value
    }));
  };

  const submitTestimonial = trpc.testimonials.submit.useMutation({
    onSuccess: () => {
      toast.success("Merci pour votre témoignage ! Il sera affiché après modération.");
      // Also call legacy callback for backward compatibility
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        name: formData.name,
        title: formData.title || "Client",
        location: formData.location || "Guinée",
        rating: formData.rating,
        comment: formData.comment,
        image: "👤",
        date: new Date().toISOString().split("T")[0],
        verified: false
      };
      onSubmit(newTestimonial);
      onClose();
    },
    onError: (err) => {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      console.error(err);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.comment.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (formData.comment.length < 20) {
      toast.error("Le commentaire doit contenir au moins 20 caractères");
      return;
    }

    setIsSubmitting(true);
    submitTestimonial.mutate({
      clientName: formData.name,
      clientTitle: formData.title || undefined,
      clientLocation: formData.location || undefined,
      content: formData.comment,
      rating: formData.rating,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Laisser un Témoignage</h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Nom Complet *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Profession / Titre
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Directeur Marketing, Entrepreneur..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Localisation
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ville, Pays"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Votre Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= formData.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Votre Témoignage * (minimum 20 caractères)
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Partagez votre expérience avec KHAMCI VOYAGES..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              {formData.comment.length} / 500 caractères
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg text-white font-semibold"
            >
              {isSubmitting ? "Envoi en cours..." : "Soumettre le Témoignage"}
            </Button>
          </div>

          {/* Info */}
          <p className="text-xs text-gray-500 text-center">
            Votre témoignage sera affiché après modération par notre équipe.
          </p>
        </form>
      </div>
    </div>
  );
}
