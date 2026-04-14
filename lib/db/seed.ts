import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import {
  destinations as destData,
  hotels as hotelData,
  flights as flightData,
  villas as villaData,
  packages as pkgData,
  cars as carData,
  activities as actData,
  blogPosts as blogData,
  testimonials as testData,
} from '../data';

async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  const sql = neon(url);
  const db = drizzle(sql, { schema });

  console.log('Seeding database...\n');

  // Destinations
  console.log('  Seeding destinations...');
  for (const d of destData) {
    await db.insert(schema.destinations).values({
      id: d.id,
      name: d.name,
      country: d.country,
      image: d.image,
      priceFrom: d.priceFrom,
      tagline: d.tagline,
    }).onConflictDoNothing();
  }

  // Hotels
  console.log('  Seeding hotels...');
  for (const h of hotelData) {
    await db.insert(schema.hotels).values({
      id: h.id,
      name: h.name,
      location: h.location,
      country: h.country,
      image: h.image,
      gallery: h.gallery,
      rating: h.rating,
      reviewCount: h.reviewCount,
      ratingLabel: h.ratingLabel,
      stars: h.stars,
      price: h.price,
      oldPrice: h.oldPrice ?? null,
      description: h.description,
      amenities: h.amenities,
      tags: h.tags,
    }).onConflictDoNothing();
  }

  // Flights
  console.log('  Seeding flights...');
  for (const f of flightData) {
    await db.insert(schema.flights).values({
      id: f.id,
      airline: f.airline,
      airlineCode: f.airlineCode,
      fromCode: f.from,
      toCode: f.to,
      fromCity: f.fromCity,
      toCity: f.toCity,
      departure: f.departure,
      arrival: f.arrival,
      duration: f.duration,
      stops: f.stops,
      stopInfo: f.stopInfo,
      price: f.price,
      cabin: f.cabin,
    }).onConflictDoNothing();
  }

  // Villas
  console.log('  Seeding villas...');
  for (const v of villaData) {
    await db.insert(schema.villas).values({
      id: v.id,
      name: v.name,
      location: v.location,
      country: v.country,
      image: v.image,
      gallery: v.gallery,
      guests: v.guests,
      bedrooms: v.bedrooms,
      bathrooms: v.bathrooms,
      price: v.price,
      rating: v.rating,
      reviewCount: v.reviewCount,
      description: v.description,
      amenities: v.amenities,
    }).onConflictDoNothing();
  }

  // Packages
  console.log('  Seeding packages...');
  for (const p of pkgData) {
    await db.insert(schema.packages).values({
      id: p.id,
      title: p.title,
      destination: p.destination,
      image: p.image,
      duration: p.duration,
      includes: p.includes,
      price: p.price,
      oldPrice: p.oldPrice,
      badge: p.badge,
      description: p.description,
    }).onConflictDoNothing();
  }

  // Cars
  console.log('  Seeding cars...');
  for (const c of carData) {
    await db.insert(schema.cars).values({
      id: c.id,
      model: c.model,
      category: c.category,
      image: c.image,
      company: c.company,
      seats: c.seats,
      transmission: c.transmission,
      fuel: c.fuel,
      price: c.price,
      features: c.features,
    }).onConflictDoNothing();
  }

  // Activities
  console.log('  Seeding activities...');
  for (const a of actData) {
    await db.insert(schema.activities).values({
      id: a.id,
      title: a.title,
      location: a.location,
      image: a.image,
      duration: a.duration,
      price: a.price,
      rating: a.rating,
      reviewCount: a.reviewCount,
      category: a.category,
      description: a.description,
    }).onConflictDoNothing();
  }

  // Blog posts
  console.log('  Seeding blog posts...');
  for (const b of blogData) {
    await db.insert(schema.blogPosts).values({
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      content: `<p>${b.excerpt}</p><p>Contenido completo del articulo proximamente...</p>`,
      category: b.category,
      readTime: b.readTime,
      image: b.image,
      author: b.author,
      isPublished: true,
      publishedAt: new Date('2026-03-01'),
    }).onConflictDoNothing();
  }

  // Testimonials
  console.log('  Seeding testimonials...');
  for (const t of testData) {
    await db.insert(schema.testimonials).values({
      name: t.name,
      trip: t.trip,
      avatar: t.avatar,
      text: t.text,
    });
  }

  // Admin user
  console.log('  Creating admin user...');
  await db.insert(schema.users).values({
    id: 'admin-001',
    name: 'Admin Aurelia',
    email: 'admin@aureliaviajes.com',
    role: 'admin',
    loyaltyTier: 'platinum',
    loyaltyPoints: 15000,
  }).onConflictDoNothing();

  // Sample promo code
  console.log('  Creating sample promo code...');
  await db.insert(schema.promoCodes).values({
    code: 'BIENVENIDA20',
    discountPercent: 20,
    maxUses: 100,
    isActive: true,
    expiresAt: new Date('2026-12-31'),
  }).onConflictDoNothing();

  console.log('\n✓ Seed complete!');
}

seed().catch(console.error);
