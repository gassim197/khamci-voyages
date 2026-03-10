import { useState } from 'react';
import { Car, MapPin, Fuel, Shield, Users, Zap } from 'lucide-react';
import HeaderNav from '@/components/HeaderNav';
import { Button } from '@/components/ui/button';
import CarQuoteForm from '@/components/CarQuoteForm';

/**
 * Cars Rental Destination Page - KHAMCI VOYAGES
 * Page dédiée à la location de voitures avec contenu SEO optimisé
 */

export default function CarsPage() {
  const [showForm, setShowForm] = useState(false);

  const features = [
    { icon: Car, title: 'Flotte Variée', description: 'Économique, SUV, luxe et minibus' },
    { icon: Fuel, title: 'Carburant Inclus', description: 'Essence/diesel illimitée' },
    { icon: Shield, title: 'Assurance Complète', description: 'Couverture tous risques' },
    { icon: Users, title: 'Conducteurs Multiples', description: 'Jusqu\'à 4 conducteurs inclus' },
    { icon: Zap, title: 'Réservation Rapide', description: 'Confirmation en 2 heures' },
    { icon: MapPin, title: 'Livraison Flexible', description: 'À l\'aéroport ou en ville' },
  ];

  const carTypes = [
    { type: 'Économique', examples: 'Toyota Yaris, Hyundai i20', price: '$30-50/jour' },
    { type: 'Berline', examples: 'Toyota Corolla, Nissan Altima', price: '$50-80/jour' },
    { type: 'SUV', examples: 'Toyota RAV4, Hyundai Tucson', price: '$80-120/jour' },
    { type: 'Minibus', examples: '7-9 places, climatisé', price: '$100-150/jour' },
    { type: 'Luxe', examples: 'BMW, Mercedes, Audi', price: '$150-250/jour' },
    { type: 'Électrique', examples: 'Tesla Model 3, Nissan Leaf', price: '$70-100/jour' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#0D1B3E] to-[#FF6B35]">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-purple-600"></div>
        </div>
        <div className="relative container z-10 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Car className="w-10 h-10" />
            <h1 className="text-5xl font-bold">Location de Voitures</h1>
          </div>
          <p className="text-xl text-white/90 mb-6">
            Louez une voiture au meilleur prix, partout dans le monde
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg"
          >
            🚗 Demander un Devis Voiture
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-16">
        {/* Introduction */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Location de Voitures - KHAMCI VOYAGES
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            KHAMCI VOYAGES vous propose une large gamme de véhicules de location pour tous vos besoins : 
            voitures économiques, SUV, minibus ou véhicules de luxe. Bénéficiez d'assurance complète, 
            de tarifs compétitifs et d'une assistance 24/7.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Que vous voyagiez en famille, en groupe ou en solo, nous avons le véhicule parfait pour votre voyage. 
            Livraison flexible à l'aéroport ou en centre-ville, avec chauffeur optionnel.
          </p>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Avantages de Louer avec KHAMCI VOYAGES
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-6 bg-purple-50 rounded-lg hover:shadow-lg transition-shadow">
                  <Icon className="w-8 h-8 text-purple-500 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Car Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Types de Véhicules Disponibles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {carTypes.map((car, idx) => (
              <div key={idx} className="p-6 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{car.type}</h3>
                <p className="text-gray-600 mb-3 text-sm">{car.examples}</p>
                <p className="text-sm text-purple-600 font-semibold">{car.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="bg-purple-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Nos Services de Location
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Location Standard</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Assurance tous risques incluse</li>
                <li>✓ Carburant illimité</li>
                <li>✓ Kilométrage illimité</li>
                <li>✓ GPS et équipements de sécurité</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Options Additionnelles</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Chauffeur professionnel</li>
                <li>✓ Siège bébé et rehausseur</li>
                <li>✓ Wifi embarqué</li>
                <li>✓ Assistance routière 24/7</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#0D1B3E] to-[#FF6B35] rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Louer Votre Voiture ?</h2>
          <p className="text-lg mb-6">
            Obtenez un devis personnalisé en 24h, sans engagement
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg"
          >
            🚗 Demander un Devis Voiture Maintenant
          </Button>
        </section>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold gradient-text">Demander un Devis Voiture</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <CarQuoteForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
