'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Loader2,
  CheckCircle,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const OFFICES = [
  {
    city: 'Ciudad de Mexico',
    address: 'Polanco, Av. Presidente Masaryk 111',
    phone: '+52 55 5000 1234',
    email: 'mexico@aurelia.com',
  },
  {
    city: 'Madrid',
    address: 'Barrio de Salamanca, Calle Serrano 45',
    phone: '+34 91 000 5678',
    email: 'madrid@aurelia.com',
  },
  {
    city: 'Buenos Aires',
    address: 'Palermo Chico, Av. del Libertador 3200',
    phone: '+54 11 4000 9012',
    email: 'buenosaires@aurelia.com',
  },
];

const REASONS = [
  'Planificar un viaje',
  'Consulta sobre reserva',
  'Programa Aurelia Society',
  'Alianzas y prensa',
  'Trabaja con nosotras',
  'Otro',
];

export default function ContactoPage() {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    reason: REASONS[0],
    message: '',
    privacy: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);

  const updateField = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          reason: form.reason,
          message: form.message,
        }),
      });
      if (res.ok) {
        setResult('success');
        setForm({ name: '', lastName: '', email: '', phone: '', reason: REASONS[0], message: '', privacy: false });
      } else {
        setResult('error');
      }
    } catch {
      setResult('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos de tu <span class='italic-script'>proximo viaje</span>"
        subtitle="Nuestras expertas responden en menos de 2 horas. Cuentanos como podemos ayudarte."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Contacto' }]}
      />

      {/* Quick cards */}
      <section className="container-site -mt-8 relative z-10 mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickCard
            icon={MessageCircle}
            title="WhatsApp"
            value="+52 55 1234 5678"
            action="Chatear ahora"
            accent="bg-gradient-to-br from-sage-500 to-sage-400"
          />
          <QuickCard
            icon={Phone}
            title="Llamanos"
            value="+52 55 5000 1234"
            action="Lun-Sab 9-20h"
            accent="bg-gradient-to-br from-plum-700 to-plum-500"
          />
          <QuickCard
            icon={Mail}
            title="Email"
            value="hola@aurelia.com"
            action="Respuesta en 2h"
            accent="bg-gradient-to-br from-gold-600 to-gold-400"
          />
          <QuickCard
            icon={Clock}
            title="Atencion 24/7"
            value="Para clientes activos"
            action="En destino"
            accent="bg-gradient-to-br from-rose-400 to-rose-300"
          />
        </div>
      </section>

      {/* Form + info */}
      <section className="container-site pb-20">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10">
          {/* Form */}
          <div className="card-soft p-8 lg:p-12">
            <h2 className="heading-md mb-2">Escribenos</h2>
            <p className="text-charcoal-500 mb-8">
              Completa el formulario y una experta te contactara pronto.
            </p>

            {result === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-sage-100 text-sage-500 flex items-center gap-3">
                <CheckCircle size={20} />
                <span>Mensaje enviado con exito. Te contactaremos pronto.</span>
              </div>
            )}
            {result === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-rose-100 text-rose-400 flex items-center gap-3">
                <AlertCircle size={20} />
                <span>Error al enviar el mensaje. Intentalo de nuevo.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Nombre</label>
                  <input
                    type="text"
                    placeholder="Sofia"
                    className="field-input"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="field-label">Apellidos</label>
                  <input
                    type="text"
                    placeholder="Martinez"
                    className="field-input"
                    value={form.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Email</label>
                  <input
                    type="email"
                    placeholder="sofia@email.com"
                    className="field-input"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="field-label">Telefono</label>
                  <input
                    type="tel"
                    placeholder="+52 55 1234 5678"
                    className="field-input"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="field-label">Motivo de contacto</label>
                <select
                  className="field-input"
                  value={form.reason}
                  onChange={(e) => updateField('reason', e.target.value)}
                >
                  {REASONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label">Mensaje</label>
                <textarea
                  rows={6}
                  placeholder="Cuentanos sobre el viaje que suenas..."
                  className="field-input resize-none"
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  required
                />
              </div>
              <div className="flex items-start gap-2 text-xs text-charcoal-500">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={form.privacy}
                  onChange={(e) => updateField('privacy', e.target.checked)}
                />
                <span>
                  Acepto la{' '}
                  <Link href="#" className="text-plum-700 underline">
                    politica de privacidad
                  </Link>{' '}
                  y recibir comunicaciones de Aurelia Viajes.
                </span>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg w-full sm:w-auto"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={16} />
                    Enviar mensaje
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Info sidebar */}
          <aside className="space-y-5">
            <div className="card-soft p-7">
              <h3 className="font-display text-xl mb-4">Siguenos</h3>
              <div className="flex gap-3">
                <SocialBtn icon={Instagram} />
                <SocialBtn icon={Facebook} />
                <SocialBtn icon={Twitter} />
              </div>
              <p className="text-xs text-charcoal-500 mt-4">
                @aurelia.viajes — Inspiracion diaria para viajeras elegantes
              </p>
            </div>

            <div className="card-soft p-7">
              <h3 className="font-display text-xl mb-4">Horarios</h3>
              <dl className="text-sm space-y-2">
                <div className="flex justify-between">
                  <dt className="text-charcoal-500">Lun - Vie</dt>
                  <dd>9:00 - 20:00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-charcoal-500">Sabado</dt>
                  <dd>10:00 - 18:00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-charcoal-500">Domingo</dt>
                  <dd className="text-charcoal-500">Cerrado</dd>
                </div>
                <div className="pt-3 mt-3 border-t border-ivory-200 flex justify-between text-sage-500">
                  <dt>Emergencias en viaje</dt>
                  <dd>24/7</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-plum-800 to-plum-700 p-7 text-white">
              <h3 className="font-display text-xl mb-3">Respuesta garantizada</h3>
              <p className="text-sm text-white/80 mb-4">
                Respondemos todos los mensajes en menos de 2 horas habiles. Si necesitas algo
                urgente, llamanos directamente.
              </p>
              <div className="text-xs text-gold-400 uppercase tracking-widest">
                Tiempo medio: 42 min
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Offices */}
      <section className="container-site pb-24">
        <div className="text-center mb-12">
          <span className="eyebrow">Nuestras oficinas</span>
          <h2 className="heading-lg mt-3">Estamos donde tu estes</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {OFFICES.map((o) => (
            <div key={o.city} className="card-soft p-7">
              <div className="w-12 h-12 rounded-full bg-plum-100 text-plum-700 flex items-center justify-center mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="font-display text-2xl mb-1">{o.city}</h3>
              <p className="text-sm text-charcoal-500 mb-4">{o.address}</p>
              <div className="space-y-2 text-sm pt-4 border-t border-ivory-200">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-plum-700" /> {o.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-plum-700" /> {o.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function QuickCard({
  icon: Icon,
  title,
  value,
  action,
  accent,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  action: string;
  accent: string;
}) {
  return (
    <div className={`rounded-2xl p-6 text-white shadow-soft ${accent}`}>
      <Icon size={22} className="mb-3 opacity-90" />
      <div className="text-xs uppercase tracking-widest opacity-80">{title}</div>
      <div className="font-display text-lg leading-tight mt-1">{value}</div>
      <div className="text-xs opacity-80 mt-2">{action}</div>
    </div>
  );
}

function SocialBtn({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <button className="w-11 h-11 rounded-full bg-ivory-100 hover:bg-plum-700 text-plum-700 hover:text-white flex items-center justify-center transition-colors">
      <Icon size={18} />
    </button>
  );
}
