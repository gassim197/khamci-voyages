import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

/**
 * Contact Form / Devis Form - KHAMCI VOYAGES
 * 
 * Optimisé pour la conversion :
 * - Tous les champs requis pour un devis complet
 * - UX mobile-first et fluide
 * - Validation rapide avec feedback utilisateur
 * - CTA conversion-focused
 * - Éléments de réassurance visibles
 * - Micro-interactions pour engagement
 */

interface FormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  airline: string;
  passengers: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    airline: "",
    passengers: "1",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [, setLocation] = useLocation();

  const destinations = [
    { value: "", label: "Choisir une destination" },
    { value: "fouta-djallon", label: "Fouta Djallon" },
    { value: "conakry", label: "Conakry" },
    { value: "kindia", label: "Kindia" },
    { value: "iles-loos", label: "Îles de Loos" },
    { value: "combine", label: "Combiné (plusieurs destinations)" },
    { value: "autre", label: "Autre" },
  ];

  const airlines = [
    { value: "", label: "Pas de préférence" },
    { value: "air-senegal", label: "Air Sénégal" },
    { value: "royal-air-maroc", label: "Royal Air Maroc" },
    { value: "air-france", label: "Air France" },
    { value: "brussels-airlines", label: "Brussels Airlines" },
    { value: "ethiopian", label: "Ethiopian Airlines" },
    { value: "autre", label: "Autre" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.destination) newErrors.destination = "La destination est requise";
    if (!formData.departureDate) newErrors.departureDate = "La date de départ est requise";
    if (!formData.returnDate) newErrors.returnDate = "La date de retour est requise";
    if (!formData.passengers) newErrors.passengers = "Le nombre de passagers est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Devis form submitted:", formData);

      // Store form data in sessionStorage for thank you page
      sessionStorage.setItem("quoteData", JSON.stringify(formData));

      toast.success(
        "✅ Votre demande de devis a été envoyée ! Redirection en cours..."
      );

      // Redirect to thank you page after a short delay
      setTimeout(() => {
        setLocation("/thank-you");
      }, 1500);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        airline: "",
        passengers: "1",
        message: "",
      });
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg gradient-text mb-4">
            Votre Devis Gratuit en 2 Minutes
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous. Un expert vous contactera rapidement
            pour personnaliser votre voyage et vous envoyer un devis détaillé.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Left Column - Contact Info */}
          <div className="md:col-span-1">
            <div className="space-y-8 sticky top-8">
              {/* Contact Methods */}
              <div>
                <h3 className="heading-md text-gray-900 mb-6">
                  Nous Contacter
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-400">
                        <Phone size={24} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Téléphone</h3>
                      <p className="text-gray-600">
                        <a
                          href="tel:+224611145892"
                          className="hover:text-orange-500 transition-colors"
                        >
                          +224 611 145 892
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-400">
                        <Mail size={24} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">
                        <a
                          href="mailto:khamcivoyages@gmail.com"
                          className="hover:text-orange-500 transition-colors"
                        >
                          khamcivoyages@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-400">
                        <MapPin size={24} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Adresse</h3>
                      <p className="text-gray-600">Almamya, commune de Kaloum</p>
                      <p className="text-gray-600 text-sm">Conakry, Guinée</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reassurance Section */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle size={20} />
                  Pourquoi Nous Choisir ?
                </h4>
                <ul className="space-y-3 text-sm text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Réponse garantie sous 24h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>100% gratuit et sans engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Experts locaux depuis 15+ ans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Révisions illimitées jusqu'à satisfaction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              {/* Row 1: Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean@exemple.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone & Passengers */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+224 XXX XXX XXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nombre de Passagers *
                  </label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                      errors.passengers ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "passager" : "passagers"}
                      </option>
                    ))}
                  </select>
                  {errors.passengers && (
                    <p className="text-red-500 text-xs mt-1">{errors.passengers}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Destination */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Destination Souhaitée *
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                    errors.destination ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {destinations.map((dest) => (
                    <option key={dest.value} value={dest.value}>
                      {dest.label}
                    </option>
                  ))}
                </select>
                {errors.destination && (
                  <p className="text-red-500 text-xs mt-1">{errors.destination}</p>
                )}
              </div>

              {/* Row 4: Dates */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Date de Départ *
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                      errors.departureDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.departureDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.departureDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Date de Retour *
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                      errors.returnDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.returnDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>
                  )}
                </div>
              </div>

              {/* Row 5: Airline */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Compagnie Aérienne Préférée
                </label>
                <select
                  name="airline"
                  value={formData.airline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                >
                  {airlines.map((airline) => (
                    <option key={airline.value} value={airline.value}>
                      {airline.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 6: Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Message Spécial (Allergies, Demandes Spéciales, etc.)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez vos demandes spéciales, allergies alimentaires, ou toute autre information importante..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 text-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Envoi en cours...
                  </span>
                ) : (
                  "🎯 OBTENIR MON DEVIS GRATUIT"
                )}
              </button>

              {/* Bottom Reassurance */}
              <div className="text-center text-sm text-gray-600 space-y-2">
                <p>✓ 100% Gratuit et sans engagement</p>
                <p>✓ Réponse garantie sous 24h</p>
                <p>✓ Révisions illimitées jusqu'à satisfaction</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
