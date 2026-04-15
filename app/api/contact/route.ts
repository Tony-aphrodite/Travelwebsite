import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, lastName, email, phone, reason, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 });
  }

  // Send via Resend if configured, otherwise just log
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && resendKey !== 're_xxx') {
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'reservas@aureliaviajes.com',
        to: 'hola@aureliaviajes.com',
        subject: `Contacto: ${reason} - ${name} ${lastName}`,
        html: `<p><strong>De:</strong> ${name} ${lastName} (${email})</p><p><strong>Telefono:</strong> ${phone}</p><p><strong>Motivo:</strong> ${reason}</p><p>${message}</p>`,
      });
    } else {
      console.log('[Contact Form]', { name, lastName, email, phone, reason, message });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 });
  }
}
