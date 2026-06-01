'use client';
import { DollarSign, Calendar, Users, Star, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { Stats, Booking } from '../_lib/types';

const STATUS_STYLE: Record<Booking['status'], string> = {
  confirmed: 'bg-sage-500/15 text-sage-500',
  pending: 'bg-gold-600/15 text-gold-700',
  cancelled: 'bg-rose-500/15 text-rose-700',
  completed: 'bg-plum-700/10 text-plum-700',
};
const STATUS_LABEL: Record<Booking['status'], string> = {
  confirmed: 'Confirmada', pending: 'Pendiente', cancelled: 'Cancelada', completed: 'Completada',
};

export function Dashboard({ stats, recent }: { stats: Stats | null; recent: Booking[] }) {
  const kpis = [
    { label: 'Ingresos totales', value: stats ? formatCurrency(stats.revenue) : '—', icon: DollarSign, bg: 'from-plum-700 to-plum-500' },
    { label: 'Reservas totales', value: stats ? stats.bookings.toLocaleString() : '—', icon: Calendar, bg: 'from-gold-600 to-gold-500' },
    { label: 'Usuarias registradas', value: stats ? stats.users.toLocaleString() : '—', icon: Users, bg: 'from-rose-700 to-rose-500' },
    { label: 'Hoteles activos', value: stats ? stats.hotels.toLocaleString() : '—', icon: Star, bg: 'from-sage-500 to-sage-300' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="card-soft p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${k.bg} text-white flex items-center justify-center`}>
                  <Icon size={18} />
                </div>
                <span className="text-xs text-sage-500 font-semibold flex items-center gap-1">
                  <ArrowUpRight size={12} /> en vivo
                </span>
              </div>
              <div className="text-xs text-charcoal-500 uppercase tracking-wider">{k.label}</div>
              <div className="font-display text-3xl text-plum-700 mt-1">{k.value}</div>
            </div>
          );
        })}
      </div>

      <div className="card-soft overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-ivory-200">
          <div>
            <h3 className="font-display text-xl">Reservas recientes</h3>
            <p className="text-xs text-charcoal-500">Últimas 6 reservas registradas</p>
          </div>
        </div>
        {recent.length === 0 ? (
          <p className="p-8 text-center text-sm text-charcoal-500">No hay reservas aún.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-ivory-100 text-xs uppercase tracking-wider text-charcoal-500">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Viajera</th>
                <th className="px-6 py-3 text-left">Experiencia</th>
                <th className="px-6 py-3 text-right">Monto</th>
                <th className="px-6 py-3 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((b) => (
                <tr key={b.id} className="border-t border-ivory-200 hover:bg-ivory-50">
                  <td className="px-6 py-4 font-mono text-xs text-charcoal-500">#{b.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-6 py-4 font-semibold">{b.userName || b.userEmail || 'Usuaria'}</td>
                  <td className="px-6 py-4 text-charcoal-700">{b.itemName}</td>
                  <td className="px-6 py-4 text-right font-display text-plum-700">{formatCurrency(b.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`status-pill ${STATUS_STYLE[b.status]}`}>{STATUS_LABEL[b.status]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
