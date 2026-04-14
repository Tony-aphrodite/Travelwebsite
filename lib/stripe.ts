import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
  typescript: true,
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
