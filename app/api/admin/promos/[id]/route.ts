import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { adminPromoSchema } from '@/lib/validators';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'admin') return null;
  return session;
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'ID invalido' }, { status: 400 });

  const body = await req.json();
  const parsed = adminPromoSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos invalidos', details: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await db.update(schema.promoCodes)
    .set({
      ...parsed.data,
      ...(parsed.data.code ? { code: parsed.data.code.toUpperCase().trim() } : {}),
    })
    .where(eq(schema.promoCodes.id, id))
    .returning();
  return NextResponse.json(updated[0]);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'ID invalido' }, { status: 400 });

  await db.delete(schema.promoCodes).where(eq(schema.promoCodes.id, id));
  return NextResponse.json({ ok: true });
}
