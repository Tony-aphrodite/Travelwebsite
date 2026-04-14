import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'admin') return null;
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  const posts = await db.select().from(schema.blogPosts).orderBy(desc(schema.blogPosts.createdAt));
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  const body = await req.json();
  const post = await db.insert(schema.blogPosts).values(body).returning();
  return NextResponse.json(post[0], { status: 201 });
}
