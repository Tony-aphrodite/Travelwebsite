export type Panel =
  | 'dashboard' | 'reservas'
  | 'hoteles' | 'paquetes' | 'vuelos' | 'villas' | 'autos' | 'actividades' | 'cruceros'
  | 'destinos' | 'blog' | 'testimonials'
  | 'consultas' | 'newsletter' | 'promos'
  | 'usuarios' | 'reportes' | 'settings';

export type HotelRow = {
  id: string; name: string; location: string; country: string; image: string;
  price: number; oldPrice?: number | null; rating: number; stars: number;
  description?: string; ratingLabel?: string;
};

export type PackageRow = {
  id: string; title: string; destination: string; image: string;
  duration: string; price: number; oldPrice: number;
  badge?: string; description?: string;
};

export type FlightRow = {
  id: string; airline: string; airlineCode: string;
  fromCode: string; toCode: string; fromCity: string; toCity: string;
  departure: string; arrival: string; duration: string;
  stops: number; stopInfo: string; price: number; cabin: string; isActive: boolean;
};

export type VillaRow = {
  id: string; name: string; location: string; country: string; image: string;
  guests: number; bedrooms: number; bathrooms: number;
  price: number; rating: number; reviewCount?: number; description: string;
  isActive: boolean;
};

export type CarRow = {
  id: string; model: string; category: string; image: string; company: string;
  seats: number; transmission: string; fuel: string; price: number;
  isActive: boolean;
};

export type CruiseRow = {
  id: string; name: string; cruiseLine: string; ship: string; image: string;
  departurePort: string; destinations?: string[];
  duration: string; nights: number;
  price: number; oldPrice?: number | null;
  rating: number; reviewCount?: number;
  description: string; isActive: boolean;
};

export type ActivityRow = {
  id: string; title: string; location: string; image: string;
  duration: string; price: number; rating: number; reviewCount?: number;
  category: string; description: string; isActive: boolean;
};

export type DestinationRow = {
  id: string; name: string; country: string; image: string;
  priceFrom: number; tagline: string;
};

export type BlogRow = {
  id: number; slug: string; title: string; excerpt: string; content?: string;
  category: string; readTime: string; image: string; author: string;
  isPublished: boolean; publishedAt?: string | null;
};

export type TestimonialRow = {
  id: number; name: string; trip: string; avatar: string; text: string; isActive: boolean;
};

export type ConsultRow = {
  id: number; region: 'us' | 'canada' | 'europa';
  name: string; email: string; phone?: string | null;
  preferredDate: string; preferredTimeSlot: string; topic: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string | null; createdAt: string;
};

export type NewsletterRow = { id: number; email: string; subscribedAt: string; isActive: boolean };

export type PromoRow = {
  id: number; code: string; discountPercent: number;
  maxUses?: number | null; currentUses: number;
  expiresAt?: string | null; isActive: boolean;
};

export type Booking = {
  id: string; type: string; itemName: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  checkIn: string | null; checkOut: string | null;
  guests: number; total: number; createdAt: string;
  userName: string | null; userEmail: string | null;
};

export type UserRow = {
  id: string; name: string | null; email: string;
  role: 'user' | 'admin';
  loyaltyTier: string; loyaltyPoints: number; createdAt: string;
};

export type Stats = { hotels: number; bookings: number; users: number; revenue: number };

export type SiteSettings = {
  taxRate: number;
  memberDiscountPercent: number;
  currency: string;
  loyaltyPointsPerDollar: number;
  silverThreshold: number;
  roseGoldThreshold: number;
  platinumThreshold: number;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  bookingEmailSubject: string;
};
