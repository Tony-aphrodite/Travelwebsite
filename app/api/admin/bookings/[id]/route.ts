import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { updateBookingStatus } from '@/lib/db/queries';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'admin') return null;
  return session;
}

const patchSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const body = await req.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Status invalido' }, { status: 400 });
  }

  const updated = await updateBookingStatus(params.id, parsed.data.status);
  if (!updated[0]) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json(updated[0]);
}
