import { useState } from "react";
import { Hotel, CheckCircle, Clock, Star, Users, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CityCombobox from "@/components/CityCombobox";
import { majorCities } from "@/data/serviceTypes";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function HotelService() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    rooms: "1",
    adults: "1",
    children: "0",
    stars: "",
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
    if (!formData.destination || !formData.checkIn || !formData.name || !formData.phone || !formData.email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    submitQuote.mutate({
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      destination: formData.destination,
      departureDate: formData.checkIn,
      returnDate: formData.checkOut || undefined,
      passengers: parseInt(formData.adults) + parseInt(formData.children),
      serviceType: "🏨 Réservation d'hôtel",
      message: `Chambres : ${formData.rooms} | Adultes : ${formData.adults} | Enfants : ${formData.children} | Étoiles : ${formData.stars || "Sans préférence"}. ${formData.message}`,
      source: "service-hotel",
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
              <Hotel size={28} className="text-white" />
            </div>
            <span className="text-orange-300 font-semibold uppercase tracking-wide text-sm">Service</span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">Réservation d'Hôtel</h1>
          <p className="text-base md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            Accédez à un large choix d'hébergements en Guinée et dans le monde entier.
            KHAMCI VOYAGES sélectionne pour vous les meilleures options selon votre budget et vos préférences.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            {["Large choix d'hôtels", "Tous budgets", "Guinée & International", "Meilleurs tarifs"].map(tag => (
              <span key={tag} className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium">✓ {tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-bold text-[#0D1B3E] text-center mb-8">Pourquoi réserver votre hôtel avec nous ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: <Star className="text-yellow-500" size={28} />, title: "Sélection rigoureuse", desc: "Nous sélectionnons uniquement des établissements de qualité, adaptés à vos besoins et à votre budget." },
              { icon: <Clock className="text-[#FF6B35]" size={28} />, title: "Confirmation rapide", desc: "Votre réservation est confirmée rapidement. Vous recevez tous les documents nécessaires par email." },
              { icon: <CheckCircle className="text-green-500" size={28} />, title: "Accompagnement personnalisé", desc: "Notre équipe vous conseille sur les meilleures options selon votre destination et vos préférences." },
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

      {/* Form */}
      <section id="devis" className="py-16 bg-white dark:bg-gray-900">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#0D1B3E] mb-2">Demandez votre devis hôtel</h2>
            <p className="text-gray-500 dark:text-gray-400">Gratuit, sans engagement — réponse sous 24h</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Destination *</label>
              <CityCombobox
                value={formData.destination}
                onChange={val => setFormData(prev => ({ ...prev, destination: val }))}
                placeholder="Ex: Paris, Dubai, Conakry..."
                cities={majorCities}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"><Calendar size={14} className="inline mr-1" />Date d'arrivée *</label>
                <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"><Calendar size={14} className="inline mr-1" />Date de départ</label>
                <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} min={formData.checkIn || new Date().toISOString().split("T")[0]} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Chambres</label>
                <select name="rooms" value={formData.rooms} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]">
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"><Users size={14} className="inline mr-1" />Adultes</label>
                <select name="adults" value={formData.adults} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]">
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Enfants</label>
                <select name="children" value={formData.children} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]">
                  {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Catégorie souhaitée</label>
              <select name="stars" value={formData.stars} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]">
                <option value="">Sans préférence</option>
                <option value="3">⭐⭐⭐ 3 étoiles</option>
                <option value="4">⭐⭐⭐⭐ 4 étoiles</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 étoiles</option>
              </select>
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
              <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Préférences particulières, vue souhaitée, occasion spéciale..." className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] resize-none" />
            </div>
            <button type="submit" disabled={submitQuote.isPending} className="w-full bg-gradient-to-r from-[#FF6B35] to-[#e85a2a] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60">
              {submitQuote.isPending ? "Envoi en cours..." : "🏨 Envoyer ma demande de devis"}
            </button>
            <p className="text-xs text-center text-gray-400">✓ Gratuit & sans engagement • Réponse sous 24h</p>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
