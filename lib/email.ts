import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

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
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #6B2C5F; font-size: 28px; margin: 0;">Aurelia Viajes</h1>
          <p style="color: #7A6B6B; font-size: 14px;">El arte de viajar, redescubierto</p>
        </div>
        <hr style="border: none; border-top: 1px solid #E8DFD0; margin: 24px 0;" />
        <h2 style="color: #2D2424; font-size: 22px;">¡Reserva confirmada!</h2>
        <p style="color: #4A3D3D; font-size: 16px; line-height: 1.6;">
          Hola <strong>${customerName}</strong>,<br/>
          Tu reserva ha sido confirmada exitosamente.
        </p>
        <div style="background: #FAF7F2; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="margin: 0 0 8px;"><strong>Reserva:</strong> ${itemName}</p>
          <p style="margin: 0 0 8px;"><strong>Check-in:</strong> ${checkIn}</p>
          <p style="margin: 0 0 8px;"><strong>Check-out:</strong> ${checkOut}</p>
          <p style="margin: 0 0 8px;"><strong>Total:</strong> $${total.toLocaleString()} USD</p>
          <p style="margin: 0; color: #C9A961;"><strong>+${pointsEarned} puntos Aurelia Society</strong></p>
        </div>
        <p style="color: #7A6B6B; font-size: 14px;">
          Referencia: #${bookingId.slice(0, 8).toUpperCase()}
        </p>
        <hr style="border: none; border-top: 1px solid #E8DFD0; margin: 24px 0;" />
        <p style="color: #B8A9A9; font-size: 12px; text-align: center;">
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
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #6B2C5F; font-size: 28px; margin: 0;">Aurelia Viajes</h1>
        </div>
        <h2 style="color: #2D2424;">¡Bienvenida, ${name}!</h2>
        <p style="color: #4A3D3D; font-size: 16px; line-height: 1.6;">
          Ahora eres parte de <strong>Aurelia Society</strong>. Como miembro Silver,
          ya puedes acumular puntos con cada reserva y disfrutar de beneficios exclusivos.
        </p>
        <div style="background: linear-gradient(135deg, #6B2C5F, #C9A961); border-radius: 12px; padding: 32px; margin: 24px 0; text-align: center;">
          <p style="color: white; font-size: 20px; margin: 0;">Tu nivel: <strong>Silver</strong></p>
          <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 8px 0 0;">5% de descuento en todas las reservas</p>
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/destinos" style="display: inline-block; background: #6B2C5F; color: white; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-size: 15px;">
          Explorar destinos
        </a>
      </div>
    `,
  });
}
