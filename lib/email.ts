import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

const BRAND = {
  primary: '#1A2954',      // Editorial navy ink (text + accents)
  primaryDark: '#0B1535',  // Deepest navy (headings)
  accent: '#C49435',       // Aged amber (highlights)
  text: '#0B1535',
  muted: '#6B7280',
  border: '#E5E5E5',
  bgSoft: '#F5F5F5',       // Very light gray section
  bgMain: '#FFFFFF',       // Pure white card/body
} as const;

export async function sendBookingConfirmation({
  to,
  customerName,
  bookingId,
  itemName,
  checkIn,
  checkOut,
  total,
  pointsEarned,
}: {
  to: string;
  customerName: string;
  bookingId: string;
  itemName: string;
  checkIn: string;
  checkOut: string;
  total: number;
  pointsEarned: number;
}) {
  return resend.emails.send({
    from: process.env.EMAIL_FROM || 'Aurelia Viajes <noreply@aureliaviajes.com>',
    to,
    subject: `Confirmacion de reserva #${bookingId.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: ${BRAND.text};">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: ${BRAND.primary}; font-size: 28px; margin: 0; letter-spacing: -0.5px;">Aurelia Viajes</h1>
          <p style="color: ${BRAND.muted}; font-size: 14px; margin: 4px 0 0;">El arte de viajar, redescubierto</p>
        </div>
        <hr style="border: none; border-top: 1px solid ${BRAND.border}; margin: 24px 0;" />
        <h2 style="color: ${BRAND.text}; font-size: 22px; margin: 0 0 12px;">Reserva confirmada</h2>
        <p style="color: ${BRAND.text}; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
          Hola <strong>${customerName}</strong>,<br/>
          Tu reserva ha sido confirmada exitosamente.
        </p>
        <div style="background: ${BRAND.bgSoft}; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="margin: 0 0 8px;"><strong>Reserva:</strong> ${itemName}</p>
          <p style="margin: 0 0 8px;"><strong>Check-in:</strong> ${checkIn}</p>
          <p style="margin: 0 0 8px;"><strong>Check-out:</strong> ${checkOut}</p>
          <p style="margin: 0 0 8px;"><strong>Total:</strong> $${total.toLocaleString()} USD</p>
          <p style="margin: 0; color: ${BRAND.primaryDark};"><strong style="background:${BRAND.accent}; color:${BRAND.primaryDark}; padding:2px 8px; border-radius:999px; font-size:12px;">+${pointsEarned} puntos Aurelia Society</strong></p>
        </div>
        <p style="color: ${BRAND.muted}; font-size: 14px;">
          Referencia: #${bookingId.slice(0, 8).toUpperCase()}
        </p>
        <hr style="border: none; border-top: 1px solid ${BRAND.border}; margin: 24px 0;" />
        <p style="color: ${BRAND.muted}; font-size: 12px; text-align: center; margin: 0;">
          Aurelia Viajes · reservas@aureliaviajes.com · +52 55 1234 5678
        </p>
      </div>
    `,
  });
}

const REGION_LABEL: Record<string, string> = {
  us: 'Estados Unidos',
  canada: 'Canada',
  europa: 'Europa',
};

const TIMESLOT_LABEL: Record<string, string> = {
  morning: 'Manana (9:00 - 12:00)',
  afternoon: 'Tarde (14:00 - 17:00)',
  evening: 'Noche (18:00 - 20:00)',
};

function fmtDate(d: Date | string) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

/** Sent to the legal officer when a new consultation request is submitted */
export async function sendConsultationNotification({
  to,
  request,
}: {
  to: string;
  request: {
    id: number;
    region: string;
    name: string;
    email: string;
    phone: string | null;
    preferredDate: Date;
    preferredTimeSlot: string;
    topic: string;
  };
}) {
  return resend.emails.send({
    from: process.env.EMAIL_FROM || 'Aurelia Viajes <noreply@aureliaviajes.com>',
    to,
    replyTo: request.email,
    subject: `Nueva solicitud de asesoria consular — ${REGION_LABEL[request.region]} — ${request.name}`,
    html: `
      <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: ${BRAND.text};">
        <h1 style="color: ${BRAND.primary}; font-size: 22px; margin: 0 0 8px;">Nueva solicitud de asesoria consular</h1>
        <p style="color: ${BRAND.muted}; font-size: 13px; margin: 0 0 24px;">Referencia #${String(request.id).padStart(5, '0')}</p>

        <div style="background: ${BRAND.bgSoft}; border-radius: 12px; padding: 20px; margin: 0 0 20px;">
          <p style="margin: 0 0 8px;"><strong>Region:</strong> ${REGION_LABEL[request.region]}</p>
          <p style="margin: 0 0 8px;"><strong>Fecha preferida:</strong> ${fmtDate(request.preferredDate)}</p>
          <p style="margin: 0 0 8px;"><strong>Franja horaria:</strong> ${TIMESLOT_LABEL[request.preferredTimeSlot]}</p>
        </div>

        <div style="background: ${BRAND.bgSoft}; border-radius: 12px; padding: 20px; margin: 0 0 20px;">
          <p style="margin: 0 0 8px;"><strong>Cliente:</strong> ${request.name}</p>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${request.email}" style="color:${BRAND.primary}">${request.email}</a></p>
          <p style="margin: 0;"><strong>Telefono:</strong> ${request.phone || '—'}</p>
        </div>

        <h3 style="font-size: 14px; color: ${BRAND.text}; margin: 0 0 8px;">Tema / situacion</h3>
        <p style="background: ${BRAND.bgSoft}; border-radius: 12px; padding: 16px; white-space: pre-wrap; line-height: 1.55; margin: 0 0 24px;">${request.topic.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</p>

        <p style="color: ${BRAND.muted}; font-size: 12px; margin: 0;">Responde directamente a este correo para contactar al cliente.</p>
      </div>
    `,
  });
}

/** Sent to the client to confirm their request was received */
export async function sendConsultationConfirmation({
  to,
  name,
  region,
  preferredDate,
  preferredTimeSlot,
}: {
  to: string;
  name: string;
  region: string;
  preferredDate: Date;
  preferredTimeSlot: string;
}) {
  return resend.emails.send({
    from: process.env.EMAIL_FROM || 'Aurelia Viajes <noreply@aureliaviajes.com>',
    to,
    subject: `Recibimos tu solicitud de asesoria consular — ${REGION_LABEL[region]}`,
    html: `
      <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: ${BRAND.text};">
        <div style="text-align: center; margin-bottom: 28px;">
          <h1 style="color: ${BRAND.primary}; font-size: 26px; margin: 0;">Aurelia Viajes</h1>
          <p style="color: ${BRAND.muted}; font-size: 13px; margin: 4px 0 0;">Asesoria consular</p>
        </div>

        <h2 style="color: ${BRAND.text}; font-size: 20px; margin: 0 0 12px;">Hola ${name},</h2>
        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
          Recibimos tu solicitud de consulta con nuestra encargada legal sobre tramites para
          <strong>${REGION_LABEL[region]}</strong>. Gracias por confiar en nosotras.
        </p>

        <div style="background: ${BRAND.bgSoft}; border-radius: 12px; padding: 20px; margin: 16px 0;">
          <p style="margin: 0 0 8px;"><strong>Fecha solicitada:</strong> ${fmtDate(preferredDate)}</p>
          <p style="margin: 0;"><strong>Franja horaria:</strong> ${TIMESLOT_LABEL[preferredTimeSlot]}</p>
        </div>

        <p style="font-size: 15px; line-height: 1.6; margin: 16px 0;">
          Te contactaremos en las proximas <strong>24 horas habiles</strong> para confirmar la cita y
          coordinar el canal (videollamada, WhatsApp o presencial).
        </p>

        <p style="color: ${BRAND.muted}; font-size: 13px; line-height: 1.55; margin: 24px 0 0;">
          Si necesitas algo urgente, escribenos directamente a
          <a href="mailto:${process.env.CONTACT_INBOX || 'hola@aureliaviajes.com'}" style="color:${BRAND.primary}">${process.env.CONTACT_INBOX || 'hola@aureliaviajes.com'}</a>.
        </p>

        <hr style="border: none; border-top: 1px solid ${BRAND.border}; margin: 28px 0;" />
        <p style="color: ${BRAND.muted}; font-size: 12px; text-align: center; margin: 0;">Aurelia Viajes &mdash; el arte de viajar, redescubierto.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: {
  to: string;
  name: string;
  resetUrl: string;
}) {
  return resend.emails.send({
    from: process.env.EMAIL_FROM || 'Aurelia Viajes <noreply@aureliaviajes.com>',
    to,
    subject: 'Restablece tu contraseña',
    html: `
      <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: ${BRAND.text};">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: ${BRAND.primary}; font-size: 28px; margin: 0; letter-spacing: -0.5px;">Aurelia Viajes</h1>
        </div>
        <h2 style="color: ${BRAND.text}; margin: 0 0 16px;">Hola ${name},</h2>
        <p style="color: ${BRAND.text}; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
          Recibimos una solicitud para restablecer la contraseña de tu cuenta.
          Haz clic en el boton para crear una nueva contraseña. El enlace expira en <strong>60 minutos</strong>.
        </p>
        <p style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}" style="display: inline-block; background: ${BRAND.accent}; color: ${BRAND.primaryDark}; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-size: 15px; font-weight: 700;">
            Restablecer contraseña
          </a>
        </p>
        <p style="color: ${BRAND.muted}; font-size: 13px; line-height: 1.6;">
          Si no solicitaste este cambio, ignora este correo &mdash; tu contraseña no se modificara.
        </p>
        <hr style="border: none; border-top: 1px solid ${BRAND.border}; margin: 24px 0;" />
        <p style="color: ${BRAND.muted}; font-size: 12px; text-align: center; margin: 0;">
          Aurelia Viajes
        </p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  return resend.emails.send({
    from: process.env.EMAIL_FROM || 'Aurelia Viajes <noreply@aureliaviajes.com>',
    to,
    subject: 'Bienvenida a Aurelia Society',
    html: `
      <div style="font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: ${BRAND.text};">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: ${BRAND.primary}; font-size: 28px; margin: 0; letter-spacing: -0.5px;">Aurelia Viajes</h1>
        </div>
        <h2 style="color: ${BRAND.text}; margin: 0 0 16px;">Bienvenida, ${name}</h2>
        <p style="color: ${BRAND.text}; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
          Ahora eres parte de <strong>Aurelia Society</strong>. Como miembro Silver,
          ya puedes acumular puntos con cada reserva y disfrutar de beneficios exclusivos.
        </p>
        <div style="background: linear-gradient(135deg, ${BRAND.primaryDark}, ${BRAND.primary}); border-radius: 12px; padding: 32px; margin: 24px 0; text-align: center;">
          <p style="color: white; font-size: 20px; margin: 0;">Tu nivel: <strong style="color:${BRAND.accent}">Silver</strong></p>
          <p style="color: rgba(255,255,255,0.85); font-size: 14px; margin: 8px 0 0;">5% de descuento en todas las reservas</p>
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/destinos" style="display: inline-block; background: ${BRAND.accent}; color: ${BRAND.primaryDark}; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-size: 15px; font-weight: 700;">
          Explorar destinos
        </a>
      </div>
    `,
  });
}
