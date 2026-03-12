import { useState } from 'react';
import { MapPin, Clock, DollarSign, Utensils, Camera, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceQuoteForm from '@/components/ServiceQuoteForm';

/**
 * Dubai Destination Page - KHAMCI VOYAGES
 * Guide complet de voyage à Dubaï avec attractions, restaurants et offres
 */

export default function DubaiPage() {
  const [showForm, setShowForm] = useState(false);

  const attractions = [
    {
      name: 'Burj Khalifa',
      description: 'Le plus haut bâtiment du monde. Montez au 148ème étage pour une vue incroyable.',
      time: '2-3 heures',
      price: 'AED 150-300',
    },
    {
      name: 'Dubaï Mall',
      description: 'Le plus grand centre commercial du monde avec 1200+ boutiques.',
      time: '4-6 heures',
      price: 'Gratuit (shopping)',
    },
    {
      name: 'Fontaines de Dubaï',
      description: 'Spectacle aquatique gratuit avec musique et lumières tous les soirs.',
      time: '30 minutes',
      price: 'Gratuit',
    },
    {
      name: 'Palmiers de Dubaï',
      description: 'Îles artificielles en forme de palmier. Tour en bateau ou visite en voiture.',
      time: '2-3 heures',
      price: 'AED 100-200',
    },
    {
      name: 'Désert de Dubaï',
      description: 'Safari en 4x4, dunes dorées et coucher de soleil spectaculaire.',
      time: '4-5 heures',
      price: 'AED 150-250',
    },
    {
      name: 'Gold Souk',
      description: 'Marché traditionnel avec or, épices et souvenirs. Expérience authentique.',
      time: '2-3 heures',
      price: 'Gratuit (shopping)',
    },
  ];

  const restaurants = [
    { name: 'Nobu', cuisine: 'Japonais gastronomique', price: 'AED 400+', rating: '⭐⭐⭐' },
    { name: 'Al Mallah', cuisine: 'Shawarma traditionnel', price: 'AED 20-40', rating: '⭐⭐⭐' },
    { name: 'Zuma', cuisine: 'Japonais contemporain', price: 'AED 300+', rating: '⭐⭐⭐' },
    { name: 'Arabian Tea House', cuisine: 'Émirati traditionnel', price: 'AED 80-150', rating: '⭐⭐⭐' },
    { name: 'Nusr-Et', cuisine: 'Steakhouse', price: 'AED 250+', rating: '⭐⭐' },
    { name: 'Bu Qtair', cuisine: 'Fruits de mer frais', price: 'AED 100-200', rating: '⭐⭐⭐' },
  ];

  const tips = [
    { icon: '🌞', title: 'Climat', description: 'Très chaud (40-50°C en été). Visitez d\'octobre à avril.' },
    { icon: '💰', title: 'Monnaie', description: 'Dirham émirati (AED). 1 EUR ≈ 3.7 AED. Cartes acceptées partout.' },
    { icon: '🚕', title: 'Transport', description: 'Métro moderne, taxis, Uber. Pas de location de voiture nécessaire.' },
    { icon: '👗', title: 'Tenue', description: 'Respectez la culture locale. Vêtements modestes en public.' },
    { icon: '⏰', title: 'Horaires', description: 'Beaucoup de magasins ferment 13h-16h. Ouverture tard le soir.' },
    { icon: '🎟️', title: 'Pass', description: 'Achetez le Dubai Pass pour accès à 100+ attractions.' },
  ];

  const offers = [
    {
      title: '✈️ Vol + Hôtel 5 nuits',
      description: 'Conakry → Dubaï (aller-retour) + Hôtel 5 étoiles',
      price: 'À partir de €1,500/personne',
      includes: ['Vol direct', 'Hôtel 5 étoiles', 'Petit-déjeuner', 'Transferts'],
    },
    {
      title: '🏜️ Offre Aventure',
      description: 'Vol + Hôtel + Safari désert + Fontaines + Burj Khalifa',
      price: 'À partir de €1,800/personne',
      includes: ['Vol direct', 'Hôtel 4 étoiles', 'Safari complet', 'Attractions clés'],
    },
    {
      title: '🛍️ Séjour Shopping',
      description: 'Vol + Hôtel 5 étoiles + Dubai Mall + Gold Souk',
      price: 'À partir de €2,200/personne',
      includes: ['Vol direct', 'Hôtel 5 étoiles', 'Dubai Pass', 'Visite guidée souks'],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <img src="/covers/dubai.jpg" alt="Dubaï" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative container z-10 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">🏙️ Dubaï, La Ville du Luxe</h1>
          <p className="text-xl text-white/90 mb-6">
            Découvrez le luxe et l'aventure à Dubaï avec KHAMCI VOYAGES
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg"
          >
            ✈️ Réserver Votre Voyage à Dubaï
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-16">
        {/* Overview */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">À propos de Dubaï</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Dubaï est une destination ultra-moderne combinant gratte-ciels futuristes, plages de luxe et 
            expériences uniques. C'est un paradis pour les amateurs de shopping, d'aventure et de luxe.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Du désert doré aux gratte-ciels brillants, Dubaï offre un contraste fascinant entre tradition 
            et modernité, avec une hospitalité légendaire et des attractions de classe mondiale.
          </p>
        </section>

        {/* Quick Facts */}
        <section className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <Clock className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Durée idéale</h3>
            <p className="text-gray-700">4-6 jours</p>
          </div>
          <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <DollarSign className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Budget/jour</h3>
            <p className="text-gray-700">AED 300-600</p>
          </div>
          <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <MapPin className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Fuseau horaire</h3>
            <p className="text-gray-700">UTC+4</p>
          </div>
          <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <Zap className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Meilleure période</h3>
            <p className="text-gray-700">Octobre-Avril</p>
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
              <div key={idx} className="p-6 border-2 border-orange-500 rounded-lg bg-orange-50">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{offer.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{offer.description}</p>
                <p className="text-2xl font-bold text-orange-600 mb-4">{offer.price}</p>
                <ul className="space-y-2 mb-4">
                  {offer.includes.map((item, i) => (
                    <li key={i} className="text-sm text-gray-700 dark:text-gray-300">✓ {item}</li>
                  ))}
                </ul>
                <Button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg"
                >
                  Réserver Maintenant
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Découvrir Dubaï ?</h2>
          <p className="text-lg mb-6">
            Nos experts créent des itinéraires personnalisés adaptés à vos préférences et budget
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg"
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Réserver Votre Voyage à Dubaï</h2>
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
