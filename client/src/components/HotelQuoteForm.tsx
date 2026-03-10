import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Hotel } from 'lucide-react';
import { majorCities, starRatings } from '@/data/serviceTypes';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import CityCombobox from '@/components/CityCombobox';

/**
 * Hotel Quote Form - KHAMCI VOYAGES
 * Formulaire spécialisé pour les demandes de devis d'hôtels
 * Inspiré de Booking.com - Destination, dates, chambres, voyageurs
 */

interface HotelQuoteFormProps {
  onSubmit?: (data: any) => void;
  onClose?: () => void;
}

export default function HotelQuoteForm({ onSubmit, onClose }: HotelQuoteFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: '',
    checkInDate: '',
    checkOutDate: '',
    rooms: '1',
    guests: '1',
    starRating: '',
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
    if (!formData.destination) newErrors.destination = 'Destination requise';
    if (!formData.checkInDate) newErrors.checkInDate = 'Date d\'arrivée requise';
    if (!formData.checkOutDate) newErrors.checkOutDate = 'Date de départ requise';
    if (formData.checkOutDate && new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
      newErrors.checkOutDate = 'La date de départ doit être après la date d\'arrivée';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitQuote = trpc.quotes.submit.useMutation({
    onSuccess: () => {
      toast.success('Votre demande de devis a été envoyée ! Nous vous répondrons sous 24h.');
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
      destination: formData.destination || undefined,
      departureDate: formData.checkInDate || undefined,
      returnDate: formData.checkOutDate || undefined,
      passengers: parseInt(formData.guests) || 1,
      serviceType: 'hotel',
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
      sessionStorage.setItem('quoteData', JSON.stringify({ ...formData, serviceType: 'hotel' }));
      if (onSubmit) { onSubmit(formData); } else { window.location.href = '/thank-you'; }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service Type Badge */}
      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
        <Hotel className="w-5 h-5 text-blue-500" />
        <span className="font-semibold text-blue-900">Demande de Devis - Hôtel</span>
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
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Hotel Details Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Détails de l'Hôtel</h3>
        
        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
          <CityCombobox
            value={formData.destination}
            onChange={(val) => {
              setFormData(prev => ({ ...prev, destination: val }));
              if (errors.destination) setErrors(prev => ({ ...prev, destination: '' }));
            }}
            placeholder="Ex: Paris, Dubaï, Conakry..."
            cities={majorCities}
            error={errors.destination}
          />
          {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date d'Arrivée *</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.checkInDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.checkInDate && <p className="text-red-500 text-xs mt-1">{errors.checkInDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de Départ *</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.checkOutDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.checkOutDate && <p className="text-red-500 text-xs mt-1">{errors.checkOutDate}</p>}
          </div>
        </div>

        {/* Rooms & Guests */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Chambres *</label>
            <select
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} chambre{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Voyageurs *</label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <option key={n} value={n}>{n} voyageur{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie d'Hôtel (optionnel)</label>
          <div className="grid grid-cols-3 gap-2">
            {starRatings.map(rating => (
              <label key={rating.value} className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                <input
                  type="radio"
                  name="starRating"
                  value={rating.value}
                  checked={formData.starRating === rating.value}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-sm text-gray-700">{rating.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget Estimé par Nuit (USD) *</label>
          <input
            type="number"
            name="estimatedBudget"
            value={formData.estimatedBudget}
            onChange={handleChange}
            placeholder="150"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          placeholder="Demandes spéciales, équipements souhaités, régime alimentaire..."
          rows={4}
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 rounded-lg transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          '🏨 OBTENIR MON DEVIS HÔTEL'
        )}
      </Button>
    </form>
  );
}
