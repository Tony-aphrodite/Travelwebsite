import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { getUserByEmail, createPasswordResetToken } from '@/lib/db/queries';
import { sendPasswordResetEmail } from '@/lib/email';
import { absoluteUrl } from '@/lib/utils';

const schema = z.object({ email: z.string().email() });

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalido' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email invalido' }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase().trim();
  const user = await getUserByEmail(email);

  // Always respond 200 to avoid leaking which emails are registered.
  if (user) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await createPasswordResetToken(user.id, tokenHash, expiresAt);

    const resetUrl = absoluteUrl(`/auth/reset?token=${rawToken}`);
    try {
      await sendPasswordResetEmail({ to: email, name: user.name || 'Viajera', resetUrl });
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') console.error('[forgot] email failed:', err);
    }
  }

  return NextResponse.json({ ok: true });
}
