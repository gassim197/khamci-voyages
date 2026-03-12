import { useState } from "react";
import { Plane, CheckCircle, Clock, Shield, ArrowRight, ArrowLeft, Users, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CityCombobox from "@/components/CityCombobox";
import { majorCities } from "@/data/serviceTypes";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

const AIRLINES = [
  "Pas de préférence",
  "Air Sénégal", "Royal Air Maroc", "Air France", "Brussels Airlines",
  "Ethiopian Airlines", "Turkish Airlines", "Emirates", "Qatar Airways",
  "Air Algérie", "Tunisair", "Kenya Airways", "Autre",
];

interface FormData {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate: string;
  tripType: "aller-simple" | "aller-retour";
  passengers: string;
  airline: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function BilletterieService() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<FormData>({
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
    returnDate: "",
    tripType: "aller-retour",
    passengers: "1",
    airline: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const submitQuote = trpc.quotes.submit.useMutation({
    onSuccess: () => {
      sessionStorage.setItem("quoteData", JSON.stringify(formData));
      toast.success("✅ Votre demande a été envoyée ! Nous vous répondons sous 24h.");
      setTimeout(() => setLocation("/thank-you"), 1500);
    },
    onError: () => toast.error("Une erreur est survenue. Veuillez réessayer."),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (!formData.departureCity || !formData.arrivalCity || !formData.departureDate || !formData.passengers) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Veuillez remplir tous les champs de contact");
      return;
    }
    submitQuote.mutate({
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      destination: `${formData.departureCity} → ${formData.arrivalCity}`,
      departureDate: formData.departureDate,
      returnDate: formData.returnDate || undefined,
      passengers: parseInt(formData.passengers),
      serviceType: "✈️ Billetterie aérienne",
      message: `Compagnie souhaitée : ${formData.airline || "Pas de préférence"}. ${formData.message}`,
      source: "service-billetterie",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0D1B3E] to-[#1a3a6e] text-white py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#FF6B35] p-3 rounded-xl">
              <Plane size={28} className="text-white" />
            </div>
            <span className="text-orange-300 font-semibold uppercase tracking-wide text-sm">Service</span>
          </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
            Billetterie Aérienne
          </h1>
            <p className="text-base md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            Réservez vos billets d'avion vers n'importe quelle destination dans le monde,
            aux meilleurs tarifs. KHAMCI VOYAGES négocie pour vous avec les meilleures compagnies aériennes.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            {["Tarifs compétitifs", "Réponse sous 24h", "Toutes destinations", "Facilités de paiement"].map(tag => (
              <span key={tag} className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium">
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-bold text-[#0D1B3E] text-center mb-8">Pourquoi choisir KHAMCI VOYAGES pour votre billet ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: <CheckCircle className="text-green-500" size={28} />, title: "Meilleurs tarifs garantis", desc: "Grâce à nos partenariats avec les compagnies aériennes, nous vous proposons des prix défiant toute concurrence." },
              { icon: <Clock className="text-[#FF6B35]" size={28} />, title: "Réponse en moins de 24h", desc: "Votre demande est traitée rapidement par nos experts. Vous recevez votre devis personnalisé sous 24h." },
              { icon: <Shield className="text-[#0D1B3E]" size={28} />, title: "Accompagnement complet", desc: "De la réservation jusqu'à l'embarquement, notre équipe vous accompagne à chaque étape de votre voyage." },
            ].map(item => (
              <div key={item.title} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#0D1B3E] mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="devis" className="py-16 bg-white dark:bg-gray-900">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#0D1B3E] mb-2">Demandez votre devis</h2>
            <p className="text-gray-500 dark:text-gray-400">Gratuit, sans engagement — réponse sous 24h</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`flex items-center justify-center w-9 h-9 rounded-full font-bold text-sm ${step >= 1 ? "bg-[#FF6B35] text-white" : "bg-gray-200 text-gray-500 dark:text-gray-400"}`}>
              {step > 1 ? <CheckCircle size={18} /> : "1"}
            </div>
            <div className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-[#FF6B35] transition-all duration-500" style={{ width: step === 1 ? "0%" : "100%" }} />
            </div>
            <div className={`flex items-center justify-center w-9 h-9 rounded-full font-bold text-sm ${step >= 2 ? "bg-[#FF6B35] text-white" : "bg-gray-200 text-gray-500 dark:text-gray-400"}`}>2</div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-4 md:p-8 space-y-6">
            {step === 1 && (
              <>
                <h3 className="text-xl font-bold text-[#0D1B3E] flex items-center gap-2">
                  <Plane size={20} className="text-[#FF6B35]" /> Votre vol
                </h3>

                {/* Type de voyage */}
                <div className="flex gap-3">
                  {(["aller-retour", "aller-simple"] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tripType: type }))}
                      className={`flex-1 py-2.5 rounded-lg border-2 font-semibold text-sm transition-all ${
                        formData.tripType === type
                          ? "border-[#FF6B35] bg-orange-50 text-[#FF6B35]"
                          : "border-gray-200 text-gray-600 dark:text-gray-400 hover:border-gray-300"
                      }`}
                    >
                      {type === "aller-retour" ? "↔ Aller-Retour" : "→ Aller Simple"}
                    </button>
                  ))}
                </div>

                {/* Villes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Ville de départ *</label>
                    <CityCombobox
                      value={formData.departureCity}
                      onChange={val => setFormData(prev => ({ ...prev, departureCity: val }))}
                      placeholder="Ex: Conakry, Paris..."
                      cities={majorCities}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Ville d'arrivée *</label>
                    <CityCombobox
                      value={formData.arrivalCity}
                      onChange={val => setFormData(prev => ({ ...prev, arrivalCity: val }))}
                      placeholder="Ex: Paris, Dubai..."
                      cities={majorCities}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      <Calendar size={14} className="inline mr-1" />Date de départ *
                    </label>
                    <input
                      type="date"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]"
                    />
                  </div>
                  {formData.tripType === "aller-retour" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        <Calendar size={14} className="inline mr-1" />Date de retour
                      </label>
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        min={formData.departureDate || new Date().toISOString().split("T")[0]}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]"
                      />
                    </div>
                  )}
                </div>

                {/* Passagers & Compagnie */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      <Users size={14} className="inline mr-1" />Nombre de passagers *
                    </label>
                    <select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n}>{n} passager{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Compagnie souhaitée</label>
                    <select
                      name="airline"
                      value={formData.airline}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]"
                    >
                      {AIRLINES.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => validateStep1() && setStep(2)}
                  className="w-full bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Continuer <ArrowRight size={18} />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-xl font-bold text-[#0D1B3E] flex items-center gap-2">
                  <Users size={20} className="text-[#FF6B35]" /> Vos coordonnées
                </h3>

                {/* Récap */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm">
                  <p className="font-semibold text-[#0D1B3E] mb-2">📋 Récapitulatif :</p>
                  <div className="grid grid-cols-2 gap-1 text-gray-700 dark:text-gray-300">
                    <span>Trajet : <strong>{formData.departureCity} → {formData.arrivalCity}</strong></span>
                    <span>Départ : <strong>{formData.departureDate || "—"}</strong></span>
                    {formData.returnDate && <span>Retour : <strong>{formData.returnDate}</strong></span>}
                    <span>Passagers : <strong>{formData.passengers}</strong></span>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="mt-2 text-xs text-[#FF6B35] hover:underline flex items-center gap-1">
                    <ArrowLeft size={12} /> Modifier
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nom et prénom *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Téléphone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+224 6XX XXX XXX"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Précisions supplémentaires</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Classe souhaitée, bagages, besoins spéciaux..."
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 hover:bg-gray-50 dark:bg-gray-950 transition-colors">
                    <ArrowLeft size={16} /> Retour
                  </button>
                  <button
                    type="submit"
                    disabled={submitQuote.isPending}
                    className="flex-1 bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {submitQuote.isPending ? "Envoi en cours..." : "🎯 Envoyer ma demande de devis"}
                  </button>
                </div>
                <p className="text-xs text-center text-gray-400">✓ Gratuit & sans engagement • Réponse sous 24h • -5% offert sur votre billet</p>
              </>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
