'use client';

import { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, ShoppingCart } from 'lucide-react';

const TAX_RATE = 0.12;
const AURELIA_DISCOUNT_RATE = 0.05;

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}
function plusDaysIso(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function HotelBookingCard({
  type,
  itemId,
  itemName,
  itemImage,
  unitPrice,
}: {
  type: 'hotel' | 'villa';
  itemId: string;
  itemName: string;
  itemImage: string;
  unitPrice: number;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const [checkIn, setCheckIn] = useState(todayIso());
  const [checkOut, setCheckOut] = useState(plusDaysIso(5));
  const [guests, setGuests] = useState(2);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const nights = useMemo(() => {
    const a = new Date(checkIn).getTime();
    const b = new Date(checkOut).getTime();
    const diff = Math.round((b - a) / (24 * 60 * 60 * 1000));
    return Math.max(1, diff);
  }, [checkIn, checkOut]);

  const subtotal = unitPrice * nights;
  const taxes = Math.round(subtotal * TAX_RATE);
  const aureliaDiscount = Math.round(subtotal * AURELIA_DISCOUNT_RATE);
  const total = subtotal + taxes - aureliaDiscount;

  async function handleReserve() {
    setError('');
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('La fecha de salida debe ser posterior a la entrada');
      return;
    }
    if (!session) {
      router.push('/auth/login');
      return;
    }
    setPending(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          itemId,
          itemName,
          itemImage,
          unitPrice,
          quantity: nights,
          checkIn,
          checkOut,
          guests,
        }),
      });
      if (res.ok) {
        router.push('/carrito');
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(typeof data.error === 'string' ? data.error : 'No se pudo agregar al carrito');
    } catch {
      setError('Error de red. Intenta de nuevo.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="card-soft p-8 shadow-soft-lg">
      <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-ivory-200">
        <strong className="font-display text-4xl text-plum-700">${unitPrice}</strong>
        <span className="text-charcoal-500 text-sm">USD / noche</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="field-label">Entrada</label>
          <input
            type="date"
            value={checkIn}
            min={todayIso()}
            onChange={(e) => setCheckIn(e.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label">Salida</label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="field-input"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="field-label">Huespedes</label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="field-input"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? 'huesped' : 'huespedes'}
            </option>
          ))}
        </select>
      </div>

      <div className="p-5 bg-ivory-100 rounded-xl my-5 text-sm">
        <div className="flex justify-between mb-2">
          <span>
            ${unitPrice} x {nights} {nights === 1 ? 'noche' : 'noches'}
          </span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Impuestos</span>
          <span>${taxes.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sage-500">
          <span>Descuento Aurelia Society</span>
          <span>-${aureliaDiscount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between pt-3 mt-3 border-t border-ivory-300 font-display text-lg text-plum-700 font-semibold">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>

      {error && <p className="text-sm text-rose-700 mb-3 text-center">{error}</p>}

      <button onClick={handleReserve} disabled={pending} className="btn btn-primary btn-lg w-full">
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Reservando...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <ShoppingCart size={16} /> Reservar ahora
          </span>
        )}
      </button>
      <p className="text-center text-xs text-charcoal-500 mt-3">
        No se te cobrara aun. Cancelacion gratis.
      </p>
    </div>
  );
}
