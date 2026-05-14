import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validators';
import { escapeHtml } from '@/lib/utils';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalido' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos invalidos', details: parsed.error.flatten() }, { status: 400 });
  }

  const { name, lastName, email, phone, reason, message } = parsed.data;
  const fullName = [name, lastName].filter(Boolean).join(' ').trim();

  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && resendKey !== 're_xxx') {
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'reservas@aureliaviajes.com',
        to: process.env.CONTACT_INBOX || 'hola@aureliaviajes.com',
        replyTo: email,
        subject: `Contacto: ${reason} - ${fullName}`.slice(0, 180),
        html: `
          <p><strong>De:</strong> ${escapeHtml(fullName)} (${escapeHtml(email)})</p>
          <p><strong>Telefono:</strong> ${escapeHtml(phone) || '-'}</p>
          <p><strong>Motivo:</strong> ${escapeHtml(reason)}</p>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        `,
      });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.error('[Contact Form] send failed:', err);
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 });
  }
}
