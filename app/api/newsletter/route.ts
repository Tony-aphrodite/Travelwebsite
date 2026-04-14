import { NextResponse } from 'next/server';
import { subscribeNewsletter } from '@/lib/db/queries';
import { newsletterSchema } from '@/lib/validators';

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email invalido' }, { status: 400 });
  }

  await subscribeNewsletter(parsed.data.email);
  return NextResponse.json({ ok: true });
}
