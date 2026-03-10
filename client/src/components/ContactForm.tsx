import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, ArrowRight, ArrowLeft, Plane, Users, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { countries } from "@/data/countries";
import { trpc } from "@/lib/trpc";
import CityCombobox from "@/components/CityCombobox";

/**
 * Contact Form / Devis Form - KHAMCI VOYAGES
 *
 * Formulaire en 2 étapes pour réduire la friction :
 * - Étape 1 : Le voyage (service, destination, dates, passagers)
 * - Étape 2 : Vos coordonnées (nom, email, téléphone, message)
 * - Barre de progression visuelle entre les 2 étapes
 * - Validation par étape avec feedback immédiat
 */

interface FormData {
  // Étape 1 — Le voyage
  serviceType: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: string;
  airline: string;
  // Étape 2 — Coordonnées
  name: string;
  email: string;
  phone: string;
  message: string;
}

const SERVICE_TYPES = [
  { value: "vol", label: "✈️ Billet d'avion", icon: "✈️" },
  { value: "hotel", label: "🏨 Hôtel", icon: "🏨" },
  { value: "voiture", label: "🚗 Location de voiture", icon: "🚗" },
  { value: "package", label: "🌍 Voyage complet", icon: "🌍" },
  { value: "team-building", label: "👥 Team Building", icon: "👥" },
];

const AIRLINES = [
  { value: "", label: "Pas de préférence" },
  { value: "air-senegal", label: "Air Sénégal" },
  { value: "royal-air-maroc", label: "Royal Air Maroc" },
  { value: "air-france", label: "Air France" },
  { value: "brussels-airlines", label: "Brussels Airlines" },
  { value: "ethiopian", label: "Ethiopian Airlines" },
  { value: "autre", label: "Autre" },
];

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceType: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: "1",
    airline: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [, setLocation] = useLocation();

  const submitQuote = trpc.quotes.submit.useMutation({
    onSuccess: () => {
      sessionStorage.setItem("quoteData", JSON.stringify(formData));
      toast.success("✅ Votre demande de devis a été envoyée ! Nous vous répondons sous 24h.");
      setTimeout(() => setLocation("/thank-you"), 1500);
    },
    onError: () => {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.serviceType) newErrors.serviceType = "Choisissez un service";
    if (!formData.destination) newErrors.destination = "La destination est requise";
    if (!formData.departureDate) newErrors.departureDate = "La date de départ est requise";
    if (!formData.returnDate) newErrors.returnDate = "La date de retour est requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: document.getElementById("contact")?.offsetTop ?? 0, behavior: "smooth" });
    } else {
      toast.error("Veuillez remplir tous les champs obligatoires");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Support saisie libre : si c'est un code pays, on résout le nom, sinon on garde la valeur saisie
    const selectedCountry = countries.find((c) => c.code === formData.destination || c.name.toLowerCase() === formData.destination.toLowerCase());
    const destinationLabel = selectedCountry?.name ?? formData.destination;
    const serviceLabel = SERVICE_TYPES.find((s) => s.value === formData.serviceType)?.label ?? formData.serviceType;

    submitQuote.mutate({
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      destination: destinationLabel,
      departureDate: formData.departureDate,
      returnDate: formData.returnDate,
      passengers: parseInt(formData.passengers),
      serviceType: serviceLabel,
      message: formData.message,
      source: "contact-form",
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
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
              <div>
                <h3 className="heading-md text-gray-900 mb-6">Nous Contacter</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#e85a2a]">
                        <Phone size={24} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Téléphone</h3>
                      <a href="tel:+224611145892" className="text-gray-600 hover:text-[#FF6B35] transition-colors">
                        +224 611 145 892
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#e85a2a]">
                        <Mail size={24} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <a href="mailto:khamcivoyages@gmail.com" className="text-gray-600 hover:text-[#FF6B35] transition-colors">
                        khamcivoyages@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#e85a2a]">
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

              {/* Reassurance */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle size={20} />
                  Pourquoi Nous Choisir ?
                </h4>
                <ul className="space-y-3 text-sm text-green-800">
                  {[
                    "Réponse garantie sous 24h",
                    "100% gratuit et sans engagement",
                    "Experts locaux depuis 15+ ans",
                    "Révisions illimitées jusqu'à satisfaction",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="md:col-span-2">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full font-bold text-sm transition-all ${
                    step >= 1 ? "bg-[#FF6B35] text-white shadow-md" : "bg-gray-200 text-gray-500"
                  }`}>
                    {step > 1 ? <CheckCircle size={18} /> : "1"}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${step >= 1 ? "text-[#0D1B3E]" : "text-gray-400"}`}>
                      Votre voyage
                    </p>
                    <p className="text-xs text-gray-500">Service, destination & dates</p>
                  </div>
                </div>

                <div className="flex-1 mx-4 h-1 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF6B35] to-[#0D1B3E] transition-all duration-500"
                    style={{ width: step === 1 ? "0%" : "100%" }}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full font-bold text-sm transition-all ${
                    step >= 2 ? "bg-[#FF6B35] text-white shadow-md" : "bg-gray-200 text-gray-500"
                  }`}>
                    2
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${step >= 2 ? "text-[#0D1B3E]" : "text-gray-400"}`}>
                      Vos coordonnées
                    </p>
                    <p className="text-xs text-gray-500">Nom, email & téléphone</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">

              {/* ===== ÉTAPE 1 ===== */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#0D1B3E] mb-1 flex items-center gap-2">
                      <Plane size={20} className="text-[#FF6B35]" />
                      Parlez-nous de votre voyage
                    </h3>
                    <p className="text-sm text-gray-500">Étape 1 sur 2 — Quelques infos sur votre projet</p>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Type de service souhaité *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {SERVICE_TYPES.map((service) => (
                        <button
                          key={service.value}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, serviceType: service.value }));
                            if (errors.serviceType) setErrors((prev) => ({ ...prev, serviceType: undefined }));
                          }}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            formData.serviceType === service.value
                              ? "border-[#FF6B35] bg-orange-50 text-[#FF6B35]"
                              : "border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50"
                          }`}
                        >
                          <span className="text-2xl">{service.icon}</span>
                          <span className="text-center leading-tight">{service.label.replace(/^[^ ]+ /, "")}</span>
                        </button>
                      ))}
                    </div>
                    {errors.serviceType && (
                      <p className="text-red-500 text-xs mt-2">{errors.serviceType}</p>
                    )}
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Destination souhaitée *
                    </label>
                    <CityCombobox
                      value={formData.destination}
                      onChange={(val) => {
                        setFormData((prev) => ({ ...prev, destination: val }));
                        if (errors.destination) setErrors((prev) => ({ ...prev, destination: undefined }));
                      }}
                      placeholder="Ex: Paris, Dubaï, New York, Conakry..."
                      cities={countries.map((c) => c.name)}
                      error={errors.destination}
                    />
                    {errors.destination && (
                      <p className="text-red-500 text-xs mt-1">{errors.destination}</p>
                    )}
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        <Calendar size={14} className="inline mr-1" />
                        Date de départ *
                      </label>
                      <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all ${
                          errors.departureDate ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.departureDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.departureDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        <Calendar size={14} className="inline mr-1" />
                        Date de retour *
                      </label>
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        min={formData.departureDate || new Date().toISOString().split("T")[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all ${
                          errors.returnDate ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.returnDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>
                      )}
                    </div>
                  </div>

                  {/* Passengers & Airline */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        <Users size={14} className="inline mr-1" />
                        Nombre de passagers
                      </label>
                      <select
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "passager" : "passagers"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Compagnie aérienne préférée
                      </label>
                      <select
                        name="airline"
                        value={formData.airline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all"
                      >
                        {AIRLINES.map((airline) => (
                          <option key={airline.value} value={airline.value}>
                            {airline.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] hover:from-[#e85a2a] hover:to-[#d44e22] text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] text-lg shadow-md"
                  >
                    Continuer — Mes coordonnées
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}

              {/* ===== ÉTAPE 2 ===== */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#0D1B3E] mb-1 flex items-center gap-2">
                      <Users size={20} className="text-[#FF6B35]" />
                      Vos coordonnées
                    </h3>
                    <p className="text-sm text-gray-500">Étape 2 sur 2 — Comment vous contacter ?</p>
                  </div>

                  {/* Récap voyage */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm">
                    <p className="font-semibold text-[#0D1B3E] mb-2">📋 Récapitulatif de votre voyage :</p>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                      <span>Service : <strong>{SERVICE_TYPES.find(s => s.value === formData.serviceType)?.label ?? "—"}</strong></span>
                      <span>Destination : <strong>{formData.destination ? (countries.find(c => c.code === formData.destination || c.name.toLowerCase() === formData.destination.toLowerCase())?.name || formData.destination) : "—"}</strong></span>
                      <span>Départ : <strong>{formData.departureDate || "—"}</strong></span>
                      <span>Retour : <strong>{formData.returnDate || "—"}</strong></span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="mt-2 text-xs text-[#FF6B35] hover:underline flex items-center gap-1"
                    >
                      <ArrowLeft size={12} /> Modifier
                    </button>
                  </div>

                  {/* Name & Email */}
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
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+224 XXX XXX XXX"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Message ou demandes spéciales (optionnel)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Allergies alimentaires, demandes spéciales, budget approximatif..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all resize-none"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all"
                    >
                      <ArrowLeft size={18} />
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={submitQuote.isPending}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#0D1B3E] hover:from-[#e85a2a] hover:to-[#162d5c] disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:hover:scale-100 text-lg shadow-md"
                    >
                      {submitQuote.isPending ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          🎯 OBTENIR MON DEVIS GRATUIT
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center text-sm text-gray-500 space-y-1">
                    <p>✓ 100% Gratuit et sans engagement &nbsp;·&nbsp; ✓ Réponse sous 24h &nbsp;·&nbsp; ✓ Données sécurisées</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
