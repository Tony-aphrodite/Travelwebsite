import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { consultationSchema } from '@/lib/validators';
import { createConsultationRequest } from '@/lib/db/queries';
import {
  sendConsultationConfirmation,
  sendConsultationNotification,
} from '@/lib/email';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalido' }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos invalidos', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const preferredDate = new Date(data.preferredDate);
  if (preferredDate.getTime() < Date.now() - 24 * 60 * 60 * 1000) {
    return NextResponse.json(
      { error: 'La fecha debe ser hoy o posterior' },
      { status: 400 },
    );
  }

  // Optional user association if the requester is logged in
  const session = await auth();
  const userId = session?.user?.id ?? null;

  const [request] = await createConsultationRequest({
    userId,
    region: data.region,
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    phone: data.phone?.trim() || null,
    preferredDate,
    preferredTimeSlot: data.preferredTimeSlot,
    topic: data.topic.trim(),
  });

  // Send emails in parallel, non-blocking — never block the API response on email
  const legalInbox = process.env.LEGAL_INBOX || process.env.CONTACT_INBOX || 'hola@aureliaviajes.com';
  Promise.all([
    sendConsultationNotification({
      to: legalInbox,
      request: {
        id: request.id,
        region: request.region,
        name: request.name,
        email: request.email,
        phone: request.phone,
        preferredDate: request.preferredDate,
        preferredTimeSlot: request.preferredTimeSlot,
        topic: request.topic,
      },
    }),
    sendConsultationConfirmation({
      to: request.email,
      name: request.name,
      region: request.region,
      preferredDate: request.preferredDate,
      preferredTimeSlot: request.preferredTimeSlot,
    }),
  ]).catch((err) => {
    if (process.env.NODE_ENV !== 'production') console.error('[consultations] email failed', err);
  });

  return NextResponse.json(
    { id: request.id, status: request.status },
    { status: 201 },
  );
}
