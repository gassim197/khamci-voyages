import { useState } from 'react';
import { Plane, Hotel, Car, FileText, MapPin, Users } from 'lucide-react';
import FlightQuoteForm from './FlightQuoteForm';
import HotelQuoteForm from './HotelQuoteForm';
import CarQuoteForm from './CarQuoteForm';

/**
 * Service Quote Form Selector - KHAMCI VOYAGES
 * Sélecteur de service avec formulaires spécialisés
 */

type ServiceType = 'flights' | 'hotel' | 'car' | 'visa' | 'tour' | 'custom';

interface ServiceQuoteFormProps {
  defaultService?: ServiceType;
  onClose?: () => void;
}

export default function ServiceQuoteForm({ defaultService = 'flights', onClose }: ServiceQuoteFormProps) {
  const [selectedService, setSelectedService] = useState<ServiceType>(defaultService);

  const services = [
    {
      id: 'flights' as ServiceType,
      label: 'Vols',
      icon: Plane,
      color: 'orange',
      description: 'Billets d\'avion partout dans le monde',
    },
    {
      id: 'hotel' as ServiceType,
      label: 'Hôtel',
      icon: Hotel,
      color: 'blue',
      description: 'Réservations d\'hôtels',
    },
    {
      id: 'car' as ServiceType,
      label: 'Voiture',
      icon: Car,
      color: 'purple',
      description: 'Location de voiture',
    },
    {
      id: 'visa' as ServiceType,
      label: 'Visa',
      icon: FileText,
      color: 'green',
      description: 'Assistance visa',
    },
    {
      id: 'tour' as ServiceType,
      label: 'Circuit',
      icon: MapPin,
      color: 'red',
      description: 'Voyages organisés',
    },
    {
      id: 'custom' as ServiceType,
      label: 'Personnalisé',
      icon: Users,
      color: 'indigo',
      description: 'Voyage sur mesure',
    },
  ];

  const renderForm = () => {
    switch (selectedService) {
      case 'flights':
        return <FlightQuoteForm onClose={onClose} />;
      case 'hotel':
        return <HotelQuoteForm onClose={onClose} />;
      case 'car':
        return <CarQuoteForm onClose={onClose} />;
      default:
        return <FlightQuoteForm onClose={onClose} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Service Selection */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Quel service vous intéresse ?</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {services.map(service => {
            const Icon = service.icon;
            const isSelected = selectedService === service.id;
            const colorClasses = {
              orange: isSelected ? 'bg-orange-100 border-orange-500 text-orange-900' : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300',
              blue: isSelected ? 'bg-blue-100 border-blue-500 text-blue-900' : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300',
              purple: isSelected ? 'bg-purple-100 border-purple-500 text-purple-900' : 'bg-white border-gray-300 text-gray-700 hover:border-purple-300',
              green: isSelected ? 'bg-green-100 border-green-500 text-green-900' : 'bg-white border-gray-300 text-gray-700 hover:border-green-300',
              red: isSelected ? 'bg-red-100 border-red-500 text-red-900' : 'bg-white border-gray-300 text-gray-700 hover:border-red-300',
              indigo: isSelected ? 'bg-indigo-100 border-indigo-500 text-indigo-900' : 'bg-white border-gray-300 text-gray-700 hover:border-indigo-300',
            };

            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-3 border-2 rounded-lg transition-all flex flex-col items-center gap-2 ${colorClasses[service.color as keyof typeof colorClasses]}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium text-center">{service.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Form */}
      {renderForm()}
    </div>
  );
}
