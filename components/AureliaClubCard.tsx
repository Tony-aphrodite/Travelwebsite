'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Crown } from 'lucide-react';
import { useT } from '@/lib/i18n/LocaleProvider';

/**
 * "Aurelia Club" promo card that sits to the right of the destinations
 * row on the homepage. For guests it pushes registration; for logged-in
 * users it points to their rewards tab.
 */
export default function AureliaClubCard() {
  const { status } = useSession();
  const t = useT();
  const target = status === 'authenticated' ? '/cuenta?tab=recompensas' : '/auth/registro';

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-rose-100 via-gold-100 to-ivory-50 min-h-[300px] flex flex-col justify-between p-7 group shadow-soft-md">
      {/* Photo on the right side */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&q=80"
        alt=""
        className="absolute inset-y-0 right-0 w-[60%] h-full object-cover opacity-90"
      />
      {/* Soft gradient masking the right photo into the cream background */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-100 via-rose-100/85 via-40% to-transparent" />

      <div className="relative z-10 max-w-[55%]">
        <div className="inline-flex items-center gap-1.5 text-gold-700 text-xs uppercase tracking-[0.18em] font-bold mb-2">
          <Crown size={14} fill="currentColor" />
          {t.club.title}
        </div>
        <p className="text-charcoal-700 text-sm leading-relaxed mb-6">
          {t.club.tagline}
        </p>
      </div>

      <div className="relative z-10">
        <Link
          href={target}
          className="inline-flex items-center gap-2 bg-plum-900 text-ivory-50 px-6 py-3 rounded-full text-sm font-semibold hover:bg-plum-700 hover:-translate-y-0.5 transition-all shadow-[0_8px_18px_rgba(11,21,53,0.30)]"
        >
          {t.club.cta}
        </Link>
      </div>
    </div>
  );
}
