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
  // Guinée (départ principal)
  'Conakry (CKY)',

  // Afrique de l'Ouest
  'Dakar (DSS)',
  'Abidjan (ABJ)',
  'Bamako (BKO)',
  'Banjul (BJL)',
  'Bissau (OXB)',
  'Freetown (FNA)',
  'Monrovia (ROB)',
  'Nouakchott (NKC)',
  'Accra (ACC)',
  'Lagos (LOS)',

  // Afrique du Nord
  'Casablanca (CMN)',
  'Marrakech (RAK)',
  'Tunis (TUN)',
  'Le Caire (CAI)',
  'Alger (ALG)',

  // Europe
  'Paris (CDG)',
  'Paris Orly (ORY)',
  'Bruxelles (BRU)',
  'Londres (LHR)',
  'Francfort (FRA)',
  'Genève (GVA)',
  'Madrid (MAD)',
  'Amsterdam (AMS)',

  // Moyen-Orient
  'Dubaï (DXB)',
  'Istanbul (IST)',
  'Doha (DOH)',
  'Jeddah (JED)',
  'Riyad (RUH)',

  // Amérique du Nord
  'New York (JFK)',
  'Montréal (YUL)',
  'Toronto (YYZ)',
  'Washington (IAD)',

  // Asie
  'Bangkok (BKK)',
  'Hong Kong (HKG)',
  'Tokyo (NRT)',
  'Pékin (PEK)',
];
