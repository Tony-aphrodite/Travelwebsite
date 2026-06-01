import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'Minimo 6 caracteres'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Minimo 2 caracteres'),
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'Minimo 6 caracteres'),
});

export const addToCartSchema = z.object({
  type: z.enum(['hotel', 'villa', 'package', 'flight', 'car', 'activity']),
  itemId: z.string().min(1),
  itemName: z.string().min(1),
  itemImage: z.string().url(),
  unitPrice: z.number().positive(),
  quantity: z.number().int().positive().default(1),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().int().positive().optional(),
});

export const bookingSchema = z.object({
  type: z.enum(['hotel', 'villa', 'package', 'flight', 'car', 'activity']),
  itemId: z.string().min(1),
  itemName: z.string().min(1),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().int().positive().default(1),
  quantity: z.number().int().positive().default(1),
  unitPrice: z.number().positive(),
  promoCode: z.string().optional(),
});

export const reviewSchema = z.object({
  type: z.enum(['hotel', 'villa', 'package', 'flight', 'car', 'activity']),
  itemId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  text: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email('Email invalido'),
});

export const hotelFilterSchema = z.object({
  country: z.string().optional(),
  priceMin: z.coerce.number().optional(),
  priceMax: z.coerce.number().optional(),
  stars: z.string().optional().transform((v) => v ? v.split(',').map(Number) : undefined),
  amenity: z.string().optional(),
  sort: z.string().optional(),
  q: z.string().optional(),
});

export const adminHotelSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(120),
  location: z.string().min(2).max(120),
  country: z.string().min(2).max(80),
  image: z.string().url(),
  gallery: z.array(z.string().url()).optional().default([]),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().min(0).optional().default(0),
  ratingLabel: z.string().max(80),
  stars: z.number().int().min(1).max(5),
  price: z.number().int().positive(),
  oldPrice: z.number().int().positive().nullable().optional(),
  description: z.string().min(10),
  amenities: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  lat: z.number().nullable().optional(),
  lng: z.number().nullable().optional(),
  isActive: z.boolean().optional().default(true),
});

export const adminPackageSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2).max(160),
  destination: z.string().min(2).max(120),
  image: z.string().url(),
  duration: z.string().max(60),
  includes: z.array(z.string()).optional().default([]),
  price: z.number().int().positive(),
  oldPrice: z.number().int().min(0),
  badge: z.string().max(60),
  description: z.string().min(10),
  isActive: z.boolean().optional().default(true),
});

export const adminBlogSchema = z.object({
  slug: z.string().min(2).max(160),
  title: z.string().min(2).max(200),
  excerpt: z.string().min(10).max(500),
  content: z.string().optional(),
  category: z.string().max(60),
  readTime: z.string().max(20),
  image: z.string().url(),
  author: z.string().min(2).max(100),
  authorId: z.string().optional(),
  publishedAt: z.coerce.date().optional(),
  isPublished: z.boolean().optional().default(false),
});

export const adminActivitySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2).max(160),
  location: z.string().min(2).max(120),
  image: z.string().url(),
  duration: z.string().max(60),
  price: z.number().int().positive(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().min(0).optional().default(0),
  category: z.string().max(60),
  description: z.string().min(10),
  lat: z.number().nullable().optional(),
  lng: z.number().nullable().optional(),
  isActive: z.boolean().optional().default(true),
});

export const profileUpdateSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().max(40).optional().nullable(),
  country: z.string().max(80).optional().nullable(),
});

export const consultationSchema = z.object({
  region: z.enum(['us', 'canada', 'europa']),
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().max(40).optional().nullable(),
  preferredDate: z.string().refine(
    (v) => !Number.isNaN(new Date(v).getTime()),
    'Fecha invalida'
  ),
  preferredTimeSlot: z.enum(['morning', 'afternoon', 'evening']),
  topic: z.string().min(10).max(2000),
});

export const consultationStatusUpdateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
  notes: z.string().max(2000).optional(),
});

export const adminFlightSchema = z.object({
  id: z.string().min(1),
  airline: z.string().min(2).max(80),
  airlineCode: z.string().min(1).max(8),
  fromCode: z.string().min(2).max(8),
  toCode: z.string().min(2).max(8),
  fromCity: z.string().min(2).max(80),
  toCity: z.string().min(2).max(80),
  departure: z.string().min(2).max(40),
  arrival: z.string().min(2).max(40),
  duration: z.string().min(1).max(40),
  stops: z.number().int().min(0).max(5).default(0),
  stopInfo: z.string().max(120).default(''),
  price: z.number().int().positive(),
  cabin: z.string().min(2).max(40),
  isActive: z.boolean().optional().default(true),
});

export const adminVillaSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(120),
  location: z.string().min(2).max(120),
  country: z.string().min(2).max(80),
  image: z.string().url(),
  gallery: z.array(z.string().url()).optional().default([]),
  guests: z.number().int().positive(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  price: z.number().int().positive(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().min(0).optional().default(0),
  description: z.string().min(10),
  amenities: z.array(z.string()).optional().default([]),
  lat: z.number().nullable().optional(),
  lng: z.number().nullable().optional(),
  isActive: z.boolean().optional().default(true),
});

export const adminCarSchema = z.object({
  id: z.string().min(1),
  model: z.string().min(2).max(120),
  category: z.string().min(2).max(60),
  image: z.string().url(),
  company: z.string().min(2).max(80),
  seats: z.number().int().positive(),
  transmission: z.string().min(2).max(40),
  fuel: z.string().min(2).max(40),
  price: z.number().int().positive(),
  features: z.array(z.string()).optional().default([]),
  isActive: z.boolean().optional().default(true),
});

export const adminDestinationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(120),
  country: z.string().min(2).max(80),
  image: z.string().url(),
  priceFrom: z.number().int().positive(),
  tagline: z.string().min(2).max(200),
  lat: z.number().nullable().optional(),
  lng: z.number().nullable().optional(),
});

export const adminTestimonialSchema = z.object({
  name: z.string().min(2).max(80),
  trip: z.string().min(2).max(120),
  avatar: z.string().url(),
  text: z.string().min(10).max(800),
  isActive: z.boolean().optional().default(true),
});

export const adminPromoSchema = z.object({
  code: z.string().min(2).max(40),
  discountPercent: z.number().int().min(1).max(100),
  maxUses: z.number().int().positive().nullable().optional(),
  expiresAt: z.coerce.date().nullable().optional(),
  isActive: z.boolean().optional().default(true),
});

export const adminSettingsSchema = z.object({
  taxRate: z.number().int().min(0).max(100),
  memberDiscountPercent: z.number().int().min(0).max(50),
  currency: z.string().min(2).max(8),
  loyaltyPointsPerDollar: z.number().int().min(0).max(100),
  silverThreshold: z.number().int().min(0),
  roseGoldThreshold: z.number().int().min(0),
  platinumThreshold: z.number().int().min(0),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(3).max(40),
  whatsappNumber: z.string().min(3).max(40),
  bookingEmailSubject: z.string().min(3).max(120),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  lastName: z.string().max(80).optional().default(''),
  email: z.string().email(),
  phone: z.string().max(40).optional().default(''),
  reason: z.string().max(80).optional().default('Consulta general'),
  subject: z.string().max(120).optional().default(''),
  message: z.string().min(10).max(4000),
});
