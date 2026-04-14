import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'admin') {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const hotels = await db.select().from(schema.hotels).orderBy(desc(schema.hotels.createdAt));
  return NextResponse.json(hotels);
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const body = await req.json();
  const hotel = await db.insert(schema.hotels).values(body).returning();
  return NextResponse.json(hotel[0], { status: 201 });
}
