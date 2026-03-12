import { useState } from "react";
import { Star, CheckCircle, Heart, Users, Calendar, MapPin, Shield, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

const PACKAGES = [
  {
    name: "Oumra Économique",
    icon: "🌙",
    duration: "10 jours",
    includes: ["Billet d'avion aller-retour", "Hébergement 3★ à La Mecque", "Hébergement 3★ à Médine", "Transport aéroport-hôtel", "Guide accompagnateur"],
    highlight: false,
  },
  {
    name: "Oumra Confort",
    icon: "⭐",
    duration: "14 jours",
    includes: ["Billet d'avion aller-retour", "Hébergement 4★ proche Haram", "Hébergement 4★ à Médine", "Transport privé", "Guide accompagnateur", "Assurance voyage incluse"],
    highlight: true,
  },
  {
    name: "Hadj",
    icon: "🕌",
    duration: "21-30 jours",
    includes: ["Billet d'avion aller-retour", "Hébergement à La Mecque, Médine, Mina & Arafat", "Transport entre les sites saints", "Guide accompagnateur dédié", "Assurance voyage incluse", "Accompagnement administratif complet"],
    highlight: false,
  },
];

const STEPS = [
  { num: "01", title: "Demande de devis", desc: "Remplissez notre formulaire avec vos dates et préférences. Nous vous répondons sous 24h." },
  { num: "02", title: "Préparation du dossier", desc: "Nous vous guidons dans la constitution de votre dossier (passeport, vaccins, documents requis)." },
  { num: "03", title: "Réservation & paiement", desc: "Confirmation des vols, hôtels et transport. Facilités de paiement disponibles." },
  { num: "04", title: "Départ & accompagnement", desc: "Un guide accompagnateur vous encadre tout au long de votre séjour spirituel." },
];

const TRAVEL_TYPES = ["Oumra", "Hadj"];
const PACKAGE_TYPES = ["Économique", "Confort", "Premium", "À définir selon le devis"];

export default function HadjOumraService() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    travelType: "",
    packageType: "",
    departureDate: "",
    returnDate: "",
    travelers: "1",
    hasPassport: "",
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
    if (!formData.travelType || !formData.departureDate || !formData.name || !formData.phone || !formData.email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    submitQuote.mutate({
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      destination: "La Mecque / Médine (Arabie Saoudite)",
      departureDate: formData.departureDate,
      returnDate: formData.returnDate || undefined,
      passengers: parseInt(formData.travelers),
      serviceType: `🕌 ${formData.travelType}`,
      message: `Formule souhaitée : ${formData.packageType || "À définir"}. Passeport valide : ${formData.hasPassport || "Non précisé"}. ${formData.message}`,
      source: "service-hadj-oumra",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a0a2e] via-[#2d1b5e] to-[#0D1B3E] text-white py-20 md:py-28 overflow-hidden">
        {/* Motif décoratif */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🕌</div>
          <div className="absolute top-20 right-20 text-6xl">☪️</div>
          <div className="absolute bottom-10 left-1/3 text-7xl">⭐</div>
          <div className="absolute bottom-20 right-10 text-5xl">🌙</div>
        </div>
        <div className="container max-w-4xl relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#FF6B35] p-3 rounded-xl">
              <Star size={28} className="text-white" />
            </div>
            <span className="text-orange-300 font-semibold uppercase tracking-wide text-sm">Service spirituel</span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
            Hadj & Oumra<br />
            <span className="text-[#FF6B35]">Votre voyage vers les lieux saints</span>
          </h1>
          <p className="text-base md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            KHAMCI VOYAGES organise votre pèlerinage vers La Mecque et Médine avec soin et dévotion.
            Nous prenons en charge chaque détail pour que vous puissiez vous concentrer pleinement
            sur votre voyage spirituel.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            {["Accompagnement complet", "Guide dédié sur place", "Hébergement proche Haram", "Assurance voyage incluse"].map(tag => (
              <span key={tag} className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium">✓ {tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#0D1B3E] mb-2">Nos formules</h2>
            <p className="text-gray-500 dark:text-gray-400">Des packages adaptés à chaque budget et chaque besoin spirituel</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {PACKAGES.map(pkg => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-6 border-2 transition-all ${
                  pkg.highlight
                    ? "border-[#FF6B35] bg-white dark:bg-gray-900 shadow-xl scale-105"
                    : "border-gray-200 bg-white dark:bg-gray-900 hover:border-gray-300 shadow-sm"
                }`}
              >
                {pkg.highlight && (
                  <div className="bg-[#FF6B35] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    ⭐ Le plus choisi
                  </div>
                )}
                <div className="text-4xl mb-3">{pkg.icon}</div>
                <h3 className="text-xl font-black text-[#0D1B3E] mb-1">{pkg.name}</h3>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm mb-4">
                  <Clock size={14} />
                  <span>Durée : {pkg.duration}</span>
                </div>
                <ul className="space-y-2">
                  {pkg.includes.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    document.getElementById("devis")?.scrollIntoView({ behavior: "smooth" });
                    setFormData(prev => ({
                      ...prev,
                      travelType: pkg.name.includes("Hadj") ? "Hadj" : "Oumra",
                      packageType: pkg.name.includes("Économique") ? "Économique" : pkg.name.includes("Confort") ? "Confort" : "Premium",
                    }));
                  }}
                  className={`mt-5 w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    pkg.highlight
                      ? "bg-[#FF6B35] text-white hover:bg-[#e85a2a]"
                      : "border-2 border-[#0D1B3E] text-[#0D1B3E] hover:bg-gray-50 dark:bg-gray-950"
                  }`}
                >
                  Choisir cette formule
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-black text-[#0D1B3E] text-center mb-10">
            Pourquoi confier votre pèlerinage à KHAMCI VOYAGES ?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <Heart className="text-red-500" size={28} />, title: "Accompagnement spirituel", desc: "Un guide expérimenté vous accompagne à chaque étape de votre pèlerinage." },
              { icon: <Shield className="text-green-500" size={28} />, title: "Sécurité & sérénité", desc: "Assurance voyage incluse, hébergements vérifiés, transport sécurisé." },
              { icon: <MapPin className="text-[#FF6B35]" size={28} />, title: "Hébergement stratégique", desc: "Hôtels sélectionnés à proximité de la Grande Mosquée pour faciliter vos déplacements." },
              { icon: <Users className="text-[#0D1B3E]" size={28} />, title: "Groupes & familles", desc: "Formules adaptées pour les voyages en groupe, en famille ou en couple." },
            ].map(item => (
              <div key={item.title} className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#0D1B3E] mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 bg-gradient-to-br from-[#1a0a2e] to-[#0D1B3E] text-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-black text-center mb-12">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {STEPS.map(step => (
              <div key={step.num} className="flex items-start gap-4 bg-white/10 rounded-xl p-5 border border-white/10">
                <div className="text-3xl font-black text-[#FF6B35] shrink-0 leading-none">{step.num}</div>
                <div>
                  <h3 className="font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire de devis */}
      <section id="devis" className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#0D1B3E] mb-2">Demandez votre devis Hadj & Oumra</h2>
            <p className="text-gray-500 dark:text-gray-400">Gratuit, sans engagement — réponse sous 24h</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-8 space-y-5">

            {/* Type de voyage */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Type de pèlerinage *</label>
              <div className="grid grid-cols-2 gap-3">
                {TRAVEL_TYPES.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, travelType: type }))}
                    className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                      formData.travelType === type
                        ? "border-[#FF6B35] bg-orange-50 text-[#FF6B35]"
                        : "border-gray-200 text-gray-600 dark:text-gray-400 hover:border-gray-300"
                    }`}
                  >
                    {type === "Oumra" ? "🌙 Oumra" : "🕌 Hadj"}
                  </button>
                ))}
              </div>
            </div>

            {/* Formule souhaitée */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Formule souhaitée</label>
              <select name="packageType" value={formData.packageType} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]">
                <option value="">Choisir une formule...</option>
                {PACKAGE_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"><Calendar size={14} className="inline mr-1" />Date de départ souhaitée *</label>
                <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"><Calendar size={14} className="inline mr-1" />Date de retour souhaitée</label>
                <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} min={formData.departureDate || new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
            </div>

            {/* Nombre de pèlerins */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"><Users size={14} className="inline mr-1" />Nombre de pèlerins</label>
                <select name="travelers" value={formData.travelers} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} pèlerin{n > 1 ? "s" : ""}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Passeport valide ?</label>
                <select name="hasPassport" value={formData.hasPassport} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]">
                  <option value="">Sélectionner...</option>
                  <option value="Oui, valide plus de 6 mois">Oui, valide plus de 6 mois</option>
                  <option value="Oui, mais expire bientôt">Oui, mais expire bientôt</option>
                  <option value="Non, à renouveler">Non, à renouveler</option>
                </select>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-gray-700" />

            {/* Informations de contact */}
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
              <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Besoins spéciaux, mobilité réduite, groupe familial, questions particulières..." className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] resize-none" />
            </div>

            <button type="submit" disabled={submitQuote.isPending} className="w-full bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 text-base">
              {submitQuote.isPending ? "Envoi en cours..." : "🕌 Envoyer ma demande de devis"}
            </button>
            <p className="text-xs text-center text-gray-400">✓ Gratuit & sans engagement • Réponse sous 24h • Accompagnement personnalisé</p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
