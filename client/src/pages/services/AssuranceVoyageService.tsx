import { useState } from "react";
import { Shield, CheckCircle, Clock, Heart, Users, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

const COVERAGE_TYPES = [
  "Annulation de voyage",
  "Frais médicaux à l'étranger",
  "Rapatriement d'urgence",
  "Perte de bagages",
  "Responsabilité civile",
  "Couverture complète (tous risques)",
];

export default function AssuranceVoyageService() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: "1",
    coverage: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const submitQuote = trpc.quotes.submit.useMutation({
    onSuccess: () => {
      toast.success("✅ Votre demande a été envoyée ! Nous vous répondons sous 24h.");
      setTimeout(() => setLocation("/thank-you"), 1500);
    },
    onError: () => toast.error("Une erreur est survenue. Veuillez réessayer."),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destination || !formData.departureDate || !formData.name || !formData.phone || !formData.email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    submitQuote.mutate({
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      destination: formData.destination,
      departureDate: formData.departureDate,
      returnDate: formData.returnDate || undefined,
      passengers: parseInt(formData.travelers),
      serviceType: "🛡️ Assurance voyage",
      message: `Couverture souhaitée : ${formData.coverage || "Non précisée"}. ${formData.message}`,
      source: "service-assurance",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0D1B3E] to-[#1a3a6e] text-white py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#FF6B35] p-3 rounded-xl">
              <Shield size={28} className="text-white" />
            </div>
            <span className="text-orange-300 font-semibold uppercase tracking-wide text-sm">Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Assurance Voyage</h1>
          <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
            Voyagez l'esprit tranquille grâce à nos solutions d'assurance voyage adaptées à chaque destination.
            KHAMCI VOYAGES vous protège contre les imprévus à chaque étape de votre voyage.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            {["Frais médicaux couverts", "Annulation remboursée", "Perte de bagages", "Rapatriement d'urgence"].map(tag => (
              <span key={tag} className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium">✓ {tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 bg-gray-50">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-bold text-[#0D1B3E] text-center mb-8">Pourquoi souscrire une assurance voyage ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Heart className="text-red-500" size={28} />, title: "Protection médicale", desc: "En cas d'urgence médicale à l'étranger, vos frais d'hospitalisation et de soins sont pris en charge." },
              { icon: <Clock className="text-[#FF6B35]" size={28} />, title: "Assistance 24h/24", desc: "Une assistance téléphonique disponible à toute heure pour vous aider en cas d'urgence pendant votre voyage." },
              { icon: <CheckCircle className="text-green-500" size={28} />, title: "Couverture complète", desc: "Annulation, retard, perte de bagages, responsabilité civile — nous couvrons tous les risques du voyage." },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#0D1B3E] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="devis" className="py-16 bg-white">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#0D1B3E] mb-2">Demandez votre devis assurance</h2>
            <p className="text-gray-500">Gratuit, sans engagement — réponse sous 24h</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination du voyage *</label>
              <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="Ex: France, Dubai, Canada..." className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5"><Calendar size={14} className="inline mr-1" />Date de départ *</label>
                <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5"><Calendar size={14} className="inline mr-1" />Date de retour</label>
                <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} min={formData.departureDate || new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5"><Users size={14} className="inline mr-1" />Nombre de voyageurs</label>
                <select name="travelers" value={formData.travelers} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} voyageur{n > 1 ? "s" : ""}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type de couverture</label>
                <select name="coverage" value={formData.coverage} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]">
                  <option value="">Choisir...</option>
                  {COVERAGE_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <hr className="border-gray-100" />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nom et prénom *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Votre nom complet" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Téléphone *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+224 6XX XXX XXX" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="votre@email.com" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Précisions supplémentaires</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Âge des voyageurs, activités prévues (sports extrêmes, etc.)..." className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] resize-none" />
            </div>
            <button type="submit" disabled={submitQuote.isPending} className="w-full bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60">
              {submitQuote.isPending ? "Envoi en cours..." : "🛡️ Envoyer ma demande de devis"}
            </button>
            <p className="text-xs text-center text-gray-400">✓ Gratuit & sans engagement • Réponse sous 24h</p>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
