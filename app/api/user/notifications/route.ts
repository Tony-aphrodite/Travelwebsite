import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { getNotificationPrefs, upsertNotificationPrefs } from '@/lib/db/queries';

const prefsSchema = z.object({
  offers: z.boolean(),
  tripReminders: z.boolean(),
  newsletter: z.boolean(),
  blog: z.boolean(),
  priceAlerts: z.boolean(),
});

const DEFAULT_PREFS = {
  offers: true,
  tripReminders: true,
  newsletter: true,
  blog: false,
  priceAlerts: false,
};

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const prefs = await getNotificationPrefs(session.user.id);
  return NextResponse.json(prefs ?? { userId: session.user.id, ...DEFAULT_PREFS });
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const body = await req.json();
  const parsed = prefsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos invalidos' }, { status: 400 });
  }

  const [saved] = await upsertNotificationPrefs(session.user.id, parsed.data);
  return NextResponse.json(saved);
}
