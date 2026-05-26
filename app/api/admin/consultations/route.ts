import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  getConsultationRequests,
  updateConsultationStatus,
} from '@/lib/db/queries';
import { consultationStatusUpdateSchema } from '@/lib/validators';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'admin') return null;
  return session;
}

export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const limit = Math.min(200, Math.max(1, Number(searchParams.get('limit') || '100')));
  const rows = await getConsultationRequests(limit);
  return NextResponse.json(rows);
}

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const body = await req.json();
  const { id, ...rest } = body || {};
  if (typeof id !== 'number') {
    return NextResponse.json({ error: 'id requerido (number)' }, { status: 400 });
  }

  const parsed = consultationStatusUpdateSchema.safeParse(rest);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos invalidos' }, { status: 400 });
  }

  const [updated] = await updateConsultationStatus(id, parsed.data.status, parsed.data.notes);
  if (!updated) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json(updated);
}
