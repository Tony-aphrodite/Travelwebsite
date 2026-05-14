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

const ALLOWED_ROLES = ['user', 'admin'] as const;
type AllowedRole = typeof ALLOWED_ROLES[number];

export async function PUT(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const { userId, role } = await req.json();
  if (typeof userId !== 'string' || !userId) {
    return NextResponse.json({ error: 'userId requerido' }, { status: 400 });
  }
  if (!ALLOWED_ROLES.includes(role)) {
    return NextResponse.json({ error: 'Rol invalido' }, { status: 400 });
  }

  if (userId === session.user!.id && role !== 'admin') {
    return NextResponse.json({ error: 'No puedes quitar tu propio rol de admin' }, { status: 400 });
  }

  await db.update(schema.users)
    .set({ role: role as AllowedRole, updatedAt: new Date() })
    .where(eq(schema.users.id, userId));

  return NextResponse.json({ ok: true });
}
