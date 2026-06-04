'use client';

/**
 * Renders the full-bleed hero background. The day/night decision lives
 * in the parent (HeroSection) so the background, headline, carousel and
 * navbar can all agree on a single isNight value without each computing
 * their own and flickering separately.
 */
export default function HeroBackground({ isNight }: { isNight: boolean }) {
  const src = isNight ? '/background2.jpeg' : '/background1.jpeg';

  return (
    <div className="absolute inset-0 -z-0 pointer-events-none">
      {/* Full-bleed photo, full strength (no cream overlay) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${src})` }}
      />
      {/* Soft fade at the very bottom so the next section (search widget)
          seats cleanly into the page color. */}
      <div
        className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent ${
          isNight ? 'to-plum-900' : 'to-ivory-50'
        }`}
      />
    </div>
  );
}
