'use client';

import Link from 'next/link';
import HeroBackground from './HeroBackground';
import HeroDestinationCarousel from './HeroDestinationCarousel';
import { useIsNight } from '@/hooks/useIsNight';
import { useT } from '@/lib/i18n/LocaleProvider';

export default function HeroSection() {
  const isNight = useIsNight();
  const t = useT();

  return (
    <section
      className={`relative pt-28 pb-24 lg:pb-28 overflow-hidden transition-colors duration-700 ${
        isNight ? 'bg-plum-900' : 'bg-ivory-50'
      }`}
    >
      <HeroBackground isNight={isNight} />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center relative z-10">
        <div className="max-w-[600px]">
          <span
            className={`eyebrow transition-colors duration-700 ${
              isNight ? '!text-gold-400 [&::before]:!bg-gold-400' : ''
            }`}
          >
            {t.hero.eyebrow}
          </span>

          <h1
            className={`heading-xl mt-6 mb-6 text-balance transition-colors duration-700 ${
              isNight
                ? '!text-ivory-50 drop-shadow-[0_3px_18px_rgba(0,0,0,0.55)]'
                : 'drop-shadow-[0_2px_10px_rgba(255,255,255,0.65)]'
            }`}
          >
            {t.hero.headlinePart1}{' '}
            <span
              className={`italic-script transition-colors duration-700 ${
                isNight ? '!text-gold-300' : ''
              }`}
            >
              {t.hero.headlineScript}
            </span>{' '}
            {t.hero.headlinePart2}
          </h1>

          <p
            className={`text-[18px] mb-8 max-w-[500px] leading-relaxed transition-colors duration-700 ${
              isNight
                ? 'text-ivory-100 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]'
                : 'text-charcoal-700 drop-shadow-[0_1px_6px_rgba(255,255,255,0.7)]'
            }`}
          >
            {t.hero.subtitle}
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link href="#search" className="btn btn-primary btn-lg">
              {t.hero.ctaPrimary}
            </Link>
            <Link
              href="/destinos"
              className={`btn btn-lg btn-outline ${isNight ? 'btn-on-dark' : ''}`}
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <HeroDestinationCarousel isNight={isNight} />
      </div>
    </section>
  );
}
