import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { registerSchema } from '@/lib/validators';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos invalidos' }, { status: 400 });
  }

  const name = parsed.data.name.trim();
  const email = parsed.data.email.toLowerCase().trim();
  const { password } = parsed.data;

  const existing = await db.select().from(schema.users).where(eq(schema.users.email, email));
  if (existing.length > 0) {
    return NextResponse.json({ error: 'Este email ya esta registrado' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const [user] = await db.insert(schema.users).values({
    name,
    email,
    hashedPassword,
    role: 'user',
    loyaltyTier: 'silver',
    loyaltyPoints: 0,
  }).returning();

  sendWelcomeEmail({ to: email, name }).catch((err) => {
    if (process.env.NODE_ENV !== 'production') console.error('Welcome email failed:', err);
  });

  return NextResponse.json({ id: user.id, name: user.name, email: user.email }, { status: 201 });
}
