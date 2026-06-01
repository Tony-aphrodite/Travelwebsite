import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { adminPromoSchema } from '@/lib/validators';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'admin') return null;
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  const rows = await db.select().from(schema.promoCodes).orderBy(desc(schema.promoCodes.id));
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const body = await req.json();
  const parsed = adminPromoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos invalidos', details: parsed.error.flatten() }, { status: 400 });
  }
  const row = await db.insert(schema.promoCodes).values({
    ...parsed.data,
    code: parsed.data.code.toUpperCase().trim(),
  }).returning();
  return NextResponse.json(row[0], { status: 201 });
}
