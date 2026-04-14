import {
  pgTable, pgEnum, text, integer, real, boolean, timestamp, jsonb, serial,
  uniqueIndex, index,
} from 'drizzle-orm/pg-core';

// ─── ENUMS ──────────────────────────────────────────
export const bookingStatusEnum = pgEnum('booking_status', [
  'pending', 'confirmed', 'cancelled', 'completed',
]);
export const bookingTypeEnum = pgEnum('booking_type', [
  'hotel', 'villa', 'package', 'flight', 'car', 'activity',
]);
export const loyaltyTierEnum = pgEnum('loyalty_tier', [
  'silver', 'rose_gold', 'platinum',
]);
export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);

// ─── AUTH (Auth.js v5) ──────────────────────────────
export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique().notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  hashedPassword: text('hashed_password'),
  role: userRoleEnum('role').default('user').notNull(),
  phone: text('phone'),
  country: text('country'),
  loyaltyTier: loyaltyTierEnum('loyalty_tier').default('silver').notNull(),
  loyaltyPoints: integer('loyalty_points').default(0).notNull(),
  memberSince: timestamp('member_since', { mode: 'date' }).defaultNow(),
  stripeCustomerId: text('stripe_customer_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
}, (t) => [uniqueIndex('vt_identifier_token').on(t.identifier, t.token)]);

// ─── DESTINATIONS ───────────────────────────────────
export const destinations = pgTable('destinations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  country: text('country').notNull(),
  image: text('image').notNull(),
  priceFrom: integer('price_from').notNull(),
  tagline: text('tagline').notNull(),
  lat: real('lat'),
  lng: real('lng'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [index('dest_country_idx').on(t.country)]);

// ─── HOTELS ─────────────────────────────────────────
export const hotels = pgTable('hotels', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  location: text('location').notNull(),
  country: text('country').notNull(),
  image: text('image').notNull(),
  gallery: jsonb('gallery').$type<string[]>().default([]),
  rating: real('rating').notNull(),
  reviewCount: integer('review_count').default(0).notNull(),
  ratingLabel: text('rating_label').notNull(),
  stars: integer('stars').notNull(),
  price: integer('price').notNull(),
  oldPrice: integer('old_price'),
  description: text('description').notNull(),
  amenities: jsonb('amenities').$type<string[]>().default([]),
  tags: jsonb('tags').$type<string[]>().default([]),
  lat: real('lat'),
  lng: real('lng'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => [
  index('hotel_country_idx').on(t.country),
  index('hotel_price_idx').on(t.price),
  index('hotel_stars_idx').on(t.stars),
]);

// ─── FLIGHTS ────────────────────────────────────────
export const flights = pgTable('flights', {
  id: text('id').primaryKey(),
  airline: text('airline').notNull(),
  airlineCode: text('airline_code').notNull(),
  fromCode: text('from_code').notNull(),
  toCode: text('to_code').notNull(),
  fromCity: text('from_city').notNull(),
  toCity: text('to_city').notNull(),
  departure: text('departure').notNull(),
  arrival: text('arrival').notNull(),
  duration: text('duration').notNull(),
  stops: integer('stops').default(0).notNull(),
  stopInfo: text('stop_info').notNull(),
  price: integer('price').notNull(),
  cabin: text('cabin').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  index('flight_price_idx').on(t.price),
]);

// ─── VILLAS ─────────────────────────────────────────
export const villas = pgTable('villas', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  location: text('location').notNull(),
  country: text('country').notNull(),
  image: text('image').notNull(),
  gallery: jsonb('gallery').$type<string[]>().default([]),
  guests: integer('guests').notNull(),
  bedrooms: integer('bedrooms').notNull(),
  bathrooms: integer('bathrooms').notNull(),
  price: integer('price').notNull(),
  rating: real('rating').notNull(),
  reviewCount: integer('review_count').default(0).notNull(),
  description: text('description').notNull(),
  amenities: jsonb('amenities').$type<string[]>().default([]),
  lat: real('lat'),
  lng: real('lng'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── PACKAGES ───────────────────────────────────────
export const packages = pgTable('packages', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  destination: text('destination').notNull(),
  image: text('image').notNull(),
  duration: text('duration').notNull(),
  includes: jsonb('includes').$type<string[]>().default([]),
  price: integer('price').notNull(),
  oldPrice: integer('old_price').notNull(),
  badge: text('badge').notNull(),
  description: text('description').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── CARS ───────────────────────────────────────────
export const cars = pgTable('cars', {
  id: text('id').primaryKey(),
  model: text('model').notNull(),
  category: text('category').notNull(),
  image: text('image').notNull(),
  company: text('company').notNull(),
  seats: integer('seats').notNull(),
  transmission: text('transmission').notNull(),
  fuel: text('fuel').notNull(),
  price: integer('price').notNull(),
  features: jsonb('features').$type<string[]>().default([]),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── ACTIVITIES ─────────────────────────────────────
export const activities = pgTable('activities', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  location: text('location').notNull(),
  image: text('image').notNull(),
  duration: text('duration').notNull(),
  price: integer('price').notNull(),
  rating: real('rating').notNull(),
  reviewCount: integer('review_count').default(0).notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  lat: real('lat'),
  lng: real('lng'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => [index('activity_category_idx').on(t.category)]);

// ─── BLOG POSTS ─────────────────────────────────────
export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content'),
  category: text('category').notNull(),
  readTime: text('read_time').notNull(),
  image: text('image').notNull(),
  author: text('author').notNull(),
  authorId: text('author_id').references(() => users.id),
  publishedAt: timestamp('published_at', { mode: 'date' }),
  isPublished: boolean('is_published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => [
  index('blog_slug_idx').on(t.slug),
  index('blog_category_idx').on(t.category),
]);

// ─── TESTIMONIALS ───────────────────────────────────
export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  trip: text('trip').notNull(),
  avatar: text('avatar').notNull(),
  text: text('text').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
});

// ─── BOOKINGS ───────────────────────────────────────
export const bookings = pgTable('bookings', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id),
  type: bookingTypeEnum('type').notNull(),
  itemId: text('item_id').notNull(),
  itemName: text('item_name').notNull(),
  status: bookingStatusEnum('status').default('pending').notNull(),
  checkIn: timestamp('check_in', { mode: 'date' }),
  checkOut: timestamp('check_out', { mode: 'date' }),
  guests: integer('guests').default(1).notNull(),
  quantity: integer('quantity').default(1).notNull(),
  unitPrice: integer('unit_price').notNull(),
  subtotal: integer('subtotal').notNull(),
  taxes: integer('taxes').notNull(),
  discount: integer('discount').default(0).notNull(),
  total: integer('total').notNull(),
  pointsEarned: integer('points_earned').default(0).notNull(),
  pointsRedeemed: integer('points_redeemed').default(0).notNull(),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  stripeSessionId: text('stripe_session_id'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => [
  index('booking_user_idx').on(t.userId),
  index('booking_status_idx').on(t.status),
]);

// ─── CART ───────────────────────────────────────────
export const cartItems = pgTable('cart_items', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: bookingTypeEnum('type').notNull(),
  itemId: text('item_id').notNull(),
  itemName: text('item_name').notNull(),
  itemImage: text('item_image').notNull(),
  unitPrice: integer('unit_price').notNull(),
  quantity: integer('quantity').default(1).notNull(),
  checkIn: text('check_in'),
  checkOut: text('check_out'),
  guests: integer('guests').default(1),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [index('cart_user_idx').on(t.userId)]);

// ─── FAVORITES ──────────────────────────────────────
export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: bookingTypeEnum('type').notNull(),
  itemId: text('item_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  uniqueIndex('fav_unique_idx').on(t.userId, t.type, t.itemId),
]);

// ─── POINTS LEDGER ──────────────────────────────────
export const pointsLedger = pgTable('points_ledger', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  bookingId: text('booking_id').references(() => bookings.id),
  points: integer('points').notNull(),
  reason: text('reason').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── REVIEWS ────────────────────────────────────────
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  type: bookingTypeEnum('type').notNull(),
  itemId: text('item_id').notNull(),
  rating: integer('rating').notNull(),
  text: text('text'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── PROMO CODES ────────────────────────────────────
export const promoCodes = pgTable('promo_codes', {
  id: serial('id').primaryKey(),
  code: text('code').unique().notNull(),
  discountPercent: integer('discount_percent').notNull(),
  maxUses: integer('max_uses'),
  currentUses: integer('current_uses').default(0).notNull(),
  expiresAt: timestamp('expires_at', { mode: 'date' }),
  isActive: boolean('is_active').default(true).notNull(),
});

// ─── NEWSLETTER ─────────────────────────────────────
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  subscribedAt: timestamp('subscribed_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
});
