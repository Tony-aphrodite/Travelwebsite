'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Shield,
  Tag,
  Lock,
  Check,
  Calendar,
  Users,
  MapPin,
  Loader2,
} from 'lucide-react';

type CartItem = {
  id: number;
  userId: string;
  type: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  unitPrice: number;
  quantity: number;
  checkIn: string | null;
  checkOut: string | null;
  guests: number | null;
  createdAt: string;
};

export default function CarritoPage() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<number | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/cart')
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) setItems(data);
        })
        .finally(() => setLoading(false));
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it
      )
    );
  };

  const removeItem = async (id: number) => {
    setRemoving(id);
    try {
      await fetch(`/api/cart?id=${id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((it) => it.id !== id));
    } finally {
      setRemoving(null);
    }
  };

  const applyPromo = () => {
    setPromoError('');
    if (promoCode.toUpperCase() === 'BIENVENIDA20') {
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
      setPromoError('Codigo invalido');
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setCheckingOut(false);
    }
  };

  const subtotal = items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
  const taxes = Math.round(subtotal * 0.12);
  const discount = promoApplied ? Math.round(subtotal * 0.2) : 0;
  const aureliaDiscount = Math.round(subtotal * 0.05);
  const total = subtotal + taxes - discount - aureliaDiscount;

  if (status === 'loading' || loading) {
    return (
      <div className="pt-28 pb-20 bg-ivory-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="text-plum-700 animate-spin mx-auto mb-4" />
          <p className="text-charcoal-500">Cargando tu carrito...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="pt-28 pb-20 bg-ivory-100 min-h-screen">
        <div className="container-site">
          <div className="card-soft p-16 text-center">
            <ShoppingBag size={48} className="text-plum-700 mx-auto mb-4 opacity-50" />
            <h2 className="font-display text-2xl mb-2">Inicia sesion para ver tu carrito</h2>
            <p className="text-charcoal-500 mb-6">
              Necesitas una cuenta para agregar experiencias a tu carrito
            </p>
            <Link href="/auth/login" className="btn btn-primary btn-md">
              Iniciar sesion
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-ivory-100 min-h-screen">
      <div className="container-site">
        <div className="text-xs text-charcoal-500 mb-6 flex gap-2 uppercase tracking-wider">
          <Link href="/" className="text-plum-700">
            Inicio
          </Link>
          <span>/</span>
          <span>Resumen de viaje</span>
        </div>

        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-full bg-plum-700 text-white flex items-center justify-center">
            <ShoppingBag size={22} />
          </div>
          <div>
            <h1 className="heading-lg">Tu viaje en construccion</h1>
            <p className="text-charcoal-500 text-sm">
              {items.length} {items.length === 1 ? 'experiencia' : 'experiencias'} en tu carrito
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="card-soft p-16 text-center">
            <ShoppingBag size={48} className="text-plum-700 mx-auto mb-4 opacity-50" />
            <h2 className="font-display text-2xl mb-2">Tu carrito esta vacio</h2>
            <p className="text-charcoal-500 mb-6">
              Comienza a planificar tu proxima aventura con Aurelia
            </p>
            <Link href="/" className="btn btn-primary btn-md">
              Explorar destinos
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_420px] gap-10">
            {/* Items */}
            <div className="space-y-5">
              {items.map((it) => (
                <article key={it.id} className="card-soft overflow-hidden">
                  <div className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr]">
                    <div className="relative aspect-square">
                      <img
                        src={it.itemImage}
                        alt={it.itemName}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-white/95 text-plum-700 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full font-semibold">
                        {it.type}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-charcoal-500 mb-1">
                            <MapPin size={11} />
                            {it.itemName}
                          </div>
                          <h3 className="font-display text-xl leading-tight">{it.itemName}</h3>
                          {(it.checkIn || it.checkOut) && (
                            <div className="text-xs text-charcoal-500 mt-1 flex items-center gap-1">
                              <Calendar size={11} />
                              {it.checkIn && it.checkOut
                                ? `${it.checkIn} - ${it.checkOut}`
                                : it.checkIn || it.checkOut}
                              {it.guests && ` · ${it.guests} huespedes`}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(it.id)}
                          disabled={removing === it.id}
                          className="text-charcoal-500 hover:text-plum-700 p-1"
                          aria-label="Eliminar"
                        >
                          {removing === it.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>

                      <div className="flex items-end justify-between mt-auto pt-4">
                        <div className="flex items-center gap-2 bg-ivory-100 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQty(it.id, -1)}
                            className="w-7 h-7 rounded-full bg-white text-plum-700 flex items-center justify-center hover:bg-plum-700 hover:text-white transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-semibold min-w-[24px] text-center">
                            {it.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(it.id, 1)}
                            className="w-7 h-7 rounded-full bg-white text-plum-700 flex items-center justify-center hover:bg-plum-700 hover:text-white transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] text-charcoal-500">
                            ${it.unitPrice} x {it.quantity}
                          </div>
                          <div className="font-display text-2xl text-plum-700 leading-none">
                            ${(it.unitPrice * it.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Secure payment info */}
              <div className="card-soft p-7 mt-8">
                <div className="flex items-center gap-2 text-sm text-charcoal-700">
                  <Lock size={16} className="text-plum-700" />
                  <span>
                    El pago se procesara de forma segura a traves de Stripe. Tus datos estan
                    protegidos con encriptacion SSL de 256 bits.
                  </span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <aside className="h-fit lg:sticky lg:top-28 space-y-5">
              <div className="card-soft p-7 shadow-soft-lg">
                <h2 className="font-display text-2xl mb-5">Resumen del viaje</h2>

                {/* Promo */}
                <div className="mb-5">
                  <label className="field-label flex items-center gap-1">
                    <Tag size={12} /> Codigo promocional
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoError('');
                      }}
                      placeholder="BIENVENIDA20"
                      className="field-input flex-1"
                    />
                    <button
                      onClick={applyPromo}
                      className="btn btn-outline btn-sm"
                    >
                      {promoApplied ? <Check size={14} /> : 'Aplicar'}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-xs text-rose-400 mt-1">{promoError}</p>
                  )}
                </div>

                <div className="space-y-3 py-5 border-y border-ivory-200 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500">Impuestos (12%)</span>
                    <span>${taxes.toLocaleString()}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-sage-500">
                      <span>Codigo BIENVENIDA20 (-20%)</span>
                      <span>-${discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sage-500">
                    <span>Descuento Aurelia Society</span>
                    <span>-${aureliaDiscount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline py-5">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-3xl text-plum-700">
                    ${total.toLocaleString()}
                    <small className="text-sm text-charcoal-500 ml-1">USD</small>
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="btn btn-primary btn-lg w-full"
                >
                  {checkingOut ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={18} className="animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    'Confirmar y pagar'
                  )}
                </button>
                <p className="text-center text-xs text-charcoal-500 mt-3">
                  Cancelacion gratis hasta 48h antes del viaje
                </p>
              </div>

              <div className="bg-rose-100 rounded-2xl p-5 flex gap-3">
                <Shield size={20} className="text-plum-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-charcoal-700">
                  <strong className="block text-charcoal-900 mb-1">Proteccion Aurelia incluida</strong>
                  Asistencia 24/7, cobertura medica internacional y reembolso completo por causa
                  mayor.
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center text-xs text-charcoal-500">
                <Users size={12} />
                <span>+15,000 viajeras han confiado en nosotras</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
