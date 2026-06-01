import Stripe from 'stripe';

let _stripe: Stripe | null = null;

// Lazy init — avoids "apiKey not provided" failures at build time when the
// env var isn't set (Stripe SDK throws inside the constructor).
function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  _stripe = new Stripe(key, {
    apiVersion: '2026-03-25.dahlia',
    typescript: true,
  });
  return _stripe;
}

// Proxy preserves the previous import shape (`import { stripe }`) — every
// property access lazily instantiates the SDK on first use.
export const stripe = new Proxy({} as Stripe, {
  get(_t, prop) {
    return (getStripe() as any)[prop];
  },
});

export function getStripeLineItems(
  items: { name: string; unitPrice: number; quantity: number; image?: string }[]
) {
  return items.map((item) => ({
    price_data: {
      currency: 'usd' as const,
      product_data: {
        name: item.name,
        ...(item.image ? { images: [item.image] } : {}),
      },
      unit_amount: item.unitPrice * 100,
    },
    quantity: item.quantity,
  }));
}
