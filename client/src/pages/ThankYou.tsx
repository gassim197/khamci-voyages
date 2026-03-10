import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  MessageCircle,
  Plane,
  Star,
  Calendar,
  Users,
  Globe,
} from "lucide-react";

interface QuoteData {
  name: string;
  email: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: string;
  serviceType?: string;
}

const SERVICE_LABELS: Record<string, string> = {
  vol: "✈️ Billet d'avion",
  hotel: "🏨 Réservation d'hôtel",
  voiture: "🚗 Location de voiture",
  voyage: "🌍 Voyage complet",
  teambuilding: "👥 Team Building",
};

export default function ThankYou() {
  const [, setLocation] = useLocation();
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [dots, setDots] = useState("");

  // Animation des points
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedData = sessionStorage.getItem("quoteData");
    if (storedData) {
      setQuoteData(JSON.parse(storedData));
      const number = `KV-${Date.now().toString().slice(-6)}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;
      setTrackingNumber(number);
      sessionStorage.removeItem("quoteData");
    } else {
      // Pas de données → redirection après 5s
      const timer = setTimeout(() => setLocation("/"), 5000);
      return () => clearTimeout(timer);
    }
  }, [setLocation]);

  const whatsappNumber = "224611145892";
  const whatsappMessage = encodeURIComponent(
    quoteData
      ? `Bonjour KHAMCI VOYAGES ! Je suis ${quoteData.name} et je viens de soumettre une demande de devis (réf. ${trackingNumber}). Je souhaite avoir plus d'informations.`
      : "Bonjour KHAMCI VOYAGES ! Je viens de soumettre une demande de devis et je souhaite avoir plus d'informations."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const steps = [
    {
      number: "1",
      title: "Demande reçue ✓",
      description: "Votre demande est enregistrée dans notre système.",
      duration: "Immédiat",
      status: "done",
    },
    {
      number: "2",
      title: `Analyse en cours${dots}`,
      description: "Notre équipe examine votre demande et prépare votre devis personnalisé.",
      duration: "1 à 2 heures",
      status: "active",
    },
    {
      number: "3",
      title: "Appel de confirmation",
      description: "Un expert vous contacte pour affiner les détails de votre voyage.",
      duration: "15 à 30 minutes",
      status: "pending",
    },
    {
      number: "4",
      title: "Réception du devis",
      description: "Devis détaillé envoyé par email avec tarifs et options.",
      duration: "Sous 24h garanties",
      status: "pending",
    },
  ];

  if (!quoteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D1B3E] to-[#1a3a6e] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Redirection en cours{dots}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B3E] via-[#1a3a6e] to-[#0D1B3E]">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/10">
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <div className="text-white font-bold text-lg leading-none">KHAMCI VOYAGES</div>
            <div className="text-white/60 text-xs">Agence de Voyages</div>
          </div>
        </button>
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </button>
      </header>

      <main className="container py-10 max-w-4xl mx-auto px-4">

        {/* Icône succès + titre */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-28 h-28 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-20 h-20 bg-green-500/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-400" strokeWidth={1.5} />
                </div>
              </div>
              <Star className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: "0.1s" }} />
              <Star className="absolute -bottom-1 -left-3 w-4 h-4 text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: "0.3s" }} />
              <Star className="absolute top-2 -left-4 w-3 h-3 text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Merci, {quoteData.name} ! 🎉
          </h1>
          <p className="text-white/70 text-lg max-w-lg mx-auto">
            Votre demande de devis a bien été reçue. Notre équipe vous contactera très bientôt.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Colonne gauche — Détails + Délai */}
          <div className="lg:col-span-2 space-y-6">

            {/* Délai garanti */}
            <div className="bg-[#FF6B35]/20 border border-[#FF6B35]/40 rounded-2xl p-6 flex items-center gap-5">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-2xl">Réponse garantie sous 24h</div>
                <div className="text-white/70 text-sm mt-1">
                  Un expert KHAMCI VOYAGES vous contactera par email et téléphone dans les prochaines 24 heures ouvrées.
                </div>
              </div>
            </div>

            {/* Numéro de suivi */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-white/60 text-sm mb-2">Numéro de suivi de votre demande</p>
              <p className="text-[#FF6B35] font-mono font-bold text-2xl tracking-wider">{trackingNumber}</p>
              <p className="text-white/40 text-xs mt-2">Conservez ce numéro pour toute communication avec notre équipe</p>
            </div>

            {/* Détails du voyage */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#FF6B35]" />
                Récapitulatif de votre demande
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {quoteData.serviceType && (
                  <div className="col-span-2 bg-white/5 rounded-xl p-4">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Service demandé</p>
                    <p className="text-white font-semibold">{SERVICE_LABELS[quoteData.serviceType] || quoteData.serviceType}</p>
                  </div>
                )}
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Destination
                  </p>
                  <p className="text-white font-semibold capitalize">{quoteData.destination?.replace(/-/g, " ") || "—"}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3" /> Passagers
                  </p>
                  <p className="text-white font-semibold">
                    {quoteData.passengers} {parseInt(quoteData.passengers) > 1 ? "passagers" : "passager"}
                  </p>
                </div>
                {quoteData.departureDate && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Départ</p>
                    <p className="text-white font-semibold">
                      {new Date(quoteData.departureDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                )}
                {quoteData.returnDate && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Retour</p>
                    <p className="text-white font-semibold">
                      {new Date(quoteData.returnDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                )}
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </p>
                  <p className="text-white font-semibold text-sm break-all">{quoteData.email}</p>
                </div>
              </div>
            </div>

            {/* Étapes */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-6">Prochaines étapes</h3>
              <div className="space-y-5">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                      step.status === "done" ? "bg-green-500 text-white" :
                      step.status === "active" ? "bg-[#FF6B35] text-white" :
                      "bg-white/10 text-white/40"
                    }`}>
                      {step.status === "done" ? "✓" : step.number}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className={`font-semibold text-sm ${
                        step.status === "done" ? "text-green-400" :
                        step.status === "active" ? "text-[#FF6B35]" :
                        "text-white/50"
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-white/60 text-sm mt-0.5">{step.description}</div>
                      <div className="text-white/30 text-xs mt-1">⏱ {step.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite — Contact */}
          <div className="space-y-6">

            {/* WhatsApp */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Besoin d'une réponse immédiate ?</h3>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-5 py-4 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg w-full mb-3"
              >
                <MessageCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold">Contacter sur WhatsApp</div>
                  <div className="text-xs text-green-100">Réponse en quelques minutes</div>
                </div>
              </a>
              <a
                href="tel:+224611145892"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-5 py-4 rounded-xl font-semibold transition-all border border-white/20 w-full"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold">+224 611 145 892</div>
                  <div className="text-xs text-white/60">Appel direct</div>
                </div>
              </a>
            </div>

            {/* Coordonnées */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Nos coordonnées</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/50 text-xs">Email</p>
                    <a href="mailto:khamcivoyages@gmail.com" className="text-white text-sm hover:text-[#FF6B35] transition-colors break-all">
                      khamcivoyages@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/50 text-xs">Adresse</p>
                    <p className="text-white text-sm">Almamya, commune de Kaloum<br />Conakry, Guinée</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons navigation */}
            <div className="space-y-3">
              <button
                onClick={() => setLocation("/")}
                className="w-full flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#e85a2a] text-white px-6 py-3.5 rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </button>
              <button
                onClick={() => setLocation("/#contact")}
                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl font-semibold transition-all border border-white/20"
              >
                <Plane className="w-4 h-4" />
                Nouveau devis
              </button>
            </div>

            {/* Note */}
            <p className="text-white/30 text-xs text-center leading-relaxed">
              Un email de confirmation a été envoyé à votre adresse. Vérifiez vos spams si vous ne le recevez pas.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
