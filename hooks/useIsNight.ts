'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true between 18:00 and 5:59 visitor-local time, false otherwise.
 *
 * Always returns `false` during SSR + first client render so the markup
 * matches and we don't get a hydration warning; the real value lands on
 * the next tick via useEffect, which triggers a re-render. Day-time
 * visitors never see a flip; night-time visitors see one ~16ms after
 * paint.
 */
export function useIsNight(): boolean {
  const [isNight, setIsNight] = useState(false);
  useEffect(() => {
    const h = new Date().getHours();
    setIsNight(h < 6 || h >= 18);
  }, []);
  return isNight;
}
