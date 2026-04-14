import { db } from './index';
import * as schema from './schema';
import { eq, and, gte, lte, like, ilike, desc, asc, sql, inArray } from 'drizzle-orm';

// ─── DESTINATIONS ───────────────────────────────────
export async function getDestinations() {
  return db.select().from(schema.destinations).orderBy(schema.destinations.name);
}

export async function getDestinationById(id: string) {
  const rows = await db.select().from(schema.destinations).where(eq(schema.destinations.id, id));
  return rows[0] ?? null;
}

// ─── HOTELS ─────────────────────────────────────────
export type HotelFilters = {
  country?: string;
  priceMin?: number;
  priceMax?: number;
  stars?: number[];
  amenity?: string;
  sort?: string;
  q?: string;
};

export async function getHotels(filters: HotelFilters = {}) {
  const conditions = [eq(schema.hotels.isActive, true)];

  if (filters.country) {
    conditions.push(eq(schema.hotels.country, filters.country));
  }
  if (filters.priceMin !== undefined) {
    conditions.push(gte(schema.hotels.price, filters.priceMin));
  }
  if (filters.priceMax !== undefined) {
    conditions.push(lte(schema.hotels.price, filters.priceMax));
  }
  if (filters.stars && filters.stars.length > 0) {
    conditions.push(inArray(schema.hotels.stars, filters.stars));
  }
  if (filters.q) {
    conditions.push(
      sql`(${schema.hotels.name} ILIKE ${'%' + filters.q + '%'} OR ${schema.hotels.location} ILIKE ${'%' + filters.q + '%'} OR ${schema.hotels.description} ILIKE ${'%' + filters.q + '%'})`
    );
  }

  let orderBy;
  switch (filters.sort) {
    case 'price-asc':
      orderBy = asc(schema.hotels.price);
      break;
    case 'price-desc':
      orderBy = desc(schema.hotels.price);
      break;
    case 'rating':
      orderBy = desc(schema.hotels.rating);
      break;
    default:
      orderBy = desc(schema.hotels.rating);
  }

  return db.select().from(schema.hotels).where(and(...conditions)).orderBy(orderBy);
}

export async function getHotelById(id: string) {
  const rows = await db.select().from(schema.hotels).where(eq(schema.hotels.id, id));
  return rows[0] ?? null;
}

// ─── FLIGHTS ────────────────────────────────────────
export type FlightFilters = {
  fromCity?: string;
  toCity?: string;
  priceMin?: number;
  priceMax?: number;
  stops?: number;
  sort?: string;
};

export async function getFlights(filters: FlightFilters = {}) {
  const conditions = [eq(schema.flights.isActive, true)];

  if (filters.fromCity) {
    conditions.push(ilike(schema.flights.fromCity, `%${filters.fromCity}%`));
  }
  if (filters.toCity) {
    conditions.push(ilike(schema.flights.toCity, `%${filters.toCity}%`));
  }
  if (filters.priceMin !== undefined) {
    conditions.push(gte(schema.flights.price, filters.priceMin));
  }
  if (filters.priceMax !== undefined) {
    conditions.push(lte(schema.flights.price, filters.priceMax));
  }
  if (filters.stops !== undefined) {
    conditions.push(eq(schema.flights.stops, filters.stops));
  }

  let orderBy;
  switch (filters.sort) {
    case 'price-asc': orderBy = asc(schema.flights.price); break;
    case 'price-desc': orderBy = desc(schema.flights.price); break;
    default: orderBy = asc(schema.flights.price);
  }

  return db.select().from(schema.flights).where(and(...conditions)).orderBy(orderBy);
}

// ─── VILLAS ─────────────────────────────────────────
export type VillaFilters = {
  country?: string;
  priceMin?: number;
  priceMax?: number;
  guests?: number;
  sort?: string;
  q?: string;
};

export async function getVillas(filters: VillaFilters = {}) {
  const conditions = [eq(schema.villas.isActive, true)];

  if (filters.country) {
    conditions.push(eq(schema.villas.country, filters.country));
  }
  if (filters.priceMin !== undefined) {
    conditions.push(gte(schema.villas.price, filters.priceMin));
  }
  if (filters.priceMax !== undefined) {
    conditions.push(lte(schema.villas.price, filters.priceMax));
  }
  if (filters.guests !== undefined) {
    conditions.push(gte(schema.villas.guests, filters.guests));
  }
  if (filters.q) {
    conditions.push(
      sql`(${schema.villas.name} ILIKE ${'%' + filters.q + '%'} OR ${schema.villas.location} ILIKE ${'%' + filters.q + '%'})`
    );
  }

  let orderBy;
  switch (filters.sort) {
    case 'price-asc': orderBy = asc(schema.villas.price); break;
    case 'price-desc': orderBy = desc(schema.villas.price); break;
    case 'rating': orderBy = desc(schema.villas.rating); break;
    default: orderBy = desc(schema.villas.rating);
  }

  return db.select().from(schema.villas).where(and(...conditions)).orderBy(orderBy);
}

export async function getVillaById(id: string) {
  const rows = await db.select().from(schema.villas).where(eq(schema.villas.id, id));
  return rows[0] ?? null;
}

// ─── PACKAGES ───────────────────────────────────────
export type PackageFilters = {
  destination?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: string;
};

export async function getPackages(filters: PackageFilters = {}) {
  const conditions = [eq(schema.packages.isActive, true)];

  if (filters.destination) {
    conditions.push(ilike(schema.packages.destination, `%${filters.destination}%`));
  }
  if (filters.priceMin !== undefined) {
    conditions.push(gte(schema.packages.price, filters.priceMin));
  }
  if (filters.priceMax !== undefined) {
    conditions.push(lte(schema.packages.price, filters.priceMax));
  }

  let orderBy;
  switch (filters.sort) {
    case 'price-asc': orderBy = asc(schema.packages.price); break;
    case 'price-desc': orderBy = desc(schema.packages.price); break;
    default: orderBy = asc(schema.packages.price);
  }

  return db.select().from(schema.packages).where(and(...conditions)).orderBy(orderBy);
}

// ─── CARS ───────────────────────────────────────────
export type CarFilters = {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  transmission?: string;
  sort?: string;
};

export async function getCars(filters: CarFilters = {}) {
  const conditions = [eq(schema.cars.isActive, true)];

  if (filters.category) {
    conditions.push(eq(schema.cars.category, filters.category));
  }
  if (filters.priceMin !== undefined) {
    conditions.push(gte(schema.cars.price, filters.priceMin));
  }
  if (filters.priceMax !== undefined) {
    conditions.push(lte(schema.cars.price, filters.priceMax));
  }
  if (filters.transmission) {
    conditions.push(eq(schema.cars.transmission, filters.transmission));
  }

  let orderBy;
  switch (filters.sort) {
    case 'price-asc': orderBy = asc(schema.cars.price); break;
    case 'price-desc': orderBy = desc(schema.cars.price); break;
    default: orderBy = asc(schema.cars.price);
  }

  return db.select().from(schema.cars).where(and(...conditions)).orderBy(orderBy);
}

// ─── ACTIVITIES ─────────────────────────────────────
export type ActivityFilters = {
  category?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: string;
};

export async function getActivities(filters: ActivityFilters = {}) {
  const conditions = [eq(schema.activities.isActive, true)];

  if (filters.category) {
    conditions.push(eq(schema.activities.category, filters.category));
  }
  if (filters.location) {
    conditions.push(ilike(schema.activities.location, `%${filters.location}%`));
  }
  if (filters.priceMin !== undefined) {
    conditions.push(gte(schema.activities.price, filters.priceMin));
  }
  if (filters.priceMax !== undefined) {
    conditions.push(lte(schema.activities.price, filters.priceMax));
  }

  let orderBy;
  switch (filters.sort) {
    case 'price-asc': orderBy = asc(schema.activities.price); break;
    case 'price-desc': orderBy = desc(schema.activities.price); break;
    case 'rating': orderBy = desc(schema.activities.rating); break;
    default: orderBy = desc(schema.activities.rating);
  }

  return db.select().from(schema.activities).where(and(...conditions)).orderBy(orderBy);
}

// ─── BLOG ───────────────────────────────────────────
export type BlogFilters = {
  category?: string;
  q?: string;
};

export async function getBlogPosts(filters: BlogFilters = {}) {
  const conditions = [eq(schema.blogPosts.isPublished, true)];

  if (filters.category) {
    conditions.push(eq(schema.blogPosts.category, filters.category));
  }
  if (filters.q) {
    conditions.push(
      sql`(${schema.blogPosts.title} ILIKE ${'%' + filters.q + '%'} OR ${schema.blogPosts.excerpt} ILIKE ${'%' + filters.q + '%'})`
    );
  }

  return db.select().from(schema.blogPosts)
    .where(and(...conditions))
    .orderBy(desc(schema.blogPosts.publishedAt));
}

export async function getBlogPostBySlug(slug: string) {
  const rows = await db.select().from(schema.blogPosts)
    .where(and(eq(schema.blogPosts.slug, slug), eq(schema.blogPosts.isPublished, true)));
  return rows[0] ?? null;
}

// ─── TESTIMONIALS ───────────────────────────────────
export async function getTestimonials() {
  return db.select().from(schema.testimonials).where(eq(schema.testimonials.isActive, true));
}

// ─── CART ───────────────────────────────────────────
export async function getCartItems(userId: string) {
  return db.select().from(schema.cartItems)
    .where(eq(schema.cartItems.userId, userId))
    .orderBy(desc(schema.cartItems.createdAt));
}

export async function addCartItem(data: typeof schema.cartItems.$inferInsert) {
  return db.insert(schema.cartItems).values(data).returning();
}

export async function removeCartItem(id: number, userId: string) {
  return db.delete(schema.cartItems)
    .where(and(eq(schema.cartItems.id, id), eq(schema.cartItems.userId, userId)));
}

export async function clearCart(userId: string) {
  return db.delete(schema.cartItems).where(eq(schema.cartItems.userId, userId));
}

// ─── BOOKINGS ───────────────────────────────────────
export async function getUserBookings(userId: string) {
  return db.select().from(schema.bookings)
    .where(eq(schema.bookings.userId, userId))
    .orderBy(desc(schema.bookings.createdAt));
}

export async function createBooking(data: typeof schema.bookings.$inferInsert) {
  return db.insert(schema.bookings).values(data).returning();
}

export async function updateBookingStatus(
  id: string,
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
) {
  return db.update(schema.bookings)
    .set({ status, updatedAt: new Date() })
    .where(eq(schema.bookings.id, id))
    .returning();
}

// ─── FAVORITES ──────────────────────────────────────
export async function getUserFavorites(userId: string) {
  return db.select().from(schema.favorites)
    .where(eq(schema.favorites.userId, userId));
}

export async function toggleFavorite(
  userId: string,
  type: 'hotel' | 'villa' | 'package' | 'flight' | 'car' | 'activity',
  itemId: string
) {
  const existing = await db.select().from(schema.favorites)
    .where(and(
      eq(schema.favorites.userId, userId),
      eq(schema.favorites.type, type),
      eq(schema.favorites.itemId, itemId),
    ));

  if (existing.length > 0) {
    await db.delete(schema.favorites).where(eq(schema.favorites.id, existing[0].id));
    return { action: 'removed' as const };
  } else {
    await db.insert(schema.favorites).values({ userId, type, itemId });
    return { action: 'added' as const };
  }
}

// ─── LOYALTY ────────────────────────────────────────
export async function getUserPoints(userId: string) {
  const user = await db.select({
    points: schema.users.loyaltyPoints,
    tier: schema.users.loyaltyTier,
  }).from(schema.users).where(eq(schema.users.id, userId));
  return user[0] ?? null;
}

export async function getPointsHistory(userId: string) {
  return db.select().from(schema.pointsLedger)
    .where(eq(schema.pointsLedger.userId, userId))
    .orderBy(desc(schema.pointsLedger.createdAt));
}

export async function creditPoints(userId: string, points: number, reason: string, bookingId?: string) {
  await db.insert(schema.pointsLedger).values({
    userId,
    bookingId: bookingId ?? null,
    points,
    reason,
  });
  await db.update(schema.users)
    .set({
      loyaltyPoints: sql`${schema.users.loyaltyPoints} + ${points}`,
      updatedAt: new Date(),
    })
    .where(eq(schema.users.id, userId));

  // Recalculate tier
  const updated = await db.select({ points: schema.users.loyaltyPoints })
    .from(schema.users).where(eq(schema.users.id, userId));
  const totalPoints = updated[0]?.points ?? 0;
  const newTier = totalPoints >= 8000 ? 'platinum' : totalPoints >= 2000 ? 'rose_gold' : 'silver';
  await db.update(schema.users)
    .set({ loyaltyTier: newTier })
    .where(eq(schema.users.id, userId));
}

// ─── NEWSLETTER ─────────────────────────────────────
export async function subscribeNewsletter(email: string) {
  return db.insert(schema.newsletterSubscribers)
    .values({ email })
    .onConflictDoNothing()
    .returning();
}

// ─── REVIEWS ────────────────────────────────────────
export async function getReviewsForItem(type: string, itemId: string) {
  return db.select({
    id: schema.reviews.id,
    rating: schema.reviews.rating,
    text: schema.reviews.text,
    createdAt: schema.reviews.createdAt,
    userName: schema.users.name,
    userImage: schema.users.image,
  })
    .from(schema.reviews)
    .leftJoin(schema.users, eq(schema.reviews.userId, schema.users.id))
    .where(and(eq(schema.reviews.type, type as any), eq(schema.reviews.itemId, itemId)))
    .orderBy(desc(schema.reviews.createdAt));
}

// ─── ADMIN ──────────────────────────────────────────
export async function getAdminStats() {
  const [hotelCount] = await db.select({ count: sql<number>`count(*)` }).from(schema.hotels);
  const [bookingCount] = await db.select({ count: sql<number>`count(*)` }).from(schema.bookings);
  const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(schema.users);
  const [revenue] = await db.select({
    total: sql<number>`coalesce(sum(${schema.bookings.total}), 0)`,
  }).from(schema.bookings).where(eq(schema.bookings.status, 'confirmed'));

  return {
    hotels: Number(hotelCount.count),
    bookings: Number(bookingCount.count),
    users: Number(userCount.count),
    revenue: Number(revenue.total),
  };
}
