import { useState } from 'react';
import { Plane, MapPin, Clock, Shield, Users, DollarSign } from 'lucide-react';
import HeaderNav from '@/components/HeaderNav';
import { Button } from '@/components/ui/button';
import FlightQuoteForm from '@/components/FlightQuoteForm';

/**
 * Flights Destination Page - KHAMCI VOYAGES
 * Page dédiée aux vols avec contenu SEO optimisé
 */

export default function FlightsPage() {
  const [showForm, setShowForm] = useState(false);

  const features = [
    {
      icon: MapPin,
      title: 'Destinations Mondiales',
      description: 'Plus de 500 destinations dans le monde entier',
    },
    {
      icon: DollarSign,
      title: 'Meilleurs Prix',
      description: 'Tarifs compétitifs et offres exclusives',
    },
    {
      icon: Clock,
      title: 'Réservation Rapide',
      description: 'Devis en 24h, réservation en 48h',
    },
    {
      icon: Shield,
      title: 'Garantie Sécurité',
      description: 'Paiement sécurisé et assurance voyage',
    },
    {
      icon: Users,
      title: 'Support 24/7',
      description: 'Assistance avant, pendant et après le vol',
    },
    {
      icon: Plane,
      title: 'Toutes Compagnies',
      description: 'Accès aux meilleures compagnies aériennes',
    },
  ];

  const destinations = [
    { city: 'Paris', country: 'France', flights: '15+' },
    { city: 'Bangkok', country: 'Thaïlande', flights: '12+' },
    { city: 'New York', country: 'USA', flights: '20+' },
    { city: 'Dakar', country: 'Sénégal', flights: '8+' },
    { city: 'Abidjan', country: 'Côte d\'Ivoire', flights: '10+' },
    { city: 'Accra', country: 'Ghana', flights: '9+' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-500 to-red-500">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/hero-airplane-sunset-64duN9FBfa4CZjHNXpHzzz.webp"
            alt="Vols"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container z-10 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Plane className="w-10 h-10" />
            <h1 className="text-5xl font-bold">Billets d'Avion</h1>
          </div>
          <p className="text-xl text-white/90 mb-6">
            Réservez vos vols vers le monde entier au meilleur prix
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg"
          >
            ✈️ Demander un Devis Vol
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-16">
        {/* Introduction */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vols Internationaux - KHAMCI VOYAGES
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Depuis plus de 15 ans, KHAMCI VOYAGES est votre partenaire de confiance pour tous vos voyages aériens. 
            Nous offrons des billets d'avion vers plus de 500 destinations dans le monde entier, avec les meilleures 
            compagnies aériennes et les tarifs les plus compétitifs.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Que vous voyagiez pour affaires, loisirs ou famille, notre équipe d'experts est à votre service pour 
            trouver le vol parfait adapté à vos besoins et votre budget.
          </p>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Pourquoi Choisir KHAMCI VOYAGES pour vos Vols ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                  <Icon className="w-8 h-8 text-orange-500 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Destinations Populaires
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {destinations.map((dest, idx) => (
              <div key={idx} className="p-6 border border-gray-200 rounded-lg hover:border-orange-500 transition-colors">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{dest.city}</h3>
                <p className="text-gray-600 mb-3">{dest.country}</p>
                <p className="text-sm text-orange-600 font-semibold">{dest.flights} vols disponibles</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Details */}
        <section className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Nos Services pour vos Vols
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Réservation de Vols</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Vols directs et connectés</li>
                <li>✓ Toutes les compagnies aériennes</li>
                <li>✓ Classes économique et affaires</li>
                <li>✓ Tarifs négociés exclusifs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Services Additionnels</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Assurance voyage complète</li>
                <li>✓ Transferts aéroport inclus</li>
                <li>✓ Assistance visa si nécessaire</li>
                <li>✓ Support 24/7 en français</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Décrocher Votre Vol ?</h2>
          <p className="text-lg mb-6">
            Obtenez un devis personnalisé en 24h, sans engagement
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg"
          >
            ✈️ Demander un Devis Vol Maintenant
          </Button>
        </section>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold gradient-text">Demander un Devis Vol</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <FlightQuoteForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
