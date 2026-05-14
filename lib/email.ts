import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

const BRAND = {
  primary: '#1668E3',      // Expedia blue
  primaryDark: '#0A1E3D',  // Navy
  accent: '#FFC72C',       // Yellow
  text: '#0F1B2D',
  muted: '#6B7280',
  border: '#DCE3EC',
  bgSoft: '#F7F9FC',
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
