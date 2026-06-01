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
  const rows = await db.select().from(schema.newsletterSubscribers)
    .orderBy(desc(schema.newsletterSubscribers.subscribedAt));
  return NextResponse.json(rows);
}

export async function DELETE(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'ID invalido' }, { status: 400 });

  await db.delete(schema.newsletterSubscribers).where(eq(schema.newsletterSubscribers.id, id));
  return NextResponse.json({ ok: true });
}
