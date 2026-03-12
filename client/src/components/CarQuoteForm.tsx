import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Car } from 'lucide-react';
import { majorCities, carTypes } from '@/data/serviceTypes';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import CityCombobox from '@/components/CityCombobox';

/**
 * Car Rental Quote Form - KHAMCI VOYAGES
 * Formulaire spécialisé pour les demandes de devis de location de voiture
 * Inspiré de Booking.com - Lieu, dates, type véhicule
 */

interface CarQuoteFormProps {
  onSubmit?: (data: any) => void;
  onClose?: () => void;
}

export default function CarQuoteForm({ onSubmit, onClose }: CarQuoteFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    carType: 'sedan',
    drivers: '1',
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email valide requis';
    if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
    if (!formData.pickupLocation) newErrors.pickupLocation = 'Lieu de prise en charge requis';
    if (!formData.dropoffLocation) newErrors.dropoffLocation = 'Lieu de restitution requis';
    if (!formData.pickupDate) newErrors.pickupDate = 'Date de prise en charge requise';
    if (!formData.dropoffDate) newErrors.dropoffDate = 'Date de restitution requise';
    if (formData.dropoffDate && new Date(formData.dropoffDate) <= new Date(formData.pickupDate)) {
      newErrors.dropoffDate = 'La date de restitution doit être après la date de prise en charge';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitQuote = trpc.quotes.submit.useMutation({
    onSuccess: () => {
      toast.success('Votre demande de devis a été envoyée ! Nous vous répondrons sous 24h.');
      if (onSubmit) { onSubmit(formData); } else { window.location.href = '/thank-you'; }
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
      destination: formData.pickupLocation ? `${formData.pickupLocation} → ${formData.dropoffLocation}` : undefined,
      departureDate: formData.pickupDate || undefined,
      returnDate: formData.dropoffDate || undefined,
      passengers: parseInt(formData.drivers) || 1,
      serviceType: 'voiture',
      message: formData.message || undefined,
      source: 'website',
    });
  };

  const _handleSubmitOld = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      sessionStorage.setItem('quoteData', JSON.stringify({ ...formData, serviceType: 'car' }));
      if (onSubmit) { onSubmit(formData); } else { window.location.href = '/thank-you'; }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service Type Badge */}
      <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <Car className="w-5 h-5 text-purple-500" />
        <span className="font-semibold text-purple-900 dark:text-purple-300">Demande de Devis - Location de Voiture</span>
      </div>

      {/* Personal Info Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Vos Informations</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prénom *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Jean"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600' }`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Dupont"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600' }`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jean@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600' }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+224 XXX XXX XXX"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600' }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Car Rental Details Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Détails de la Location</h3>
        
        {/* Locations */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lieu de Prise en Charge *</label>
            <CityCombobox
              value={formData.pickupLocation}
              onChange={(val) => {
                setFormData(prev => ({ ...prev, pickupLocation: val }));
                if (errors.pickupLocation) setErrors(prev => ({ ...prev, pickupLocation: '' }));
              }}
              placeholder="Ex: Conakry, Dakar, Abidjan..."
              cities={majorCities}
              error={errors.pickupLocation}
            />
            {errors.pickupLocation && <p className="text-red-500 text-xs mt-1">{errors.pickupLocation}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lieu de Restitution *</label>
            <CityCombobox
              value={formData.dropoffLocation}
              onChange={(val) => {
                setFormData(prev => ({ ...prev, dropoffLocation: val }));
                if (errors.dropoffLocation) setErrors(prev => ({ ...prev, dropoffLocation: '' }));
              }}
              placeholder="Ex: Conakry, Kindia, Labé..."
              cities={majorCities}
              error={errors.dropoffLocation}
            />
            {errors.dropoffLocation && <p className="text-red-500 text-xs mt-1">{errors.dropoffLocation}</p>}
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de Prise en Charge *</label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.pickupDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600' }`}
            />
            {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date de Restitution *</label>
            <input
              type="date"
              name="dropoffDate"
              value={formData.dropoffDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.dropoffDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600' }`}
            />
            {errors.dropoffDate && <p className="text-red-500 text-xs mt-1">{errors.dropoffDate}</p>}
          </div>
        </div>

        {/* Car Type & Drivers */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type de Véhicule *</label>
            <select
              name="carType"
              value={formData.carType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {carTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de Conducteurs *</label>
            <select
              name="drivers"
              value={formData.drivers}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {[1, 2, 3, 4].map(n => (
                <option key={n} value={n}>{n} conducteur{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget Estimé par Jour (USD) *</label>
          <input
            type="number"
            name="estimatedBudget"
            value={formData.estimatedBudget}
            onChange={handleChange}
            placeholder="50"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message Spécial (optionnel)</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Demandes spéciales, équipements souhaités (GPS, siège bébé, etc.)..."
          rows={4}
          className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Reassurance */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-700 dark:text-green-400">
        ✓ Gratuit et sans engagement • Réponse garantie sous 24h
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          '🚗 OBTENIR MON DEVIS VOITURE'
        )}
      </Button>
    </form>
  );
}
