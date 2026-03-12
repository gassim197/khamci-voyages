import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Utensils, Lightbulb, Zap } from "lucide-react";
import { useState } from "react";
import QuickQuoteModal from "@/components/QuickQuoteModal";
import DestinationImageGallery from "@/components/DestinationImageGallery";

export default function BarcelonaPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const attractions = [
    {
      title: "Sagrada Familia",
      description: "Basilique architecturale de Gaudí avec spires dorées, intérieur spectaculaire et mosaïques colorées.",
      price: "À partir de 25€"
    },
    {
      title: "Park Güell",
      description: "Parc avec mosaïques colorées, terrasses, vues panoramiques sur la ville et architecture unique.",
      price: "À partir de 15€"
    },
    {
      title: "Quartier Gothique",
      description: "Vieille ville médiévale avec ruelles étroites, cathédrale gothique et architecture historique.",
      price: "Gratuit"
    },
    {
      title: "Casa Batlló",
      description: "Maison moderniste de Gaudí avec façade ondulante, intérieur coloré et design révolutionnaire.",
      price: "À partir de 25€"
    },
    {
      title: "Plage de Barcelone",
      description: "Plages urbaines avec sable fin, bars de plage, sports nautiques et ambiance méditerranéenne.",
      price: "Gratuit"
    },
    {
      title: "La Rambla",
      description: "Avenue célèbre avec artistes de rue, boutiques, restaurants et atmosphère vibrant.",
      price: "Gratuit"
    }
  ];

  const restaurants = [
    {
      name: "Tickets Bar",
      cuisine: "Tapas Modernes",
      rating: "4.8/5",
      description: "Bar à tapas créatif avec cuisine avant-gardiste et ambiance branchée."
    },
    {
      name: "Cinc Sentits",
      cuisine: "Catalane Raffinée",
      rating: "4.7/5",
      description: "Cuisine catalane contemporaine avec ingrédients locaux et présentation artistique."
    },
    {
      name: "Cervecería Catalana",
      cuisine: "Tapas Traditionnelles",
      rating: "4.6/5",
      description: "Célèbre bar à tapas avec spécialités catalanes et ambiance animée."
    },
    {
      name: "Botafumeiro",
      cuisine: "Fruits de Mer",
      rating: "4.7/5",
      description: "Restaurant gastronomique spécialisé en fruits de mer frais et cuisine galicienne."
    },
    {
      name: "El Xampanyet",
      cuisine: "Tapas Locales",
      rating: "4.5/5",
      description: "Bar traditionnel dans le quartier gothique, tapas authentiques et vin local."
    },
    {
      name: "Gresca",
      cuisine: "Fusion Méditerranéenne",
      rating: "4.6/5",
      description: "Cuisine créative avec influences méditerranéennes et présentation moderne."
    }
  ];

  const tips = [
    {
      icon: "🌡️",
      title: "Climat",
      description: "Méditerranéen tempéré. Meilleure période : avril-mai et septembre-octobre (18-25°C)."
    },
    {
      icon: "💰",
      title: "Budget",
      description: "Budget moyen : 50-80€/jour. Repas : 10-20€. Hôtel 3* : 70-100€/nuit."
    },
    {
      icon: "🚕",
      title: "Transport",
      description: "Métro, bus, taxis. Aéroport à 12km du centre. Cartes de transport disponibles."
    },
    {
      icon: "🗣️",
      title: "Langue",
      description: "Catalan et espagnol parlés. L'anglais courant dans les zones touristiques."
    },
    {
      icon: "🏨",
      title: "Hébergement",
      description: "Hôtels variés, appartements, auberges. Réservation recommandée toute l'année."
    },
    {
      icon: "📱",
      title: "Connectivité",
      description: "Excellente couverture 4G/5G. WiFi gratuit dans la plupart des lieux publics."
    }
  ];

  const offers = [
    {
      title: "Vol + Hôtel 4 nuits",
      description: "Départ Conakry, hôtel 3* inclus, petit-déjeuner, visite guidée Sagrada Familia et Park Güell",
      price: "À partir de 999€",
      included: ["Vol A/R", "Hôtel 3*", "Petit-déjeuner", "Visites guidées", "Transferts"]
    },
    {
      title: "Offre Découverte Barcelone",
      description: "5 jours/4 nuits avec monuments, quartier gothique, plage et dîner gastronomique",
      price: "À partir de 799€",
      included: ["Hôtel", "Visites guidées", "Dîner spécial", "Transport local", "Guide français"]
    },
    {
      title: "Séjour Culturel Gaudí",
      description: "6 jours/5 nuits en hôtel 4*, visites privées, musées, ateliers d'art et gastronomie",
      price: "À partir de 1499€",
      included: ["Hôtel 4*", "Visites privées", "Musées", "Ateliers", "Dîners gastronomiques"]
    }
  ];

  const galleryImages = [
    {
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/barcelona-sagrada-JokxWaVQ2ByDkgbcMFRZre.webp",
      alt: "Sagrada Familia Barcelone",
      title: "Sagrada Familia"
    },
    {
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/barcelona-park-guell-eoSDWbxVc68iaNY5zrhadD.webp",
      alt: "Park Güell Barcelone",
      title: "Park Güell"
    },
    {
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/barcelona-gothic-nxTGpV6UgRLvLURqaCvKjV.webp",
      alt: "Quartier Gothique Barcelone",
      title: "Quartier Gothique"
    },
    {
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/barcelona-beach-HRxxwK8JQrvi6pWsZXxkf6.webp",
      alt: "Plage Barcelone",
      title: "Plage"
    },
    {
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/barcelona-ramblas-E96uTb8WHUNhqdArBWyFcW.webp",
      alt: "La Rambla Barcelone",
      title: "La Rambla"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
        <img src="/covers/barcelona.jpg" alt="Barcelone" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center max-w-2xl px-4">
          <h1 className="text-5xl font-bold mb-4">Barcelone</h1>
          <p className="text-xl mb-8">La Ville de Gaudí - Découvrez l'architecture et la culture catalane</p>
          <Button
            size="lg"
            onClick={() => setShowQuoteModal(true)}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Demander un Service
          </Button>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Galerie Photos</h2>
          <p className="text-center text-gray-600 mb-12">Découvrez la beauté de Barcelone</p>
          <DestinationImageGallery images={galleryImages} destinationName="Barcelone" />
        </div>
      </section>

      {/* Attractions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Attractions Principales</h2>
          <p className="text-center text-gray-600 mb-12">Les incontournables de Barcelone</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <MapPin className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{attraction.title}</h3>
                <p className="text-gray-600 mb-4">{attraction.description}</p>
                <p className="text-blue-600 font-semibold">{attraction.price}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Restaurants Recommandés</h2>
          <p className="text-center text-gray-600 mb-12">Savourez la gastronomie catalane</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <Utensils className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{restaurant.cuisine}</p>
                <p className="text-blue-600 font-semibold mb-2">⭐ {restaurant.rating}</p>
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
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Offres Spéciales</h2>
          <p className="text-center text-gray-600 mb-12">Packages tout compris pour Barcelone</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer, idx) => (
              <Card key={idx} className="p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
                <Zap className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <p className="text-2xl font-bold text-blue-600 mb-4">{offer.price}</p>
                <ul className="space-y-2 mb-6">
                  {offer.included.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center">
                      <span className="text-blue-600 mr-2">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => setShowQuoteModal(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
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
          <h2 className="text-3xl font-bold mb-4">Prêt à Découvrir Barcelone ?</h2>
          <p className="text-gray-600 mb-8">Nos experts créent votre voyage sur mesure en 24h</p>
          <Button
            size="lg"
            onClick={() => setShowQuoteModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
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
