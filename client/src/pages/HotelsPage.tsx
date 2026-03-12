import { useState } from 'react';
import { Hotel, MapPin, Star, Users, Wifi, Utensils } from 'lucide-react';
import HeaderNav from '@/components/HeaderNav';
import { Button } from '@/components/ui/button';
import HotelQuoteForm from '@/components/HotelQuoteForm';

/**
 * Hotels Destination Page - KHAMCI VOYAGES
 * Page dédiée aux hôtels avec contenu SEO optimisé
 */

export default function HotelsPage() {
  const [showForm, setShowForm] = useState(false);

  const amenities = [
    { icon: Wifi, title: 'WiFi Gratuit', description: 'Connexion internet haut débit' },
    { icon: Utensils, title: 'Restaurant', description: 'Cuisine locale et internationale' },
    { icon: Users, title: 'Réception 24/7', description: 'Service client toujours disponible' },
    { icon: Star, title: '3 à 5 Étoiles', description: 'Sélection d\'hôtels de qualité' },
  ];

  const destinations = [
    { name: 'Conakry', hotels: '25+', avgPrice: '$80-150' },
    { name: 'Paris', hotels: '150+', avgPrice: '$120-300' },
    { name: 'Bangkok', hotels: '100+', avgPrice: '$60-200' },
    { name: 'New York', hotels: '200+', avgPrice: '$150-400' },
    { name: 'Dakar', hotels: '20+', avgPrice: '$70-180' },
    { name: 'Marrakech', hotels: '80+', avgPrice: '$50-200' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <img src="/covers/hotels.jpg" alt="Hôtels" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container z-10 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Hotel className="w-10 h-10" />
            <h1 className="text-5xl font-bold">Réservations d'Hôtels</h1>
          </div>
          <p className="text-xl text-white/90 mb-6">
            Trouvez les meilleurs hôtels au meilleur prix, partout dans le monde
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg"
          >
            🏨 Demander un Service
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-16">
        {/* Introduction */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Réservations d'Hôtels - KHAMCI VOYAGES
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            KHAMCI VOYAGES vous propose une sélection exclusive d'hôtels 3, 4 et 5 étoiles dans les plus belles 
            destinations du monde. Bénéficiez de tarifs négociés, de services premium et d'une assistance personnalisée 
            pour chaque réservation.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            De la chambre simple au suite luxueuse, nous trouvons l'hébergement parfait adapté à votre budget et vos 
            préférences. Notre équipe s'occupe de tous les détails pour que vous profitiez pleinement de votre séjour.
          </p>
        </section>

        {/* Amenities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Avantages de Réserver avec KHAMCI VOYAGES
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {amenities.map((amenity, idx) => {
              const Icon = amenity.icon;
              return (
                <div key={idx} className="p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-shadow">
                  <Icon className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">{amenity.title}</h3>
                  <p className="text-gray-600 text-sm">{amenity.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Destinations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Destinations Populaires
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {destinations.map((dest, idx) => (
              <div key={idx} className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <h3 className="font-bold text-lg text-gray-900">{dest.name}</h3>
                </div>
                <p className="text-gray-600 mb-2">{dest.hotels} hôtels disponibles</p>
                <p className="text-sm text-blue-600 font-semibold">À partir de {dest.avgPrice}/nuit</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="bg-blue-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Nos Services Hôteliers
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Réservation d'Hôtels</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Hôtels 3, 4 et 5 étoiles</li>
                <li>✓ Tarifs négociés et exclusifs</li>
                <li>✓ Annulation gratuite jusqu'à 48h</li>
                <li>✓ Petit-déjeuner inclus</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Services Additionnels</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Transferts aéroport</li>
                <li>✓ Excursions et activités</li>
                <li>✓ Assistance 24/7</li>
                <li>✓ Assurance annulation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#0D1B3E] to-[#1a3a6e] rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Réserver Votre Hôtel ?</h2>
          <p className="text-lg mb-6">
            Obtenez les meilleurs tarifs en 24h, sans engagement
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg"
          >
            🏨 Demander un Service
          </Button>
        </section>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold gradient-text">Demander un Devis Hôtel</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <HotelQuoteForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
