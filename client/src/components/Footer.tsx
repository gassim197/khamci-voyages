import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="heading-md mb-4">KHAMCI VOYAGES</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre partenaire de confiance pour tous vos voyages en Guinée et au-delà.
              Rapidité, fiabilité et expertise locale.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Billets d'Avion
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Réservations d'Hôtels
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Assistance Visa
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Voyages Organisés
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="tel:+224611145892" className="hover:text-orange-400 transition-colors">
                  +224 611 145 892
                </a>
              </li>
              <li>
                <a href="mailto:khamcivoyages@gmail.com" className="hover:text-orange-400 transition-colors">
                  khamcivoyages@gmail.com
                </a>
              </li>
              <li className="text-gray-400">Almamya, commune de Kaloum</li>
              <li className="text-gray-400">Conakry, Guinée</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Suivez-nous</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gradient mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {currentYear} KHAMCI VOYAGES. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-400 transition-colors">
              Mentions Légales
            </a>
            <a href="#" className="hover:text-orange-400 transition-colors">
              Politique de Confidentialité
            </a>
            <a href="#" className="hover:text-orange-400 transition-colors">
              Conditions d'Utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
