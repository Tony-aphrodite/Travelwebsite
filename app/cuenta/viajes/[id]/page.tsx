import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { Calendar, Users, CreditCard, Award, ArrowLeft, MapPin, Tag } from 'lucide-react';
import { auth } from '@/lib/auth';
import { getBookingById } from '@/lib/db/queries';
import { formatCurrency } from '@/lib/utils';

function getTypeDetailUrl(type: string, itemId: string) {
  switch (type) {
    case 'hotel':
    case 'villa':
      return `/hotel/${itemId}`;
    case 'package':
      return '/paquetes';
    case 'flight':
      return '/vuelos';
    case 'car':
      return '/autos';
    case 'activity':
      return '/actividades';
    default:
      return '/';
  }
}

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-sage-500/15 text-sage-500',
  pending: 'bg-gold-600/15 text-gold-700',
  cancelled: 'bg-red-500/15 text-red-600',
  completed: 'bg-plum-700/10 text-plum-700',
};

const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Confirmada',
  pending: 'Pendiente',
  cancelled: 'Cancelada',
  completed: 'Completada',
};

function fmtDate(d: Date | string | null) {
  if (!d) return 'Por confirmar';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');

  const booking = await getBookingById(id, session.user.id);
  if (!booking) notFound();

  const statusKey = booking.status as string;
  const statusClass = STATUS_STYLES[statusKey] || 'bg-ivory-200 text-charcoal-700';
  const statusLabel = STATUS_LABELS[statusKey] || statusKey;

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-site max-w-4xl">
        <Link
          href="/cuenta?tab=viajes"
          className="inline-flex items-center gap-2 text-sm text-gold-500 hover:underline mb-6"
        >
          <ArrowLeft size={14} /> Volver a mis viajes
        </Link>

        <div className="card-soft p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <div className="text-xs text-charcoal-500 font-mono mb-1">
                Reserva #{booking.id.slice(0, 8).toUpperCase()}
              </div>
              <h1 className="heading-lg">{booking.itemName}</h1>
              <div className="text-sm text-charcoal-500 mt-1 flex items-center gap-1">
                <MapPin size={12} /> {booking.type}
              </div>
            </div>
            <span className={`status-pill ${statusClass}`}>{statusLabel}</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 py-6 border-y border-ivory-200">
            <div>
              <div className="text-xs uppercase tracking-widest text-charcoal-500 flex items-center gap-1 mb-1">
                <Calendar size={12} /> Check-in
              </div>
              <div className="font-display text-lg">{fmtDate(booking.checkIn)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-charcoal-500 flex items-center gap-1 mb-1">
                <Calendar size={12} /> Check-out
              </div>
              <div className="font-display text-lg">{fmtDate(booking.checkOut)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-charcoal-500 flex items-center gap-1 mb-1">
                <Users size={12} /> Huespedes
              </div>
              <div className="font-display text-lg">{booking.guests}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-charcoal-500 flex items-center gap-1 mb-1">
                <Tag size={12} /> Cantidad
              </div>
              <div className="font-display text-lg">{booking.quantity}</div>
            </div>
          </div>

          <div className="py-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-500">Subtotal</span>
              <span>{formatCurrency(booking.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Impuestos</span>
              <span>{formatCurrency(booking.taxes)}</span>
            </div>
            {booking.discount > 0 && (
              <div className="flex justify-between text-sage-500">
                <span>Descuento</span>
                <span>-{formatCurrency(booking.discount)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-3 border-t border-ivory-200">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-2xl text-plum-700">
                {formatCurrency(booking.total)}
              </span>
            </div>
            {booking.pointsEarned > 0 && (
              <div className="flex justify-between text-xs text-plum-700 pt-2">
                <span className="flex items-center gap-1">
                  <Award size={12} /> Puntos Aurelia Society
                </span>
                <span>+{booking.pointsEarned}</span>
              </div>
            )}
          </div>

          {booking.stripeSessionId && (
            <div className="text-xs text-charcoal-500 flex items-center gap-2 pt-4 border-t border-ivory-200">
              <CreditCard size={12} /> Pagado via Stripe · Sesion {booking.stripeSessionId.slice(0, 14)}...
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href={getTypeDetailUrl(booking.type, booking.itemId)}
              className="btn btn-outline btn-md"
            >
              Ver propiedad
            </Link>
            <Link href="/contacto" className="btn btn-ghost btn-md">
              Necesito ayuda
            </Link>
          </div>

          {booking.notes && (
            <div className="mt-8 p-5 bg-ivory-100 rounded-xl text-sm text-charcoal-700">
              <strong className="block mb-1 text-charcoal-900">Notas</strong>
              {booking.notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
