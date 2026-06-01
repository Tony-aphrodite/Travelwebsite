import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/settings';

// Public read-only endpoint — only exposes data already used in the UI
// (tax rate, currency, member discount, loyalty rate, contact info).
export async function GET() {
  const s = await getSettings();
  return NextResponse.json({
    taxRate: s.taxRate,
    memberDiscountPercent: s.memberDiscountPercent,
    currency: s.currency,
    loyaltyPointsPerDollar: s.loyaltyPointsPerDollar,
    contactEmail: s.contactEmail,
    contactPhone: s.contactPhone,
    whatsappNumber: s.whatsappNumber,
  });
}
