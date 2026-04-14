import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'admin') return null;
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const users = await db.select({
    id: schema.users.id,
    name: schema.users.name,
    email: schema.users.email,
    role: schema.users.role,
    loyaltyTier: schema.users.loyaltyTier,
    loyaltyPoints: schema.users.loyaltyPoints,
    createdAt: schema.users.createdAt,
  }).from(schema.users).orderBy(desc(schema.users.createdAt));

  return NextResponse.json(users);
}

export async function PUT(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const { userId, role } = await req.json();
  if (!userId || !role) {
    return NextResponse.json({ error: 'userId y role requeridos' }, { status: 400 });
  }

  await db.update(schema.users)
    .set({ role, updatedAt: new Date() })
    .where(eq(schema.users.id, userId));

  return NextResponse.json({ ok: true });
}
