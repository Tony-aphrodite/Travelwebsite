import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 to-rose-100 px-6 pt-24 pb-16">
      <div className="card-soft p-12 w-full max-w-lg text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage-300/30 flex items-center justify-center">
          <CheckCircle size={40} className="text-sage-500" />
        </div>
        <h1 className="font-display text-3xl text-charcoal-900 mb-3">¡Reserva confirmada!</h1>
        <p className="text-charcoal-500 mb-2">
          Tu pago se ha procesado exitosamente. Hemos enviado un email de confirmacion con los detalles de tu reserva.
        </p>
        <p className="text-sm text-gold-700 font-semibold mb-8">
          Has ganado puntos Aurelia Society con esta reserva
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/cuenta" className="btn btn-primary btn-lg">
            Mis viajes
          </Link>
          <Link href="/" className="btn btn-outline btn-lg">
            Seguir explorando
          </Link>
        </div>
      </div>
    </section>
  );
}
