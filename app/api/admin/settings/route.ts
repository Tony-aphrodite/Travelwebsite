import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { adminSettingsSchema } from '@/lib/validators';
import { invalidateSettingsCache } from '@/lib/settings';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'admin') return null;
  return session;
}

async function ensureRow() {
  const rows = await db.select().from(schema.siteSettings).where(eq(schema.siteSettings.id, 1));
  if (rows[0]) return rows[0];
  const [inserted] = await db.insert(schema.siteSettings).values({ id: 1 }).returning();
  return inserted;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  const row = await ensureRow();
  return NextResponse.json(row);
}

export async function PUT(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  await ensureRow();
  const body = await req.json();
  const parsed = adminSettingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos invalidos', details: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await db.update(schema.siteSettings)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(schema.siteSettings.id, 1))
    .returning();
  invalidateSettingsCache();
  return NextResponse.json(updated[0]);
}
