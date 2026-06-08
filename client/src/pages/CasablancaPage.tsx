import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Utensils, Lightbulb, Zap } from "lucide-react";
import { useState } from "react";
import QuickQuoteModal from "@/components/QuickQuoteModal";
import DestinationImageGallery from "@/components/DestinationImageGallery";

export default function CasablancaPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const attractions = [
    {
      title: "Mosquée Hassan II",
      description: "Impressionnante mosquée blanche avec minaret de 210m, surplombant l'océan Atlantique. Visite guidée disponible.",
      price: "À partir de 50€"
    },
    {
      title: "Médina de Casablanca",
      description: "Vieille ville avec souks traditionnels, artisans locaux et architecture authentique marocaine.",
      price: "Gratuit"
    },
    {
      title: "Corniche de Casablanca",
      description: "Promenade côtière moderne avec restaurants, cafés et vue spectaculaire sur l'Atlantique.",
      price: "Gratuit"
    },
    {
      title: "Cathédrale du Sacré-Cœur",
      description: "Édifice architectural emblématique datant de 1930 avec style art déco unique.",
      price: "Gratuit"
    },
    {
      title: "Palais Royal",
      description: "Résidence officielle du roi du Maroc, architecture majestueuse et jardins magnifiques.",
      price: "Visite extérieure gratuite"
    },
    {
      title: "Plage de Casablanca",
      description: "Plages de sable fin, sports nautiques et restaurants de fruits de mer en bord de mer.",
      price: "Gratuit"
    }
  ];

  const restaurants = [
    {
      name: "Le Cabestan",
      cuisine: "Fruits de mer & Marocain",
      rating: "4.8/5",
      description: "Restaurant gastronomique avec vue sur l'océan, spécialités de poisson frais."
    },
    {
      name: "Dar Zaki",
      cuisine: "Marocain traditionnel",
      rating: "4.7/5",
      description: "Riad authentique servant tajines et couscous dans une ambiance traditionnelle."
    },
    {
      name: "Rick's Café",
      cuisine: "International & Marocain",
      rating: "4.6/5",
      description: "Café emblématique inspiré du film Casablanca, terrasse panoramique."
    },
    {
      name: "Sqala",
      cuisine: "Fruits de mer",
      rating: "4.7/5",
      description: "Restaurant dans une forteresse historique, spécialités marines."
    },
    {
      name: "La Trattoria",
      cuisine: "Italienne",
      rating: "4.5/5",
      description: "Authentique restaurant italien avec pâtes fraîches et ambiance chaleureuse."
    },
    {
      name: "Bab Essaouira",
      cuisine: "Fusion Marocain-Français",
      rating: "4.6/5",
      description: "Cuisine raffinée mêlant traditions marocaines et techniques françaises."
    }
  ];

  const tips = [
    {
      icon: "🌡️",
      title: "Climat",
      description: "Climat océanique tempéré. Meilleure période : avril-mai et septembre-octobre (20-25°C)."
    },
    {
      icon: "💰",
      title: "Budget",
      description: "Budget moyen : 40-60€/jour. Repas : 5-15€. Hôtel 3* : 50-80€/nuit."
    },
    {
      icon: "🚕",
      title: "Transport",
      description: "Taxis, bus et location de voiture disponibles. Aéroport à 30km du centre."
    },
    {
      icon: "🗣️",
      title: "Langue",
      description: "Arabe et français parlés. L'anglais moins courant, apprendre quelques mots utiles."
    },
    {
      icon: "🏨",
      title: "Hébergement",
      description: "Riads traditionnels, hôtels modernes et auberges. Réservation recommandée en haute saison."
    },
    {
      icon: "📱",
      title: "Connectivité",
      description: "Bonne couverture 4G/5G. Cartes SIM locales disponibles à l'aéroport."
    }
  ];

  const offers = [
    {
      title: "Vol + Hôtel 3 nuits",
      description: "Départ Conakry, hôtel 3* inclus, petit-déjeuner, visite guidée Médina",
      price: "À partir de 899€",
      included: ["Vol A/R", "Hôtel 3*", "Petit-déjeuner", "Visite guidée", "Transferts"]
    },
    {
      title: "Offre Découverte Casablanca",
      description: "4 jours/3 nuits avec visite Mosquée Hassan II, Médina, Corniche et dîner fruits de mer",
      price: "À partir de 699€",
      included: ["Hôtel", "Visites guidées", "Dîner spécial", "Transport local", "Guide français"]
    },
    {
      title: "Séjour Romantique Océan",
      description: "5 jours/4 nuits en riad luxe, dîners en bord de mer, spa et activités couples",
      price: "À partir de 1299€",
      included: ["Riad 4*", "Dîners romantiques", "Spa", "Activités", "Champagne"]
    }
  ];

  const galleryImages = [
    {
      src: "/images/casablanca-mosquee.jpg",
      alt: "Mosquée Hassan II Casablanca",
      title: "Mosquée Hassan II"
    },
    {
      src: "/images/casablanca-medina.jpg",
      alt: "Médina de Casablanca",
      title: "Médina"
    },
    {
      src: "/images/casablanca-corniche.jpg",
      alt: "Corniche de Casablanca",
      title: "Corniche"
    },
    {
      src: "/images/casablanca-port.jpg",
      alt: "Port de Casablanca",
      title: "Port"
    },
    {
      src: "/images/casablanca-vieille-ville.jpg",
      alt: "Vieille ville de Casablanca",
      title: "Vieille ville (centre-ville historique)"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
        <img src="/covers/casablanca.jpg" alt="Casablanca" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center max-w-2xl px-4">
          <h1 className="text-5xl font-bold mb-4">Casablanca</h1>
          <p className="text-xl mb-8">La Perle Blanche du Maroc - Découvrez l'authenticité marocaine</p>
          <Button
            size="lg"
            onClick={() => setShowQuoteModal(true)}
            className="bg-white text-orange-600 hover:bg-gray-100"
          >
            Demander un Service
          </Button>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Galerie Photos</h2>
          <p className="text-center text-gray-600 mb-12">Découvrez la beauté de Casablanca</p>
          <DestinationImageGallery images={galleryImages} destinationName="Casablanca" />
        </div>
      </section>

      {/* Attractions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Attractions Principales</h2>
          <p className="text-center text-gray-600 mb-12">Les incontournables de Casablanca</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <MapPin className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{attraction.title}</h3>
                <p className="text-gray-600 mb-4">{attraction.description}</p>
                <p className="text-orange-600 font-semibold">{attraction.price}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Restaurants Recommandés</h2>
          <p className="text-center text-gray-600 mb-12">Savourez la gastronomie casablancaise</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <Utensils className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{restaurant.cuisine}</p>
                <p className="text-orange-600 font-semibold mb-2">⭐ {restaurant.rating}</p>
                <p className="text-gray-600">{restaurant.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Conseils Pratiques</h2>
          <p className="text-center text-gray-600 mb-12">Tout ce que vous devez savoir avant de partir</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Offres Spéciales</h2>
          <p className="text-center text-gray-600 mb-12">Packages tout compris pour Casablanca</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer, idx) => (
              <Card key={idx} className="p-6 border-2 border-orange-200 hover:shadow-lg transition-shadow">
                <Zap className="w-8 h-8 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <p className="text-2xl font-bold text-orange-600 mb-4">{offer.price}</p>
                <ul className="space-y-2 mb-6">
                  {offer.included.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center">
                      <span className="text-orange-600 mr-2">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => setShowQuoteModal(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Réserver Maintenant
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Prêt à Découvrir Casablanca ?</h2>
          <p className="text-gray-600 mb-8">Nos experts créent votre voyage sur mesure en 24h</p>
          <Button
            size="lg"
            onClick={() => setShowQuoteModal(true)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Demander un Service
          </Button>
        </div>
      </section>

      {/* Quote Modal */}
      {showQuoteModal && (
        <QuickQuoteModal
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
        />
      )}
    </div>
  );
}
