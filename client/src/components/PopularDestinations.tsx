import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";

/**
 * PopularDestinations - Section des destinations populaires
 * 
 * Affiche 6 cartes avec images et boutons pour accéder aux pages de destination
 * Optimisé pour conversion avec CTA clairs et images attrayantes
 */

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  path: string;
  color: string;
  icon: string;
}

export default function PopularDestinations() {
  const destinations: Destination[] = [
    {
      id: "paris",
      name: "Paris",
      description: "La Ville Lumière - Découvrez la magie de l'architecture et la gastronomie française",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/paris-eiffel-tower-TMXAvKJHAzZg6THDh7ubKL.png",
      path: "/destination/paris",
      color: "from-blue-500 to-purple-600",
      icon: "🗼"
    },
    {
      id: "dubai",
      name: "Dubaï",
      description: "L'Oasis du Désert - Luxe, modernité et aventures dans les Émirats",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/dubai-burj-khalifa-TMXAvKJHAzZg6THDh7ubKL.png",
      path: "/destination/dubai",
      color: "from-yellow-500 to-orange-600",
      icon: "🏙️"
    },
    {
      id: "casablanca",
      name: "Casablanca",
      description: "La Perle du Maroc - Tradition, culture et charme méditerranéen",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663352571509/Tggjc7uo8jLmjyKySijZqx/casablanca-hassan-mosque-TMXAvKJHAzZg6THDh7ubKL.png",
      path: "/destination/casablanca",
      color: "from-amber-500 to-orange-600",
      icon: "🕌"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-yellow-100 rounded-full">
            <MapPin className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-600">DESTINATIONS POPULAIRES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Explorez le Monde avec KHAMCI VOYAGES
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos guides complets, attractions, restaurants et offres spéciales pour les destinations les plus demandées
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Link key={destination.id} href={destination.path} className="block h-full">
                <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Overlay Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${destination.color} opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg">
                      {destination.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{destination.name}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-2">{destination.description}</p>

                    {/* Button */}
                    <Button
                      className={`w-full bg-gradient-to-r ${destination.color} hover:shadow-lg transition-all duration-300 text-white font-semibold py-3 flex items-center justify-center gap-2 group/btn`}
                    >
                      Découvrir
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>

                    {/* Quick Info */}
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-500">
                      <span>📸 Galerie photos</span>
                      <span>🍽️ Restaurants</span>
                      <span>🎯 Offres</span>
                    </div>
                  </div>
                </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Vous ne trouvez pas votre destination ? Créez un voyage sur mesure !
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:shadow-lg text-white font-semibold px-8 py-4"
          >
            Demander un Voyage Personnalisé
          </Button>
        </div>
      </div>
    </section>
  );
}
