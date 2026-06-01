import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUserBookings, createBooking } from '@/lib/db/queries';
import { bookingSchema } from '@/lib/validators';
import { calculateTaxes } from '@/lib/utils';
import { calculatePointsEarned } from '@/lib/loyalty';
import { getTaxRate, getPointsPerDollar } from '@/lib/settings';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const bookings = await getUserBookings(session.user.id);
  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { type, itemId, itemName, checkIn, checkOut, guests, quantity, unitPrice } = parsed.data;
  const subtotal = unitPrice * quantity;
  const [rate, ppd] = await Promise.all([getTaxRate(), getPointsPerDollar()]);
  const taxes = calculateTaxes(subtotal, rate);
  const total = subtotal + taxes;
  const pointsEarned = calculatePointsEarned(total, ppd);

  const booking = await createBooking({
    userId: session.user.id,
    type,
    itemId,
    itemName,
    checkIn: checkIn ? new Date(checkIn) : null,
    checkOut: checkOut ? new Date(checkOut) : null,
    guests,
    quantity,
    unitPrice,
    subtotal,
    taxes,
    total,
    pointsEarned,
  });

  return NextResponse.json(booking[0], { status: 201 });
}
