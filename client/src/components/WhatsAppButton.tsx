import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { trackWhatsAppClick } from '@/lib/analytics';

/**
 * WhatsApp Floating Button - KHAMCI VOYAGES
 * Bouton flottant pour contacter l'agence via WhatsApp
 * Visible partout sur le site avec animations fluides
 */

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Afficher le bouton après 2 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Numéro WhatsApp de KHAMCI VOYAGES
  const phoneNumber = '224611145892'; // Format international sans +
  const message = encodeURIComponent(
    'Bonjour KHAMCI VOYAGES, je souhaite obtenir un devis pour mon voyage. Pouvez-vous m\'aider ?'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  if (!isVisible) return null;

  return (
    <>
      {/* Bouton Flottant Principal */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Messages Bubble - Affichage au hover/click */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-2xl p-4 w-72 mb-4 animate-fade-in-up">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                KHAMCI VOYAGES
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">
              Bonjour 👋 ! Posez vos questions sur nos services de voyage. Nous répondons en moins de 5 minutes !
            </p>

            <div className="space-y-2 mb-4">
              <p className="text-xs text-gray-600">
                ⏰ <strong>Horaires :</strong> Lun-Sam 8h-20h (GMT+0)
              </p>
              <p className="text-xs text-gray-600">
                📞 <strong>Téléphone :</strong> +224 611 145 892
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(window.location.pathname)}
              className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors"
            >
              💬 Démarrer la conversation
            </a>
          </div>
        )}

        {/* Bouton Flottant */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 group"
          title="Contactez-nous sur WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          
          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-75"></span>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 bg-gray-900 text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Contactez-nous sur WhatsApp
            <div className="absolute top-full right-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
          </div>

          {/* Badge - Nouveau message */}
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce">
            1
          </span>
        </button>
      </div>

      {/* Overlay - Fermer le menu au clic */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
