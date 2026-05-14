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

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  lastName: z.string().max(80).optional().default(''),
  email: z.string().email(),
  phone: z.string().max(40).optional().default(''),
  reason: z.string().max(80).optional().default('Consulta general'),
  subject: z.string().max(120).optional().default(''),
  message: z.string().min(10).max(4000),
});
