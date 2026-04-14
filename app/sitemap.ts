import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://aureliaviajes.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '', '/hoteles', '/vuelos', '/villas', '/paquetes', '/autos', '/actividades',
    '/destinos', '/ofertas', '/blog', '/nosotros', '/contacto',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  // When DB is connected, add dynamic hotel/blog pages here
  let dynamicPages: MetadataRoute.Sitemap = [];
  try {
    const { db } = await import('@/lib/db');
    const schema = await import('@/lib/db/schema');
    const { eq } = await import('drizzle-orm');

    const hotels = await db.select({ id: schema.hotels.id, updatedAt: schema.hotels.updatedAt })
      .from(schema.hotels).where(eq(schema.hotels.isActive, true));
    const hotelPages = hotels.map((h) => ({
      url: `${BASE_URL}/hotel/${h.id}`,
      lastModified: h.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const posts = await db.select({ slug: schema.blogPosts.slug, updatedAt: schema.blogPosts.updatedAt })
      .from(schema.blogPosts).where(eq(schema.blogPosts.isPublished, true));
    const blogPages = posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    dynamicPages = [...hotelPages, ...blogPages];
  } catch {
    // DB not connected yet — return static pages only
  }

  return [...staticPages, ...dynamicPages];
}
