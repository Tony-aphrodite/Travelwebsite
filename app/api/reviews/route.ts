import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getReviewsForItem } from '@/lib/db/queries';
import { reviewSchema } from '@/lib/validators';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const itemId = searchParams.get('itemId');
  if (!type || !itemId) {
    return NextResponse.json({ error: 'type y itemId requeridos' }, { status: 400 });
  }

  const reviews = await getReviewsForItem(type, itemId);
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const review = await db.insert(schema.reviews).values({
    userId: session.user.id,
    ...parsed.data,
  }).returning();

  return NextResponse.json(review[0], { status: 201 });
}
