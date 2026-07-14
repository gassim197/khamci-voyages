import { useState } from 'react';
import { MapPin, Clock, Banknote, Utensils, Camera, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceQuoteForm from '@/components/ServiceQuoteForm';
import DestinationImageGallery from '@/components/DestinationImageGallery';

/**
 * Paris Destination Page - KHAMCI VOYAGES
 * Guide complet de voyage à Paris avec attractions, restaurants et offres
 */

export default function ParisPage() {
  const [showForm, setShowForm] = useState(false);

  const attractions = [
    {
      name: 'Tour Eiffel',
      description: 'L\'icône de Paris. Montez au sommet pour une vue panoramique spectaculaire.',
      time: '2-3 heures',
      price: '€17-27',
    },
    {
      name: 'Musée du Louvre',
      description: 'Le plus grand musée du monde. Découvrez la Joconde et des milliers d\'œuvres.',
      time: '3-4 heures',
      price: '€17',
    },
    {
      name: 'Cathédrale Notre-Dame',
      description: 'Chef-d\'œuvre gothique. Actuellement en restauration, visite extérieure recommandée.',
      time: '1 heure',
      price: 'Gratuit',
    },
    {
      name: 'Arc de Triomphe',
      description: 'Monument emblématique avec vue sur les Champs-Élysées.',
      time: '1-2 heures',
      price: '€13',
    },
    {
      name: 'Sacré-Cœur',
      description: 'Basilique blanche dominant Montmartre. Vue magnifique sur Paris.',
      time: '1-2 heures',
      price: 'Gratuit (dôme €6)',
    },
    {
      name: 'Musée d\'Orsay',
      description: 'Impressionnisme et art du XIXe siècle dans une ancienne gare.',
      time: '2-3 heures',
      price: '€16',
    },
  ];

  const restaurants = [
    { name: 'L\'Astrance', cuisine: 'Gastronomique', price: '€€€', rating: '⭐⭐⭐' },
    { name: 'Café de Flore', cuisine: 'Français classique', price: '€€', rating: '⭐⭐⭐' },
    { name: 'Le Jules Verne', cuisine: 'Gastronomique (Tour Eiffel)', price: '€€€', rating: '⭐⭐⭐' },
    { name: 'Ladurée', cuisine: 'Pâtisserie & Salon de thé', price: '€', rating: '⭐⭐⭐' },
    { name: 'Septime', cuisine: 'Français contemporain', price: '€€', rating: '⭐⭐⭐' },
    { name: 'Bouchon du 7ème', cuisine: 'Bistrot français', price: '€€', rating: '⭐⭐' },
  ];

  const tips = [
    { icon: '🚇', title: 'Transport', description: 'Achetez un carnet de 10 tickets de métro (€17) ou un pass Navigo.' },
    { icon: '💶', title: 'Budget', description: 'Budget moyen : €80-150/jour (hôtel 3-4 étoiles, repas, attractions).' },
    { icon: '🗣️', title: 'Langue', description: 'Apprenez quelques phrases en français. Les Parisiens apprécient l\'effort !' },
    { icon: '⏰', title: 'Meilleure période', description: 'Avril-Mai et Septembre-Octobre pour éviter les foules.' },
    { icon: '🎟️', title: 'Musées', description: 'Achetez le Paris Museum Pass pour accès illimité à 70 musées.' },
    { icon: '🚴', title: 'Vélib', description: 'Louez des vélos pour explorer la ville comme les Parisiens.' },
  ];

  const parisImages = [
    {
      src: '/images/paris-eiffel.jpg',
      alt: 'Tour Eiffel au coucher de soleil',
      title: 'Tour Eiffel - Le symbole de Paris'
    },
    {
      src: '/images/paris-louvre.jpg',
      alt: 'Musée du Louvre',
      title: 'Musée du Louvre - Patrimoine mondial'
    },
    {
      src: '/images/paris-seine.jpg',
      alt: 'Croisière sur la Seine',
      title: 'La Seine - Cœur romantique de Paris'
    },
    {
      src: '/images/paris-montmartre.jpg',
      alt: 'Montmartre au coucher de soleil',
      title: 'Montmartre - Quartier bohème et artistique'
    },
    {
      src: '/images/paris-notre-dame.jpg',
      alt: 'Cathédrale Notre-Dame de Paris',
      title: 'Notre-Dame - Chef-d\'œuvre gothique'
    }
  ];

  const offers = [
    {
      title: '✈️ Vol + Hôtel 4 nuits',
      description: 'Conakry → Paris (aller-retour) + Hôtel 4 étoiles',
      price: 'À partir de €1,200/personne',
      includes: ['Vol direct', 'Hôtel 4 étoiles', 'Petit-déjeuner', 'Transferts'],
    },
    {
      title: '🎫 Offre Musées',
      description: 'Vol + Hôtel + Paris Museum Pass 4 jours',
      price: 'À partir de €1,450/personne',
      includes: ['Vol direct', 'Hôtel 4 étoiles', 'Museum Pass', 'Visite guidée'],
    },
    {
      title: '💑 Séjour Romantique',
      description: 'Vol + Hôtel 5 étoiles + Dîner gastronomique',
      price: 'À partir de €2,100/couple',
      includes: ['Vol direct', 'Hôtel 5 étoiles', 'Dîner 3 étoiles', 'Croisière Seine'],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <img src="/covers/hero-paris.webp" alt="Paris, La Ville Lumière" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative container z-10 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">🗼 Paris, La Ville Lumière</h1>
          <p className="text-xl text-white/90 mb-6">
            Découvrez la magie de Paris avec KHAMCI VOYAGES
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg"
          >
            ✈️ Réserver Votre Voyage à Paris
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-16">
        {/* Overview */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">À propos de Paris</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Paris, la Ville Lumière, est l'une des destinations les plus romantiques et culturelles du monde. 
            Avec ses monuments iconiques, ses musées de classe mondiale et sa cuisine exquise, Paris offre une 
            expérience inoubliable à chaque visiteur.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Que vous soyez intéressé par l'art, l'histoire, la gastronomie ou simplement flâner dans les rues 
            pittoresques, Paris a quelque chose pour tout le monde.
          </p>
        </section>

        {/* Quick Facts */}
        <section className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Clock className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Durée idéale</h3>
            <p className="text-gray-700 dark:text-gray-300">4-7 jours</p>
          </div>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Banknote className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Budget/jour</h3>
            <p className="text-gray-700 dark:text-gray-300">€80-150</p>
          </div>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <MapPin className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Fuseau horaire</h3>
            <p className="text-gray-700 dark:text-gray-300">UTC+1 (GMT+2 été)</p>
          </div>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Camera className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Meilleure période</h3>
            <p className="text-gray-700 dark:text-gray-300">Avril-Octobre</p>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Galerie Photos - Paris</h2>
          <DestinationImageGallery images={parisImages} destinationName="Paris" />
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
              <div key={idx} className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Utensils className="w-6 h-6 text-orange-500 mb-2" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{rest.name}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{rest.cuisine}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-orange-600 font-semibold">{rest.price}</span>
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
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Découvrir Paris ?</h2>
          <p className="text-lg mb-6">
            Nos experts créent des itinéraires personnalisés adaptés à vos préférences et budget
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg"
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Réserver Votre Voyage à Paris</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
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
