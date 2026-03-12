import { useState } from "react";
import { FileText, CheckCircle, Clock, Shield, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

const VISA_DESTINATIONS = [
  { country: "Dubaï (EAU)", flag: "🇦🇪", delay: "3-5 jours" },
  { country: "Chine", flag: "🇨🇳", delay: "5-7 jours" },
  { country: "Inde", flag: "🇮🇳", delay: "3-5 jours" },
  { country: "Maroc", flag: "🇲🇦", delay: "2-3 jours" },
  { country: "Égypte", flag: "🇪🇬", delay: "3-5 jours" },
  { country: "France (Schengen)", flag: "🇫🇷", delay: "10-15 jours" },
  { country: "Canada", flag: "🇨🇦", delay: "15-30 jours" },
];

const VISA_TYPES = ["Tourisme", "Affaires", "Études", "Transit", "Famille / Regroupement"];

export default function VisaService() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    destination: "",
    visaType: "",
    travelDate: "",
    travelers: "1",
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
    if (!formData.destination || !formData.name || !formData.phone || !formData.email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    submitQuote.mutate({
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      destination: formData.destination,
      departureDate: formData.travelDate || new Date().toISOString().split("T")[0],
      passengers: parseInt(formData.travelers),
      serviceType: "📋 Accompagnement visa",
      message: `Type de visa : ${formData.visaType || "Non précisé"}. ${formData.message}`,
      source: "service-visa",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0D1B3E] to-[#1a3a6e] text-white py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#FF6B35] p-3 rounded-xl">
              <FileText size={28} className="text-white" />
            </div>
            <span className="text-orange-300 font-semibold uppercase tracking-wide text-sm">Service</span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">Accompagnement Visa</h1>
          <p className="text-base md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            Obtenez votre visa rapidement et sans stress. KHAMCI VOYAGES vous accompagne dans toutes les démarches
            administratives pour Dubaï, la Chine, l'Inde, le Maroc, l'Égypte, la France et le Canada.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            {["7 destinations couvertes", "Dossier complet pris en charge", "Suivi en temps réel", "Taux de succès élevé"].map(tag => (
              <span key={tag} className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium">✓ {tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Visa */}
      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-bold text-[#0D1B3E] text-center mb-2">Destinations disponibles</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8">Délais indicatifs à partir de la date de dépôt du dossier complet</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {VISA_DESTINATIONS.map(dest => (
              <button
                key={dest.country}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, destination: dest.country }))}
                className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                  formData.destination === dest.country
                    ? "border-[#FF6B35] bg-orange-50"
                    : "border-gray-200 bg-white dark:bg-gray-900 hover:border-gray-300"
                }`}
              >
                <div className="text-3xl mb-2">{dest.flag}</div>
                <div className="font-semibold text-[#0D1B3E] text-sm">{dest.country}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">⏱ {dest.delay}</div>
              </button>
            ))}
            <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 bg-white dark:bg-gray-900 text-center flex flex-col items-center justify-center">
              <div className="text-2xl mb-1">🌍</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Autre destination ? Contactez-nous</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-bold text-[#0D1B3E] text-center mb-8">Notre accompagnement visa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: <CheckCircle className="text-green-500" size={28} />, title: "Dossier complet", desc: "Nous vous guidons dans la constitution de votre dossier et vérifions chaque document avant le dépôt." },
              { icon: <Clock className="text-[#FF6B35]" size={28} />, title: "Traitement rapide", desc: "Nous optimisons les délais en soumettant votre dossier dans les meilleurs créneaux disponibles." },
              { icon: <Shield className="text-[#0D1B3E]" size={28} />, title: "Suivi personnalisé", desc: "Vous êtes informé à chaque étape de l'avancement de votre demande de visa." },
            ].map(item => (
              <div key={item.title} className="bg-gray-50 dark:bg-gray-950 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#0D1B3E] mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="devis" className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#0D1B3E] mb-2">Demandez votre accompagnement visa</h2>
            <p className="text-gray-500 dark:text-gray-400">Gratuit, sans engagement — réponse sous 24h</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Pays de destination *</label>
              <select name="destination" value={formData.destination} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]">
                <option value="">Sélectionner un pays...</option>
                {VISA_DESTINATIONS.map(d => (
                  <option key={d.country} value={d.country}>{d.flag} {d.country}</option>
                ))}
                <option value="Autre">🌍 Autre destination</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Type de visa</label>
                <select name="visaType" value={formData.visaType} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]">
                  <option value="">Choisir...</option>
                  {VISA_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"><Users size={14} className="inline mr-1" />Nombre de personnes</label>
                <select name="travelers" value={formData.travelers} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]">
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} personne{n > 1 ? "s" : ""}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Date de voyage prévue</label>
              <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
            </div>
            <hr className="border-gray-100 dark:border-gray-700" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nom et prénom *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Votre nom complet" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Téléphone *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+224 6XX XXX XXX" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="votre@email.com" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Précisions supplémentaires</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Situation particulière, refus antérieur, questions spécifiques..." className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] resize-none" />
            </div>
            <button type="submit" disabled={submitQuote.isPending} className="w-full bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60">
              {submitQuote.isPending ? "Envoi en cours..." : "📋 Envoyer ma demande d'accompagnement visa"}
            </button>
            <p className="text-xs text-center text-gray-400">✓ Gratuit & sans engagement • Réponse sous 24h</p>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
