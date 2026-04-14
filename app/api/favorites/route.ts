import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUserFavorites, toggleFavorite } from '@/lib/db/queries';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const favorites = await getUserFavorites(session.user.id);
  return NextResponse.json(favorites);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { type, itemId } = await req.json();
  if (!type || !itemId) {
    return NextResponse.json({ error: 'type y itemId requeridos' }, { status: 400 });
  }

  const result = await toggleFavorite(session.user.id, type, itemId);
  return NextResponse.json(result);
}
