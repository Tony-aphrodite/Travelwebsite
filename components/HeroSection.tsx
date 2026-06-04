'use client';

import Link from 'next/link';
import { Play } from 'lucide-react';
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

      <div className="max-w-[1440px] mx-auto pl-6 pr-2 lg:pl-10 lg:pr-4 grid lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-4 items-center relative z-10">
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

          <div className="flex gap-5 flex-wrap items-center">
            <Link href="#search" className="btn btn-primary btn-lg">
              {t.hero.ctaPrimary}
            </Link>

            {/* Secondary CTA — circular play button + text label,
                matching the customer's reference design. */}
            <Link
              href="/destinos"
              className="group inline-flex items-center gap-3"
            >
              <span
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-soft-lg ${
                  isNight
                    ? 'bg-ivory-50/15 text-ivory-50 border border-ivory-50/30 backdrop-blur-md group-hover:bg-ivory-50/25'
                    : 'bg-plum-900 text-ivory-50 shadow-[0_8px_18px_rgba(11,21,53,0.30)] group-hover:bg-plum-700'
                }`}
              >
                <Play size={16} fill="currentColor" className="ml-0.5" />
              </span>
              <span
                className={`font-semibold text-base transition-colors duration-300 ${
                  isNight
                    ? 'text-ivory-50 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
                    : 'text-plum-900 group-hover:text-plum-700'
                }`}
              >
                {t.hero.ctaSecondary}
              </span>
            </Link>
          </div>
        </div>

        <HeroDestinationCarousel isNight={isNight} />
      </div>
    </section>
  );
}
