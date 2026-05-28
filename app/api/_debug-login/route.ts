/**
 * TEMPORARY DEBUG ENDPOINT — remove before final cleanup.
 * Replicates the exact logic from lib/auth.ts authorize() so we can see
 * step-by-step where credentials sign-in is failing on Vercel.
 *
 * Only runs in development OR when ALLOW_DEBUG_LOGIN=true is set.
 */
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';

export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_DEBUG_LOGIN !== 'true') {
    return NextResponse.json({ error: 'disabled' }, { status: 403 });
  }
  const body = await req.json().catch(() => ({}));
  const { email: rawEmail, password: rawPassword } = body as { email?: string; password?: string };

  const result: any = {
    received: {
      emailLength: rawEmail?.length ?? 0,
      passwordLength: rawPassword?.length ?? 0,
    },
  };

  if (!rawEmail || !rawPassword) {
    result.failedAt = 'missing-credentials';
    return NextResponse.json(result);
  }

  const email = String(rawEmail).toLowerCase().trim();
  const password = String(rawPassword);
  result.normalized = { email, passwordLength: password.length };

  const rows = await db.select().from(schema.users).where(eq(schema.users.email, email));
  result.userFound = rows.length > 0;

  if (rows.length === 0) {
    result.failedAt = 'user-not-found';
    return NextResponse.json(result);
  }

  const user = rows[0];
  result.user = {
    id: user.id,
    email: user.email,
    role: user.role,
    hasHash: !!user.hashedPassword,
    hashLength: user.hashedPassword?.length ?? 0,
    hashPrefix: user.hashedPassword?.slice(0, 7) ?? null,
  };

  if (!user.hashedPassword) {
    result.failedAt = 'no-hashed-password';
    return NextResponse.json(result);
  }

  const ok = await bcrypt.compare(password, user.hashedPassword);
  result.bcryptCompare = ok;
  result.failedAt = ok ? null : 'bcrypt-compare-failed';
  return NextResponse.json(result);
}
