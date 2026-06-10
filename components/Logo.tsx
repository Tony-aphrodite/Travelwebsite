import Link from 'next/link';

/*
 * Aurelia brand mark — a compass wind-rose.
 *
 * Navigation and discovery, struck as a plum seal on a brushed-gold medallion.
 * A sharp four-point cardinal star sits over a softer diagonal star (the
 * eight-point wind rose of old sea charts), with a knockout center. No
 * letterform — a pure travel emblem with the etymological gold of "aurum".
 */
function LogoMark({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="Aurelia"
      className={className}
    >
      <defs>
        <linearGradient id="aurelia-gold" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EAD09A" />
          <stop offset="0.45" stopColor="#DCB060" />
          <stop offset="1" stopColor="#A07025" />
        </linearGradient>
      </defs>

      {/* medallion */}
      <circle cx="20" cy="20" r="19" fill="url(#aurelia-gold)" />
      {/* hairline inner ring — the "struck seal" detail */}
      <circle cx="20" cy="20" r="15.4" fill="none" stroke="#0B1535" strokeOpacity="0.22" strokeWidth="0.7" />

      {/* diagonal (intercardinal) star — softer, sits behind */}
      <path
        d="M26.36 13.64 L20 17.2 L13.64 13.64 L17.2 20 L13.64 26.36 L20 22.8 L26.36 26.36 L22.8 20 Z"
        fill="#0B1535"
        fillOpacity="0.38"
      />
      {/* cardinal star — sharp N/E/S/W points */}
      <path
        d="M20 6 L22.7 17.3 L34 20 L22.7 22.7 L20 34 L17.3 22.7 L6 20 L17.3 17.3 Z"
        fill="#0B1535"
        strokeLinejoin="round"
      />
      {/* knockout center pivot */}
      <circle cx="20" cy="20" r="1.7" fill="url(#aurelia-gold)" />
    </svg>
  );
}

/**
 * Full lockup: emblem + "Aurelia" wordmark, wrapped in a link to home.
 * `tone` controls the wordmark color for light-on-dark vs. light surfaces.
 */
export default function Logo({
  tone = 'dark',
  size = 36,
  className = '',
}: {
  tone?: 'dark' | 'light';
  size?: number;
  className?: string;
}) {
  return (
    <Link href="/" aria-label="Aurelia — inicio" className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} className="shadow-soft rounded-full" />
      <span
        className={`font-display text-[1.55rem] font-bold tracking-[-0.01em] leading-none transition-colors duration-500 ${
          tone === 'light'
            ? 'text-ivory-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]'
            : 'text-plum-700'
        }`}
      >
        Aurelia
      </span>
    </Link>
  );
}

export { LogoMark };
