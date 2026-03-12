import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Plane } from 'lucide-react';
import { majorAirlines, majorCities, cabinClasses } from '@/data/serviceTypes';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import CityCombobox from '@/components/CityCombobox';

/**
 * Flight Quote Form - KHAMCI VOYAGES
 * Formulaire spécialisé pour les demandes de devis de vols
 * Champs : Ville départ/arrivée, classe, passagers, compagnies, budget
 */

interface FlightQuoteFormProps {
  onSubmit?: (data: any) => void;
  onClose?: () => void;
}

export default function FlightQuoteForm({ onSubmit, onClose }: FlightQuoteFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    returnDate: '',
    passengers: '1',
    cabinClass: 'economy',
    airlines: [] as string[],
    estimatedBudget: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAirlineToggle = (airline: string) => {
    setFormData(prev => ({
      ...prev,
      airlines: prev.airlines.includes(airline)
        ? prev.airlines.filter(a => a !== airline)
        : [...prev.airlines, airline],
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email valide requis';
    if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
    if (!formData.departureCity) newErrors.departureCity = 'Ville de départ requise';
    if (!formData.arrivalCity) newErrors.arrivalCity = 'Ville d\'arrivée requise';
    if (!formData.departureDate) newErrors.departureDate = 'Date de départ requise';
    if (formData.returnDate && new Date(formData.returnDate) <= new Date(formData.departureDate)) {
      newErrors.returnDate = 'La date de retour doit être après la date de départ';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitQuote = trpc.quotes.submit.useMutation({
    onSuccess: () => {
      toast.success('Votre demande de devis a été envoyée ! Nous vous répondrons sous 24h.');
      sessionStorage.setItem('quoteData', JSON.stringify({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        destination: formData.arrivalCity ? `${formData.departureCity} → ${formData.arrivalCity}` : formData.departureCity,
        departureDate: formData.departureDate,
        returnDate: formData.returnDate,
        passengers: formData.passengers,
        serviceType: 'vol',
      }));
      if (onSubmit) {
        onSubmit(formData);
      } else {
        window.location.href = '/thank-you';
      }
    },
    onError: (err) => {
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.');
      console.error(err);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    submitQuote.mutate({
      clientName: `${formData.firstName} ${formData.lastName}`.trim(),
      clientEmail: formData.email,
      clientPhone: formData.phone || undefined,
      destination: formData.arrivalCity ? `${formData.departureCity} → ${formData.arrivalCity}` : undefined,
      departureDate: formData.departureDate || undefined,
      returnDate: formData.returnDate || undefined,
      passengers: parseInt(formData.passengers) || 1,
      serviceType: 'vol',
      message: formData.message || undefined,
      source: 'website',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service Type Badge */}
      <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
        <Plane className="w-5 h-5 text-orange-500" />
        <span className="font-semibold text-orange-900">Demande de Devis - Vols</span>
      </div>

      {/* Personal Info Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Vos Informations</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Jean"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Dupont"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jean@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+224 XXX XXX XXX"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Flight Details Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Détails du Vol</h3>
        
        {/* Cities */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ville de Départ *</label>
            <CityCombobox
              value={formData.departureCity}
              onChange={(val) => {
                setFormData(prev => ({ ...prev, departureCity: val }));
                if (errors.departureCity) setErrors(prev => ({ ...prev, departureCity: '' }));
              }}
              placeholder="Ex: Conakry, Paris, Dakar..."
              cities={majorCities}
              error={errors.departureCity}
            />
            {errors.departureCity && <p className="text-red-500 text-xs mt-1">{errors.departureCity}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ville d'Arrivée *</label>
            <CityCombobox
              value={formData.arrivalCity}
              onChange={(val) => {
                setFormData(prev => ({ ...prev, arrivalCity: val }));
                if (errors.arrivalCity) setErrors(prev => ({ ...prev, arrivalCity: '' }));
              }}
              placeholder="Ex: Paris, Dubaï, New York..."
              cities={majorCities}
              error={errors.arrivalCity}
            />
            {errors.arrivalCity && <p className="text-red-500 text-xs mt-1">{errors.arrivalCity}</p>}
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de Départ *</label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.departureDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.departureDate && <p className="text-red-500 text-xs mt-1">{errors.departureDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de Retour (optionnel)</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.returnDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
          </div>
        </div>

        {/* Passengers & Class */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Passagers *</label>
            <select
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n} passager{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Classe *</label>
            <select
              name="cabinClass"
              value={formData.cabinClass}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {cabinClasses.map(cls => (
                <option key={cls.value} value={cls.value}>{cls.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Airlines */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Compagnies Aérienne Préférées</label>
          <div className="flex flex-col gap-2">
            {majorAirlines.map(airline => (
              <label key={airline} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-orange-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.airlines.includes(airline)}
                  onChange={() => handleAirlineToggle(airline)}
                  className="w-4 h-4 text-orange-500 rounded flex-shrink-0"
                />
                <span className="text-sm text-gray-700 font-medium">{airline}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget Estimé (USD) *</label>
          <input
            type="number"
            name="estimatedBudget"
            value={formData.estimatedBudget}
            onChange={handleChange}
            placeholder="2000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message Spécial (optionnel)</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Demandes spéciales, allergies, préférences..."
          rows={4}
          className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Reassurance */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
        ✓ Gratuit et sans engagement • Réponse garantie sous 24h
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-lg transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          '✈️ OBTENIR MON DEVIS VOL'
        )}
      </Button>
    </form>
  );
}
