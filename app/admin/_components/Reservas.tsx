'use client';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import type { Booking } from '../_lib/types';

const STATUS_STYLE: Record<Booking['status'], string> = {
  confirmed: 'bg-sage-500/15 text-sage-500',
  pending: 'bg-gold-600/15 text-gold-700',
  cancelled: 'bg-rose-500/15 text-rose-700',
  completed: 'bg-plum-700/10 text-plum-700',
};

export function Reservas({
  bookings,
  onStatusChange,
}: {
  bookings: Booking[];
  onStatusChange: (id: string, status: Booking['status']) => void;
}) {
  const [filter, setFilter] = useState<'all' | Booking['status']>('all');
  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'confirmed', 'pending', 'cancelled', 'completed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-ghost'}`}
            >
              {s === 'all' ? 'Todas' : s === 'confirmed' ? 'Confirmadas' : s === 'pending' ? 'Pendientes' : s === 'cancelled' ? 'Canceladas' : 'Completadas'}
            </button>
          ))}
        </div>
        <p className="text-xs text-charcoal-500">{filtered.length} reservas</p>
      </div>

      <div className="card-soft overflow-hidden">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-charcoal-500">No hay reservas en esta categoría.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-ivory-100 text-xs uppercase tracking-wider text-charcoal-500">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Viajera</th>
                <th className="px-6 py-3 text-left">Experiencia</th>
                <th className="px-6 py-3 text-left">Fechas</th>
                <th className="px-6 py-3 text-right">Total</th>
                <th className="px-6 py-3 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-t border-ivory-200 hover:bg-ivory-50">
                  <td className="px-6 py-4 font-mono text-xs text-charcoal-500">#{b.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-6 py-4 font-semibold">{b.userName || b.userEmail || 'Usuaria'}</td>
                  <td className="px-6 py-4">{b.itemName}</td>
                  <td className="px-6 py-4 text-charcoal-500 text-xs">
                    {b.checkIn ? new Date(b.checkIn).toLocaleDateString('es-ES') : '—'}
                    {b.checkOut ? ` → ${new Date(b.checkOut).toLocaleDateString('es-ES')}` : ''}
                  </td>
                  <td className="px-6 py-4 text-right font-display text-plum-700">{formatCurrency(b.total)}</td>
                  <td className="px-6 py-4">
                    <select
                      value={b.status}
                      onChange={(e) => onStatusChange(b.id, e.target.value as Booking['status'])}
                      className={`text-xs font-semibold rounded-full px-3 py-1 border-0 cursor-pointer ${STATUS_STYLE[b.status]}`}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="confirmed">Confirmada</option>
                      <option value="cancelled">Cancelada</option>
                      <option value="completed">Completada</option>
                    </select>
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
