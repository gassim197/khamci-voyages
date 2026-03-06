import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import {
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Calendar,
} from "lucide-react";

/**
 * Thank You Page - KHAMCI VOYAGES
 * 
 * Page de remerciement personnalisée après soumission du formulaire
 * Affiche :
 * - Message de remerciement personnalisé
 * - Numéro de suivi unique
 * - Détails de la demande
 * - Prochaines étapes
 * - CTA pour continuer à explorer
 */

interface QuoteData {
  name: string;
  email: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: string;
}

export default function ThankYou() {
  const [, setLocation] = useLocation();
  const [isMatch] = useRoute("/thank-you");
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [trackingNumber, setTrackingNumber] = useState<string>("");

  useEffect(() => {
    // Get quote data from sessionStorage
    const storedData = sessionStorage.getItem("quoteData");
    if (storedData) {
      setQuoteData(JSON.parse(storedData));
      // Generate tracking number
      const number = `KV-${Date.now().toString().slice(-6)}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;
      setTrackingNumber(number);
      // Clear the stored data
      sessionStorage.removeItem("quoteData");
    } else if (isMatch) {
      // If no data, redirect to home after 5 seconds
      const timer = setTimeout(() => {
        setLocation("/");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isMatch, setLocation]);

  if (!quoteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Redirection en cours...</p>
          <div className="animate-spin">
            <CheckCircle size={48} className="text-orange-500" />
          </div>
        </div>
      </div>
    );
  }

  const handleBackHome = () => {
    setLocation("/");
  };

  const handleExploreMore = () => {
    setLocation("/#blog");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8 md:py-12">
        <div className="container text-center">
          <h1 className="heading-lg mb-2">Merci, {quoteData.name} ! 🎉</h1>
          <p className="text-lg text-white/90">
            Votre demande de devis a été reçue avec succès
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8 animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <CheckCircle
                  size={80}
                  className="text-green-500 relative z-10"
                />
              </div>
            </div>

            <h2 className="heading-md text-center text-gray-900 mb-4">
              Demande Confirmée !
            </h2>

            <p className="text-center text-gray-600 text-lg mb-8 leading-relaxed">
              Nous avons bien reçu votre demande de devis. Un expert KHAMCI VOYAGES
              vous contactera très bientôt pour discuter de votre voyage et vous
              envoyer un devis personnalisé.
            </p>

            {/* Tracking Number */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border-2 border-orange-200 text-center mb-8">
              <p className="text-sm text-gray-600 mb-2">Numéro de Suivi</p>
              <p className="heading-md text-orange-600 font-mono break-all">
                {trackingNumber}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Conservez ce numéro pour suivre votre demande
              </p>
            </div>

            {/* Quote Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-orange-500" />
                  Détails du Voyage
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Destination</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {quoteData.destination.replace("-", " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Départ</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(quoteData.departureDate).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Retour</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(quoteData.returnDate).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Passagers</p>
                    <p className="font-semibold text-gray-900">
                      {quoteData.passengers}{" "}
                      {quoteData.passengers === "1" ? "passager" : "passagers"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail size={20} className="text-orange-500" />
                  Informations de Contact
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Nom</p>
                    <p className="font-semibold text-gray-900">{quoteData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900 break-all">
                      {quoteData.email}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      ✓ Un email de confirmation a été envoyé à votre adresse
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
            <h3 className="heading-md text-gray-900 mb-8 flex items-center gap-3">
              <Clock size={28} className="text-orange-500" />
              Prochaines Étapes
            </h3>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 text-white font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Vérification de Votre Demande
                  </h4>
                  <p className="text-gray-600">
                    Notre équipe examine votre demande et prépare les informations
                    nécessaires pour créer votre devis personnalisé.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    ⏱️ Durée estimée : 1-2 heures
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 text-white font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Appel de Confirmation
                  </h4>
                  <p className="text-gray-600">
                    Un expert vous appellera pour discuter de vos préférences,
                    répondre à vos questions et affiner les détails de votre voyage.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    ⏱️ Durée estimée : 15-30 minutes
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 text-white font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Réception du Devis
                  </h4>
                  <p className="text-gray-600">
                    Vous recevrez un devis détaillé par email avec tous les tarifs,
                    les options et les conditions. Vous pouvez demander des révisions
                    sans limite.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    ⏱️ Délai : Sous 24h maximum
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 text-white font-bold text-lg">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Réservation et Préparation
                  </h4>
                  <p className="text-gray-600">
                    Une fois confirmé, nous gérons tous les détails : vols, hôtels,
                    visas, transport. Vous n'avez qu'à vous préparer à partir !
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    ✓ Suivi complet jusqu'à votre départ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200 p-8 md:p-12 mb-8">
            <h3 className="heading-md text-gray-900 mb-6">
              Besoin de Nous Contacter ?
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <Phone size={24} className="text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                  <a
                    href="tel:+224611145892"
                    className="font-bold text-gray-900 hover:text-orange-600 transition-colors"
                  >
                    +224 611 145 892
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail size={24} className="text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <a
                    href="mailto:khamcivoyages@gmail.com"
                    className="font-bold text-gray-900 hover:text-orange-600 transition-colors"
                  >
                    khamcivoyages@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin size={24} className="text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Adresse</p>
                  <p className="font-bold text-gray-900">
                    Almamya, Kaloum
                    <br />
                    Conakry, Guinée
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={handleBackHome}
              className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-6 rounded-lg border-2 border-gray-300 hover:border-orange-500 transition-all flex items-center justify-center gap-2"
            >
              ← Retour à l'Accueil
            </button>

            <button
              onClick={handleExploreMore}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Découvrir Notre Blog
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Final Message */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Merci de votre confiance en KHAMCI VOYAGES !
            </p>
            <p className="text-sm text-gray-500">
              Nous sommes impatients de créer votre prochaine aventure africaine.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-10 -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-200 to-red-200 rounded-full blur-3xl opacity-10 -z-10"></div>
    </div>
  );
}
