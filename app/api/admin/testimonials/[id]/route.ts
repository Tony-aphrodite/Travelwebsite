import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

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
  const updated = await db.update(schema.testimonials)
    .set(body)
    .where(eq(schema.testimonials.id, id))
    .returning();
  return NextResponse.json(updated[0]);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'ID invalido' }, { status: 400 });

  await db.delete(schema.testimonials).where(eq(schema.testimonials.id, id));
  return NextResponse.json({ ok: true });
}
