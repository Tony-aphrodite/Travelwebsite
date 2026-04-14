import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getCartItems, clearCart, createBooking, creditPoints } from '@/lib/db/queries';
import { calculateTaxes } from '@/lib/utils';
import { calculatePointsEarned } from '@/lib/loyalty';
import { sendBookingConfirmation } from '@/lib/email';

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get('stripe-signature')!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    if (!userId) return NextResponse.json({ ok: true });

    // Get cart items and create bookings
    const cartItems = await getCartItems(userId);
    for (const item of cartItems) {
      const subtotal = item.unitPrice * item.quantity;
      const taxes = calculateTaxes(subtotal);
      const total = subtotal + taxes;
      const pointsEarned = calculatePointsEarned(total);

      const [booking] = await createBooking({
        userId,
        type: item.type,
        itemId: item.itemId,
        itemName: item.itemName,
        status: 'confirmed',
        checkIn: item.checkIn ? new Date(item.checkIn) : null,
        checkOut: item.checkOut ? new Date(item.checkOut) : null,
        guests: item.guests ?? 1,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal,
        taxes,
        total,
        pointsEarned,
        stripeSessionId: session.id,
      });

      // Credit loyalty points
      await creditPoints(userId, pointsEarned, `Reserva: ${item.itemName}`, booking.id);

      // Send confirmation email
      const user = await db.select().from(schema.users).where(eq(schema.users.id, userId));
      if (user[0]?.email) {
        await sendBookingConfirmation({
          to: user[0].email,
          customerName: user[0].name || 'Viajera',
          bookingId: booking.id,
          itemName: item.itemName,
          checkIn: item.checkIn || 'Por confirmar',
          checkOut: item.checkOut || 'Por confirmar',
          total,
          pointsEarned,
        }).catch(console.error);
      }
    }

    // Clear the cart
    await clearCart(userId);
  }

  return NextResponse.json({ ok: true });
}
