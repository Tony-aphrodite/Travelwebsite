import { NextResponse } from 'next/server';
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

  const { name, email, password } = parsed.data;

  // Check if user exists
  const existing = await db.select().from(schema.users).where(eq(schema.users.email, email));
  if (existing.length > 0) {
    return NextResponse.json({ error: 'Este email ya esta registrado' }, { status: 409 });
  }

  // Create user (store password as-is for demo; in production use bcrypt)
  const [user] = await db.insert(schema.users).values({
    name,
    email,
    hashedPassword: password,
    role: 'user',
    loyaltyTier: 'silver',
    loyaltyPoints: 0,
  }).returning();

  // Send welcome email (non-blocking)
  sendWelcomeEmail({ to: email, name }).catch(console.error);

  return NextResponse.json({ id: user.id, name: user.name, email: user.email }, { status: 201 });
}
