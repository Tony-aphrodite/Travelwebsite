import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { adminPackageSchema } from '@/lib/validators';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'admin') return null;
  return session;
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const rows = await db.select().from(schema.packages).where(eq(schema.packages.id, params.id));
  if (!rows[0]) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const body = await req.json();
  const parsed = adminPackageSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos invalidos', details: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await db.update(schema.packages)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(schema.packages.id, params.id))
    .returning();
  if (!updated[0]) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json(updated[0]);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  await db.delete(schema.packages).where(eq(schema.packages.id, params.id));
  return NextResponse.json({ ok: true });
}
