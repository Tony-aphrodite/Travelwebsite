'use client';

import { useEffect, useState } from 'react';

/**
 * Picks the hero background image based on the visitor's local time of day.
 *   day   (6:00 – 17:59) → /background1.jpeg
 *   night (18:00 – 5:59) → /background2.jpeg
 *
 * Renders the day image during SSR to avoid a hydration mismatch, then
 * swaps to the correct image on mount with a 700ms fade so the change
 * doesn't pop.
 */
export default function HeroBackground() {
  const [src, setSrc] = useState('/background1.jpeg');

  useEffect(() => {
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 18;
    setSrc(isNight ? '/background2.jpeg' : '/background1.jpeg');
  }, []);

  return (
    <div className="absolute inset-0 -z-0 pointer-events-none">
      {/* Full-bleed photo, full strength (no cream overlay) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${src})` }}
      />
      {/* Soft fade at the very bottom so the next section (search widget)
          seats cleanly into the cream page. */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ivory-50" />
    </div>
  );
}
