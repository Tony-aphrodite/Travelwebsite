import { NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import {
  getPasswordResetToken,
  markPasswordResetTokenUsed,
  updateUserPassword,
} from '@/lib/db/queries';

const schema = z.object({
  token: z.string().min(32),
  password: z.string().min(6).max(200),
});

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
    return NextResponse.json({ error: 'Datos invalidos' }, { status: 400 });
  }

  const tokenRow = await getPasswordResetToken(hashToken(parsed.data.token));
  if (!tokenRow) {
    return NextResponse.json({ error: 'Token invalido o expirado' }, { status: 400 });
  }
  if (tokenRow.usedAt) {
    return NextResponse.json({ error: 'Este enlace ya fue usado' }, { status: 400 });
  }
  if (tokenRow.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: 'El enlace expiro' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(parsed.data.password, 12);
  await updateUserPassword(tokenRow.userId, hashed);
  await markPasswordResetTokenUsed(tokenRow.id);

  return NextResponse.json({ ok: true });
}
