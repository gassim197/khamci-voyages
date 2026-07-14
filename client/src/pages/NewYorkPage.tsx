import { useState } from 'react';
import { MapPin, Clock, Banknote, Utensils, Camera, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceQuoteForm from '@/components/ServiceQuoteForm';

/**
 * New York Destination Page - KHAMCI VOYAGES
 * Guide complet de voyage à New York avec attractions, restaurants et offres
 */

export default function NewYorkPage() {
  const [showForm, setShowForm] = useState(false);

  const attractions = [
    {
      name: 'Statue de la Liberté',
      description: 'Symbole iconique de New York. Prenez le ferry pour une vue spectaculaire.',
      time: '3-4 heures',
      price: '$24-27',
    },
    {
      name: 'Central Park',
      description: 'Parc urbain de 843 acres. Parfait pour une balade, pique-nique ou vélo.',
      time: '2-4 heures',
      price: 'Gratuit',
    },
    {
      name: 'Times Square',
      description: 'Cœur de New York avec écrans géants, théâtres et restaurants.',
      time: '1-2 heures',
      price: 'Gratuit',
    },
    {
      name: 'Empire State Building',
      description: 'Gratte-ciel emblématique avec observatoire au 86ème étage.',
      time: '2-3 heures',
      price: '$39-76',
    },
    {
      name: 'Metropolitan Museum',
      description: 'L\'un des plus grands musées du monde avec 2 millions d\'œuvres.',
      time: '3-5 heures',
      price: '$30 (suggéré)',
    },
    {
      name: 'Brooklyn Bridge',
      description: 'Pont historique avec vue panoramique sur Manhattan.',
      time: '1-2 heures',
      price: 'Gratuit',
    },
  ];

  const restaurants = [
    { name: 'Eleven Madison Park', cuisine: 'Gastronomique', price: '$$$', rating: '⭐⭐⭐' },
    { name: 'Joe\'s Pizza', cuisine: 'Pizza classique', price: '$', rating: '⭐⭐⭐' },
    { name: 'Balthazar', cuisine: 'Français', price: '$$', rating: '⭐⭐⭐' },
    { name: 'Shake Shack', cuisine: 'Burgers', price: '$', rating: '⭐⭐⭐' },
    { name: 'Carbone', cuisine: 'Italien', price: '$$$', rating: '⭐⭐⭐' },
    { name: 'Katz\'s Delicatessen', cuisine: 'Deli classique', price: '$$', rating: '⭐⭐⭐' },
  ];

  const tips = [
    { icon: '🚇', title: 'Métro', description: 'Le métro est le moyen le plus rapide. Achetez une MetroCard.' },
    { icon: '💵', title: 'Budget', description: 'Budget moyen : $100-200/jour (hôtel, repas, attractions).' },
    { icon: '🏙️', title: 'Quartiers', description: 'Manhattan, Brooklyn, Queens. Chacun a son charme unique.' },
    { icon: '⏰', title: 'Meilleure période', description: 'Avril-Mai et Septembre-Octobre pour le climat.' },
    { icon: '🎭', title: 'Broadway', description: 'Réservez les billets en ligne pour économiser.' },
    { icon: '🍎', title: 'Nourriture', description: 'Cuisine mondiale. Des food trucks aux restaurants 3 étoiles.' },
  ];

  const offers = [
    {
      title: '✈️ Vol + Hôtel 5 nuits',
      description: 'Conakry → New York (aller-retour) + Hôtel 4 étoiles',
      price: 'À partir de €1,600/personne',
      includes: ['Vol direct', 'Hôtel 4 étoiles', 'Petit-déjeuner', 'Transferts'],
    },
    {
      title: '🎭 Offre Broadway',
      description: 'Vol + Hôtel + 2 spectacles Broadway + Visite guidée',
      price: 'À partir de €2,100/personne',
      includes: ['Vol direct', 'Hôtel 4 étoiles', '2 spectacles', 'Visite guidée'],
    },
    {
      title: '🗽 Séjour Complet',
      description: 'Vol + Hôtel 5 étoiles + Attractions clés + Dîner gastronomique',
      price: 'À partir de €2,800/personne',
      includes: ['Vol direct', 'Hôtel 5 étoiles', 'Attractions', 'Dîner 3 étoiles'],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <img src="/covers/hero-newyork.webp" alt="New York" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative container z-10 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">🗽 New York, La Ville qui ne Dort Jamais</h1>
          <p className="text-xl text-white/90 mb-6">
            Découvrez l'énergie de New York avec KHAMCI VOYAGES
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg"
          >
            ✈️ Réserver Votre Voyage à New York
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-16">
        {/* Overview */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">À propos de New York</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            New York est une métropole dynamique et diverse, connue pour ses gratte-ciels emblématiques, 
            sa scène culturelle vibrante et sa cuisine de classe mondiale. C'est une ville où tout est possible.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            De Times Square à Central Park, des musées de renommée mondiale aux restaurants étoilés Michelin, 
            New York offre une expérience urbaine incomparable. La ville ne dort jamais et l'énergie est contagieuse.
          </p>
        </section>

        {/* Quick Facts */}
        <section className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Clock className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Durée idéale</h3>
            <p className="text-gray-700">5-7 jours</p>
          </div>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Banknote className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Budget/jour</h3>
            <p className="text-gray-700">$100-200</p>
          </div>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <MapPin className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Fuseau horaire</h3>
            <p className="text-gray-700">UTC-5 (EST)</p>
          </div>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Zap className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Meilleure période</h3>
            <p className="text-gray-700">Avril-Octobre</p>
          </div>
        </section>

        {/* Top Attractions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Top Attractions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {attractions.map((attr, idx) => (
              <div key={idx} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{attr.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{attr.description}</p>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>⏱️ {attr.time}</span>
                  <span>💰 {attr.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Restaurants */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Restaurants Recommandés</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {restaurants.map((rest, idx) => (
              <div key={idx} className="p-6 bg-green-50 rounded-lg">
                <Utensils className="w-6 h-6 text-green-500 mb-2" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{rest.name}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{rest.cuisine}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-semibold">{rest.price}</span>
                  <span>{rest.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Conseils Pratiques</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tips.map((tip, idx) => (
              <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-3xl mb-3">{tip.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Offres Spéciales KHAMCI VOYAGES</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer, idx) => (
              <div key={idx} className="p-6 border-2 border-blue-500 dark:border-blue-400 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{offer.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{offer.description}</p>
                <p className="text-2xl font-bold text-blue-600 mb-4">{offer.price}</p>
                <ul className="space-y-2 mb-4">
                  {offer.includes.map((item, i) => (
                    <li key={i} className="text-sm text-gray-700 dark:text-gray-300">✓ {item}</li>
                  ))}
                </ul>
                <Button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
                >
                  Réserver Maintenant
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-700 to-green-600 rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Découvrir New York ?</h2>
          <p className="text-lg mb-6">
            Nos experts créent des itinéraires personnalisés adaptés à vos préférences et budget
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg"
          >
            ✈️ Demander un Service
          </Button>
        </section>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full my-8">
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Réserver Votre Voyage à New York</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <ServiceQuoteForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
