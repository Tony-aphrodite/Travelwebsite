'use client';

import { Clock, Tag, ShieldCheck, CalendarCheck, Award } from 'lucide-react';
import { useT } from '@/lib/i18n/LocaleProvider';

/**
 * 5-feature trust bar shown directly below the destinations row.
 * Gold check-circle icons, two-line copy per item.
 */
export default function TrustBar() {
  const t = useT();
  const features = [
    { Icon: Clock, title: t.trust.support, subtitle: t.trust.supportDesc },
    { Icon: Tag, title: t.trust.price, subtitle: t.trust.priceDesc },
    { Icon: ShieldCheck, title: t.trust.payment, subtitle: t.trust.paymentDesc },
    { Icon: CalendarCheck, title: t.trust.flexible, subtitle: t.trust.flexibleDesc },
    { Icon: Award, title: t.trust.confidence, subtitle: t.trust.confidenceDesc },
  ];

  return (
    <div className="card-soft p-6 md:p-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {features.map(({ Icon, title, subtitle }) => (
        <div key={title} className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-plum-900 flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(196,148,53,0.35)]">
            <Icon size={16} strokeWidth={2.4} />
          </div>
          <div>
            <div className="font-display text-sm text-plum-700 font-semibold leading-tight">
              {title}
            </div>
            <div className="text-[11px] text-charcoal-500 mt-0.5 leading-snug">
              {subtitle}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
