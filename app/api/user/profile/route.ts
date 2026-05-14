import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { profileUpdateSchema } from '@/lib/validators';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const rows = await db.select({
    id: schema.users.id,
    name: schema.users.name,
    email: schema.users.email,
    phone: schema.users.phone,
    country: schema.users.country,
    loyaltyTier: schema.users.loyaltyTier,
    loyaltyPoints: schema.users.loyaltyPoints,
  }).from(schema.users).where(eq(schema.users.id, session.user.id));

  if (!rows[0]) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const body = await req.json();
  const parsed = profileUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos invalidos', details: parsed.error.flatten() }, { status: 400 });
  }

  await db.update(schema.users)
    .set({
      name: parsed.data.name.trim(),
      phone: parsed.data.phone?.trim() || null,
      country: parsed.data.country?.trim() || null,
      updatedAt: new Date(),
    })
    .where(eq(schema.users.id, session.user.id));

  return NextResponse.json({ ok: true });
}
