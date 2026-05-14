import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAdminStats, getRecentBookings } from '@/lib/db/queries';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'admin') return null;
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const [stats, recent] = await Promise.all([
    getAdminStats(),
    getRecentBookings(6),
  ]);

  return NextResponse.json({ stats, recent });
}
