/**
 * Types et données pour les formulaires spécialisés par service
 * KHAMCI VOYAGES - Formulaires de devis optimisés
 */

export type ServiceType = 'flights' | 'hotel' | 'car' | 'visa' | 'tour' | 'custom';

export interface FlightFormData {
  // Passenger Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Flight Details
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: 'economy' | 'business' | 'first';
  airlines: string[];
  estimatedBudget: number;
  message?: string;
}

export interface HotelFormData {
  // Passenger Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Hotel Details
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  guests: number;
  starRating?: '3' | '4' | '5';
  estimatedBudget: number;
  message?: string;
}

export interface CarFormData {
  // Passenger Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Car Rental Details
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  carType: 'economy' | 'compact' | 'sedan' | 'suv' | 'luxury';
  drivers: number;
  estimatedBudget: number;
  message?: string;
}

export const cabinClasses = [
  { value: 'economy', label: 'Économique' },
  { value: 'business', label: 'Affaires' },
  { value: 'first', label: 'Première Classe' },
];

export const carTypes = [
  { value: 'economy', label: 'Économique' },
  { value: 'compact', label: 'Compacte' },
  { value: 'sedan', label: 'Berline' },
  { value: 'suv', label: 'SUV' },
  { value: 'luxury', label: 'Luxe' },
];

export const starRatings = [
  { value: '3', label: '3 Étoiles' },
  { value: '4', label: '4 Étoiles' },
  { value: '5', label: '5 Étoiles' },
];

export const majorAirlines = [
  'Air France',
  'Brussels Airlines',
  'Turkish Airlines',
  'Emirates',
  'Qatar Airways',
  'Royal Air Maroc',
  'Ethiopian Airlines',
  'Pas de préférence',
];

export const majorCities = [
  'Paris (CDG)',
  'Bangkok (BKK)',
  'New York (JFK)',
  'Dakar (DSS)',
  'Abidjan (ABJ)',
  'Accra (ACC)',
  'Lagos (LOS)',
  'Casablanca (CMN)',
  'Marrakech (RAK)',
  'Tunis (TUN)',
];
