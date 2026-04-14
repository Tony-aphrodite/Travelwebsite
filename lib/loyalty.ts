export type LoyaltyTier = 'silver' | 'rose_gold' | 'platinum';

export const TIER_THRESHOLDS = {
  silver: 0,
  rose_gold: 2000,
  platinum: 8000,
} as const;

export const TIER_DISCOUNTS = {
  silver: 0.05,
  rose_gold: 0.10,
  platinum: 0.15,
} as const;

export const TIER_LABELS: Record<LoyaltyTier, string> = {
  silver: 'Silver',
  rose_gold: 'Rose Gold',
  platinum: 'Platinum',
};

export function calculatePointsEarned(totalUsd: number): number {
  // 1 point per $10 spent
  return Math.floor(totalUsd / 10);
}

export function getTierForPoints(points: number): LoyaltyTier {
  if (points >= TIER_THRESHOLDS.platinum) return 'platinum';
  if (points >= TIER_THRESHOLDS.rose_gold) return 'rose_gold';
  return 'silver';
}

export function getDiscountForTier(tier: LoyaltyTier): number {
  return TIER_DISCOUNTS[tier];
}

export function pointsToNextTier(currentPoints: number, currentTier: LoyaltyTier): number | null {
  if (currentTier === 'platinum') return null;
  const nextTier = currentTier === 'silver' ? 'rose_gold' : 'platinum';
  return TIER_THRESHOLDS[nextTier] - currentPoints;
}

export function pointsToUsd(points: number): number {
  // 100 points = $1 discount
  return Math.floor(points / 100);
}
