'use client';
import { useMemo } from 'react';
import { formatCurrency } from '@/lib/utils';
import type { Booking } from '../_lib/types';

export function Reportes({ bookings }: { bookings: Booking[] }) {
  const byType = useMemo(() => {
    const map = new Map<string, { count: number; revenue: number }>();
    for (const b of bookings) {
      const cur = map.get(b.type) || { count: 0, revenue: 0 };
      map.set(b.type, { count: cur.count + 1, revenue: cur.revenue + b.total });
    }
    const arr = Array.from(map.entries()).map(([type, v]) => ({ type, ...v }));
    arr.sort((a, b) => b.revenue - a.revenue);
    const total = arr.reduce((s, x) => s + x.revenue, 0) || 1;
    return arr.map((x) => ({ ...x, pct: Math.round((x.revenue / total) * 100) }));
  }, [bookings]);

  return (
    <div className="space-y-6">
      <div className="card-soft p-6">
        <h3 className="font-display text-xl mb-2">Ingresos por categoría</h3>
        <p className="text-xs text-charcoal-500 mb-5">Distribución del total reservado</p>
        {byType.length === 0 ? (
          <p className="text-sm text-charcoal-500">Sin datos suficientes todavía.</p>
        ) : (
          <div className="space-y-3">
            {byType.map((c) => (
              <div key={c.type}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold capitalize">{c.type}</span>
                  <span className="text-charcoal-500">
                    {formatCurrency(c.revenue)} · {c.count} reservas · {c.pct}%
                  </span>
                </div>
                <div className="h-3 bg-ivory-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-plum-700 to-rose-500" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
