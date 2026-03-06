import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

export default function QuickQuoteModal({
  isOpen,
  onClose,
  source = "general",
}: QuickQuoteModalProps) {
  const [formData, setFormData] = useState({
    destination: "",
    dates: "",
    travelers: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.destination) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Quick quote submitted:", { ...formData, source });

      toast.success(
        "Votre demande a été envoyée ! Nous vous recontacterons sous 24h."
      );

      setFormData({
        destination: "",
        dates: "",
        travelers: "",
        email: "",
      });

      onClose();
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              ⚡ Devis Rapide
            </h3>
            <p className="text-sm text-gray-600">En 30 secondes</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Destination */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Destination *
            </label>
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Choisir une destination</option>
              <option value="fouta-djallon">Fouta Djallon</option>
              <option value="conakry">Conakry</option>
              <option value="kindia">Kindia</option>
              <option value="iles-loos">Îles de Loos</option>
              <option value="combine">Combiné</option>
            </select>
          </div>

          {/* Dates */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Dates
            </label>
            <input
              type="text"
              name="dates"
              placeholder="ex: 15-22 Avril"
              value={formData.dates}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Nombre de voyageurs
            </label>
            <input
              type="number"
              name="travelers"
              placeholder="ex: 2"
              value={formData.travelers}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 rounded-lg transition-all"
          >
            {isSubmitting ? "Envoi..." : "🎯 Envoyer"}
          </Button>
        </form>

        {/* Reassurance */}
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>100% Gratuit et sans engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Réponse garantie sous 24h</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Experts locaux depuis 15+ ans</span>
          </div>
        </div>
      </div>
    </div>
  );
}
