import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAllBookings } from '@/lib/db/queries';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'admin') return null;
  return session;
}

export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const limit = Math.min(200, Math.max(1, Number(searchParams.get('limit') || '50')));
  const bookings = await getAllBookings(limit);
  return NextResponse.json(bookings);
}
