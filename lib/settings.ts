import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export type AppSettings = {
  taxRate: number;
  memberDiscountPercent: number;
  currency: string;
  loyaltyPointsPerDollar: number;
  silverThreshold: number;
  roseGoldThreshold: number;
  platinumThreshold: number;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  bookingEmailSubject: string;
};

const DEFAULTS: AppSettings = {
  taxRate: 12,
  memberDiscountPercent: 5,
  currency: 'USD',
  loyaltyPointsPerDollar: 1,
  silverThreshold: 0,
  roseGoldThreshold: 2000,
  platinumThreshold: 8000,
  contactEmail: 'hola@aureliaviajes.com',
  contactPhone: '+52 55 0000 0000',
  whatsappNumber: '+525500000000',
  bookingEmailSubject: 'Tu reserva con Aurelia Viajes',
};

let cache: { data: AppSettings; at: number } | null = null;
const TTL_MS = 60_000;

export async function getSettings(): Promise<AppSettings> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  try {
    const rows = await db.select().from(schema.siteSettings).where(eq(schema.siteSettings.id, 1));
    const row = rows[0];
    if (!row) {
      const fresh = { data: { ...DEFAULTS }, at: Date.now() };
      cache = fresh;
      return fresh.data;
    }
    cache = {
      data: {
        taxRate: row.taxRate,
        memberDiscountPercent: row.memberDiscountPercent,
        currency: row.currency,
        loyaltyPointsPerDollar: row.loyaltyPointsPerDollar,
        silverThreshold: row.silverThreshold,
        roseGoldThreshold: row.roseGoldThreshold,
        platinumThreshold: row.platinumThreshold,
        contactEmail: row.contactEmail,
        contactPhone: row.contactPhone,
        whatsappNumber: row.whatsappNumber,
        bookingEmailSubject: row.bookingEmailSubject,
      },
      at: Date.now(),
    };
    return cache.data;
  } catch {
    return { ...DEFAULTS };
  }
}

export function invalidateSettingsCache() {
  cache = null;
}

// Convenience helpers — server-side use only
export async function getTaxRate() {
  return (await getSettings()).taxRate / 100;
}
export async function getMemberDiscountRate() {
  return (await getSettings()).memberDiscountPercent / 100;
}
export async function getPointsPerDollar() {
  return (await getSettings()).loyaltyPointsPerDollar;
}
