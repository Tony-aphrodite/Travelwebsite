'use client';

import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import AureliaClubCard from './AureliaClubCard';
import TrustBar from './TrustBar';
import { useT } from '@/lib/i18n/LocaleProvider';

type Dest = {
  id: string;
  name: string;
  country: string;
  image: string;
  priceFrom: number;
};

export default function DestinationsSection({ destinations }: { destinations: Dest[] }) {
  const t = useT();
  const four = destinations.slice(0, 4);

  return (
    <section className="py-8 lg:py-10">
      <div className="container-site">
        <div className="flex justify-between items-end gap-4 flex-wrap mb-6">
          <h2 className="font-display text-3xl lg:text-4xl text-plum-700">
            {t.destinations.title}
          </h2>
          <Link
            href="/destinos"
            className="inline-flex items-center gap-1.5 text-sm text-plum-700 font-semibold hover:gap-2.5 transition-all"
          >
            {t.destinations.viewAll}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_1.4fr] gap-5 mb-8">
          {four.map((dest) => (
            <Link
              key={dest.id}
              href={`/hoteles?country=${encodeURIComponent(dest.country)}`}
              className="relative rounded-3xl overflow-hidden shadow-soft-md aspect-[3/4] group transition-all duration-500 hover:-translate-y-1 hover:shadow-soft-xl bg-ivory-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-900/85 via-plum-900/10 to-transparent" />
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ivory-50/95 text-plum-700 hover:bg-white hover:text-rose-700 flex items-center justify-center backdrop-blur-sm transition-colors"
                aria-label="Favorito"
              >
                <Heart size={15} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-ivory-50">
                <h3 className="font-display text-lg lg:text-xl leading-tight">
                  {dest.name}, {dest.country}
                </h3>
                <div className="text-xs opacity-90 mt-1">
                  {t.destinations.from} ${dest.priceFrom.toLocaleString()} USD
                </div>
              </div>
            </Link>
          ))}

          {/* Aurelia Club promo card spans the last column on lg+ */}
          <div className="sm:col-span-2 lg:col-span-1">
            <AureliaClubCard />
          </div>
        </div>

        <TrustBar />
      </div>
    </section>
  );
}
