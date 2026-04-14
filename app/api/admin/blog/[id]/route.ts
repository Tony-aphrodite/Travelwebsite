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

  const body = await req.json();
  const updated = await db.update(schema.blogPosts)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(schema.blogPosts.id, Number(params.id)))
    .returning();
  return NextResponse.json(updated[0]);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  await db.delete(schema.blogPosts).where(eq(schema.blogPosts.id, Number(params.id)));
  return NextResponse.json({ ok: true });
}
