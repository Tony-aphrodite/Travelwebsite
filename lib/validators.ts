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

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
});
