import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Utensils, Lightbulb, Zap } from "lucide-react";
import { useState } from "react";
import QuickQuoteModal from "@/components/QuickQuoteModal";
import DestinationImageGallery from "@/components/DestinationImageGallery";

export default function BangkokPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const attractions = [
    {
      title: "Grand Palace",
      description: "Palais royal majestueux avec spires dorées, temples et architecture traditionnelle thaïlandaise spectaculaire.",
      price: "À partir de 15€"
    },
    {
      title: "Marché Flottant",
      description: "Marché traditionnel sur l'eau avec bateaux, fruits exotiques et ambiance authentique thaïlandaise.",
      price: "À partir de 20€"
    },
    {
      title: "Temple Wat Pho",
      description: "Temple bouddhiste ancien avec Bouddha couché de 46m, mosaïques et architecture traditionnelle.",
      price: "À partir de 10€"
    },
    {
      title: "Marché de Nuit Chatuchak",
      description: "Plus grand marché de nuit du monde avec 15000 vendeurs, souvenirs, vêtements et nourriture locale.",
      price: "Gratuit"
    },
    {
      title: "Croisière sur la Rivière Chao Phraya",
      description: "Croisière romantique le long de la rivière avec dîner, temples illuminés et vue sur la ville.",
      price: "À partir de 30€"
    },
    {
      title: "Parc Lumphini",
      description: "Parc urbain avec lacs, jardins, yoga matinal et vie locale authentique en plein cœur de Bangkok.",
      price: "Gratuit"
    }
  ];

  const restaurants = [
    {
      name: "Gaggan",
      cuisine: "Fusion Asiatique",
      rating: "4.9/5",
      description: "Restaurant gastronomique primé avec cuisine progressive et expérience culinaire unique."
    },
    {
      name: "Nahm",
      cuisine: "Thaïlandaise Traditionnelle",
      rating: "4.8/5",
      description: "Cuisine thaïlandaise authentique dans un cadre luxueux, spécialités régionales."
    },
    {
      name: "Vertigo",
      cuisine: "International",
      rating: "4.7/5",
      description: "Restaurant en rooftop avec vue panoramique sur Bangkok, cuisine raffinée."
    },
    {
      name: "Supanniga Eating Room",
      cuisine: "Thaïlandaise Régionale",
      rating: "4.6/5",
      description: "Cuisine thaïlandaise authentique avec plats régionaux rares et saveurs traditionnelles."
    },
    {
      name: "Baan Khanitha",
      cuisine: "Thaïlandaise Locale",
      rating: "4.5/5",
      description: "Restaurant populaire auprès des locaux, cuisine thaïlandaise simple et délicieuse."
    },
    {
      name: "Err",
      cuisine: "Thaïlandaise du Nord-Est",
      rating: "4.6/5",
      description: "Spécialités du Isan avec saveurs épicées, ambiance décontractée et authentique."
    }
  ];

  const tips = [
    {
      icon: "🌡️",
      title: "Climat",
      description: "Tropical chaud et humide. Meilleure période : novembre-février (25-30°C, sec)."
    },
    {
      icon: "💰",
      title: "Budget",
      description: "Budget moyen : 30-50€/jour. Repas : 2-10€. Hôtel 3* : 40-70€/nuit."
    },
    {
      icon: "🚕",
      title: "Transport",
      description: "BTS (métro aérien), MRT (métro), taxis, tuk-tuks. Aéroport à 25km du centre."
    },
    {
      icon: "🗣️",
      title: "Langue",
      description: "Thaï parlé. L'anglais courant dans les zones touristiques, apprendre quelques mots utiles."
    },
    {
      icon: "🏨",
      title: "Hébergement",
      description: "Hôtels variés, auberges, condos. Réservation recommandée en haute saison."
    },
    {
      icon: "📱",
      title: "Connectivité",
      description: "Excellente couverture 4G/5G. Cartes SIM locales à l'aéroport ou en ville."
    }
  ];

  const offers = [
    {
      title: "Vol + Hôtel 4 nuits",
      description: "Départ Conakry, hôtel 3* inclus, petit-déjeuner, visite guidée Grand Palace et marché flottant",
      price: "À partir de 1099€",
      included: ["Vol A/R", "Hôtel 3*", "Petit-déjeuner", "Visites guidées", "Transferts"]
    },
    {
      title: "Offre Découverte Bangkok",
      description: "5 jours/4 nuits avec temples, marchés, croisière et dîner gastronomique",
      price: "À partir de 899€",
      included: ["Hôtel", "Visites guidées", "Croisière", "Dîner spécial", "Guide français"]
    },
    {
      title: "Séjour Luxe Thaïlande",
      description: "6 jours/5 nuits en hôtel 5*, spa, massages thaï, dîners raffinés et activités VIP",
      price: "À partir de 1699€",
      included: ["Hôtel 5*", "Spa & massages", "Dîners gastronomiques", "Activités VIP", "Concierge"]
    }
  ];

  const galleryImages = [
    {
      src: "/images/bangkok-grand-palace.webp",
      alt: "Grand Palace Bangkok",
      title: "Grand Palace"
    },
    {
      src: "/images/bangkok-market.webp",
      alt: "Marché Flottant Bangkok",
      title: "Marché Flottant"
    },
    {
      src: "/images/bangkok-nightmarket.webp",
      alt: "Marché de Nuit Bangkok",
      title: "Marché de Nuit"
    },
    {
      src: "/images/bangkok-temple.webp",
      alt: "Croisière Chao Phraya",
      title: "Croisière"
    },
    {
      src: "/images/bangkok-skyline.webp",
      alt: "Skyline Bangkok la Nuit",
      title: "Skyline"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
        <img src="/covers/hero-bangkok.webp" alt="Bangkok" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center max-w-2xl px-4">
          <h1 className="text-5xl font-bold mb-4">Bangkok</h1>
          <p className="text-xl mb-8">La Cité des Anges - Découvrez la magie de la Thaïlande</p>
          <Button
            size="lg"
            onClick={() => setShowQuoteModal(true)}
            className="bg-white text-yellow-600 hover:bg-gray-100"
          >
            Demander un Service
          </Button>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Galerie Photos</h2>
          <p className="text-center text-gray-600 mb-12">Découvrez la beauté de Bangkok</p>
          <DestinationImageGallery images={galleryImages} destinationName="Bangkok" />
        </div>
      </section>

      {/* Attractions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Attractions Principales</h2>
          <p className="text-center text-gray-600 mb-12">Les incontournables de Bangkok</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <MapPin className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{attraction.title}</h3>
                <p className="text-gray-600 mb-4">{attraction.description}</p>
                <p className="text-yellow-600 font-semibold">{attraction.price}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Restaurants Recommandés</h2>
          <p className="text-center text-gray-600 mb-12">Savourez la gastronomie thaïlandaise</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <Utensils className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{restaurant.cuisine}</p>
                <p className="text-yellow-600 font-semibold mb-2">⭐ {restaurant.rating}</p>
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
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Offres Spéciales</h2>
          <p className="text-center text-gray-600 mb-12">Packages tout compris pour Bangkok</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer, idx) => (
              <Card key={idx} className="p-6 border-2 border-yellow-200 hover:shadow-lg transition-shadow">
                <Zap className="w-8 h-8 text-yellow-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <p className="text-2xl font-bold text-yellow-600 mb-4">{offer.price}</p>
                <ul className="space-y-2 mb-6">
                  {offer.included.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center">
                      <span className="text-yellow-600 mr-2">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => setShowQuoteModal(true)}
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
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
          <h2 className="text-3xl font-bold mb-4">Prêt à Découvrir Bangkok ?</h2>
          <p className="text-gray-600 mb-8">Nos experts créent votre voyage sur mesure en 24h</p>
          <Button
            size="lg"
            onClick={() => setShowQuoteModal(true)}
            className="bg-yellow-600 hover:bg-yellow-700"
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
