'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { useT } from '@/lib/i18n/LocaleProvider';

type Destination = {
  city: string;
  country?: string;
  image: string;
  priceFrom: number;
  badge?: string;
};

// Curated set used purely for the hero showcase. The customer's
// real /destinos list still lives in the DB; this is the front-page
// visual hero and is hand-tuned for impact.
const DESTINATIONS: Destination[] = [
  {
    city: 'Maldivas',
    image:
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=80',
    priceFrom: 2250,
  },
  {
    city: 'Santorini',
    country: 'Grecia',
    image:
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=900&q=80',
    priceFrom: 1320,
    badge: 'Recomendado',
  },
  {
    city: 'Suiza',
    image:
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=900&q=80',
    priceFrom: 1950,
  },
  {
    city: 'Bali',
    country: 'Indonesia',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80',
    priceFrom: 1450,
  },
  {
    city: 'Kioto',
    country: 'Japón',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80',
    priceFrom: 1650,
  },
  {
    city: 'Dubái',
    country: 'EAU',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80',
    priceFrom: 1850,
  },
];

export default function HeroDestinationCarousel({ isNight }: { isNight: boolean }) {
  const [index, setIndex] = useState(0);
  const t = useT();
  const N = DESTINATIONS.length;

  const prev = () => setIndex((i) => (i - 1 + N) % N);
  const next = () => setIndex((i) => (i + 1) % N);

  const left = DESTINATIONS[(index - 1 + N) % N];
  const center = DESTINATIONS[index];
  const right = DESTINATIONS[(index + 1) % N];

  return (
    <div className="relative h-[420px] lg:h-[500px] flex items-center justify-center">
      {/* Left arrow — same high-contrast ivory pill in both modes so it
          stays readable regardless of how dark the photo is behind it. */}
      <button
        onClick={prev}
        aria-label={t.hero.carouselPrev}
        className="absolute left-0 lg:-left-2 z-30 w-12 h-12 rounded-full bg-ivory-50/95 text-plum-700 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-ivory-50/40 flex items-center justify-center transition-all hover:scale-110 hover:bg-white"
      >
        <ChevronLeft size={22} />
      </button>

      <div className="flex items-end gap-3 lg:gap-4 px-12 lg:px-14">
        <Card data={left} variant="side" />
        <Card data={center} variant="center" />
        <Card data={right} variant="side" />
      </div>

      {/* Right arrow */}
      <button
        onClick={next}
        aria-label={t.hero.carouselNext}
        className="absolute right-0 lg:-right-2 z-30 w-12 h-12 rounded-full bg-ivory-50/95 text-plum-700 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-ivory-50/40 flex items-center justify-center transition-all hover:scale-110 hover:bg-white"
      >
        <ChevronRight size={22} />
      </button>

      {/* Page dots */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
        {DESTINATIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir al destino ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index
                ? isNight ? 'w-6 bg-gold-400' : 'w-6 bg-plum-700'
                : isNight ? 'w-1.5 bg-ivory-50/50' : 'w-1.5 bg-plum-700/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ data, variant }: { data: Destination; variant: 'side' | 'center' }) {
  const isCenter = variant === 'center';
  const t = useT();
  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
        isCenter
          ? 'w-[180px] lg:w-[220px] h-[280px] lg:h-[340px] shadow-[0_24px_50px_-12px_rgba(11,21,53,0.55)] z-20'
          : 'w-[150px] lg:w-[175px] h-[230px] lg:h-[280px] shadow-[0_18px_38px_-12px_rgba(11,21,53,0.40)] z-10 opacity-90 hover:opacity-100'
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.image}
        alt={data.city}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* RECOMENDADO ribbon on the center card */}
      {isCenter && data.badge && (
        <div className="absolute top-3 right-0 bg-gold-500 text-plum-900 text-[9px] lg:text-[10px] uppercase tracking-[0.18em] font-bold pl-3 pr-4 py-1 rounded-l-full shadow-soft flex items-center gap-1">
          <Award size={11} />
          {data.badge}
        </div>
      )}

      {/* Bottom name/price gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-plum-900/85 via-plum-900/10 to-transparent" />
      <div className={`absolute bottom-0 left-0 right-0 ${isCenter ? 'p-4 lg:p-5' : 'p-3 lg:p-4'} text-ivory-50`}>
        <div className={`font-display ${isCenter ? 'text-base lg:text-lg' : 'text-sm lg:text-base'}`}>
          {data.city}
          {data.country && (
            <span className="font-normal text-ivory-100/80">, {data.country}</span>
          )}
        </div>
        <div className={`opacity-90 ${isCenter ? 'text-[11px] lg:text-xs' : 'text-[10px] lg:text-[11px]'}`}>
          {t.hero.desde} ${data.priceFrom.toLocaleString()} USD
        </div>
      </div>
    </div>
  );
}
