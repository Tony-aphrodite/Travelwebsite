import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { stripe, getStripeLineItems } from '@/lib/stripe';
import { getCartItems } from '@/lib/db/queries';
import { absoluteUrl } from '@/lib/utils';

export async function POST() {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const cartItems = await getCartItems(session.user.id);
  if (cartItems.length === 0) {
    return NextResponse.json({ error: 'Carrito vacio' }, { status: 400 });
  }

  const lineItems = getStripeLineItems(
    cartItems.map((item) => ({
      name: item.itemName,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      image: item.itemImage,
    }))
  );

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: session.user.email,
    line_items: lineItems,
    metadata: {
      userId: session.user.id,
    },
    success_url: absoluteUrl('/checkout/success?session_id={CHECKOUT_SESSION_ID}'),
    cancel_url: absoluteUrl('/carrito'),
  });

  return NextResponse.json({ url: checkoutSession.url });
}
