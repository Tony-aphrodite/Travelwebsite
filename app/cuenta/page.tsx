'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  User,
  Plane,
  Heart,
  Award,
  Bell,
  Settings,
  CreditCard,
  MapPin,
  Calendar,
  ChevronRight,
  Sparkles,
  Gift,
  TrendingUp,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { hotels, packages, destinations } from '@/lib/data';

type Tab = 'resumen' | 'viajes' | 'favoritos' | 'recompensas' | 'datos' | 'notificaciones';

const TABS: { key: Tab; label: string; icon: LucideIcon }[] = [
  { key: 'resumen', label: 'Resumen', icon: User },
  { key: 'viajes', label: 'Mis viajes', icon: Plane },
  { key: 'favoritos', label: 'Favoritos', icon: Heart },
  { key: 'recompensas', label: 'Recompensas', icon: Award },
  { key: 'datos', label: 'Datos personales', icon: Settings },
  { key: 'notificaciones', label: 'Notificaciones', icon: Bell },
];

export default function CuentaPage() {
  const [tab, setTab] = useState<Tab>('resumen');

  return (
    <div className="pt-28 pb-20 bg-ivory-100 min-h-screen">
      <div className="container-site">
        <div className="text-xs text-charcoal-500 mb-6 flex gap-2 uppercase tracking-wider">
          <Link href="/" className="text-plum-700">
            Inicio
          </Link>
          <span>/</span>
          <span>Mi cuenta</span>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-4 h-fit lg:sticky lg:top-28">
            <div className="card-soft p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-plum-700 to-rose-400 text-white flex items-center justify-center mx-auto mb-3 font-display text-3xl">
                S
              </div>
              <h3 className="font-display text-xl">Sofia Martinez</h3>
              <p className="text-xs text-charcoal-500 mb-3">sofia@aurelia.com</p>
              <span className="status-pill bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-900">
                <Sparkles size={12} /> Rose Gold Member
              </span>
            </div>

            <nav className="card-soft p-3">
              {TABS.map((t) => {
                const Icon = t.icon;
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm text-left transition-colors ${
                      active
                        ? 'bg-plum-700 text-white'
                        : 'text-charcoal-700 hover:bg-ivory-100'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={16} />
                      {t.label}
                    </span>
                    {active && <ChevronRight size={14} />}
                  </button>
                );
              })}
              <hr className="my-2 border-ivory-200" />
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-charcoal-500 hover:bg-ivory-100 text-left">
                <LogOut size={16} />
                Cerrar sesion
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div>
            {tab === 'resumen' && <ResumenTab />}
            {tab === 'viajes' && <ViajesTab />}
            {tab === 'favoritos' && <FavoritosTab />}
            {tab === 'recompensas' && <RecompensasTab />}
            {tab === 'datos' && <DatosTab />}
            {tab === 'notificaciones' && <NotificacionesTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResumenTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-lg mb-2">Bienvenida, Sofia</h1>
        <p className="text-charcoal-500">
          Tu proxima aventura te espera. Revisa tus reservas y recompensas.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Plane} label="Viajes realizados" value="12" accent="plum" />
        <StatCard icon={Award} label="Puntos acumulados" value="4,850" accent="gold" />
        <StatCard icon={Heart} label="Favoritos guardados" value="23" accent="rose" />
      </div>

      {/* Loyalty card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-plum-900 via-plum-800 to-plum-700 p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl -translate-y-20 translate-x-20" />
        <div className="relative">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-widest opacity-70">Aurelia Society</div>
              <div className="font-display text-3xl">Rose Gold</div>
            </div>
            <Sparkles size={32} className="text-gold-500" />
          </div>
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-2 opacity-80">
              <span>4,850 / 8,000 para Platinum</span>
              <span>60%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400 w-[60%]" />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[11px] opacity-70">Miembro desde</div>
              <div className="font-display text-lg">Marzo 2024</div>
            </div>
            <button className="btn btn-gold btn-sm">Ver beneficios</button>
          </div>
        </div>
      </div>

      {/* Upcoming trip */}
      <div>
        <h2 className="font-display text-2xl mb-4">Proximo viaje</h2>
        <article className="card-soft overflow-hidden grid md:grid-cols-[280px_1fr]">
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image src={hotels[0].image} alt={hotels[0].name} fill className="object-cover" />
          </div>
          <div className="p-6">
            <span className="status-pill bg-sage-100 text-sage-500">Confirmado</span>
            <h3 className="font-display text-2xl mt-3">{hotels[0].name}</h3>
            <div className="flex items-center gap-1 text-xs text-charcoal-500 mt-1">
              <MapPin size={12} /> {hotels[0].location}, {hotels[0].country}
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm text-charcoal-700">
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-plum-700" /> 15-20 May 2026
              </span>
              <span>· 5 noches · 2 huespedes</span>
            </div>
            <div className="flex gap-2 mt-5">
              <button className="btn btn-primary btn-sm">Ver detalle</button>
              <button className="btn btn-outline btn-sm">Descargar voucher</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: 'plum' | 'gold' | 'rose';
}) {
  const bg = accent === 'plum' ? 'bg-plum-700' : accent === 'gold' ? 'bg-gold-600' : 'bg-rose-400';
  return (
    <div className="card-soft p-5">
      <div className={`w-10 h-10 rounded-full ${bg} text-white flex items-center justify-center mb-3`}>
        <Icon size={18} />
      </div>
      <div className="text-xs text-charcoal-500 uppercase tracking-wider">{label}</div>
      <div className="font-display text-3xl text-plum-700">{value}</div>
    </div>
  );
}

function ViajesTab() {
  const trips = [
    { hotel: hotels[0], status: 'Confirmado', dates: '15-20 May 2026', tone: 'sage' },
    { hotel: hotels[1], status: 'Proximamente', dates: '10-17 Jul 2026', tone: 'gold' },
    { hotel: hotels[2], status: 'Completado', dates: '3-8 Nov 2025', tone: 'charcoal' },
  ];
  return (
    <div>
      <h1 className="heading-lg mb-2">Mis viajes</h1>
      <p className="text-charcoal-500 mb-6">Tu historial y reservas en curso</p>
      <div className="flex gap-2 mb-6">
        <button className="btn btn-primary btn-sm">Todos</button>
        <button className="btn btn-ghost btn-sm">Proximos</button>
        <button className="btn btn-ghost btn-sm">Pasados</button>
      </div>
      <div className="space-y-4">
        {trips.map((t, i) => (
          <article key={i} className="card-soft overflow-hidden grid md:grid-cols-[220px_1fr_auto]">
            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image src={t.hotel.image} alt={t.hotel.name} fill className="object-cover" />
            </div>
            <div className="p-5">
              <span
                className={`status-pill ${
                  t.tone === 'sage'
                    ? 'bg-sage-100 text-sage-500'
                    : t.tone === 'gold'
                    ? 'bg-gold-100 text-gold-700'
                    : 'bg-ivory-200 text-charcoal-700'
                }`}
              >
                {t.status}
              </span>
              <h3 className="font-display text-xl mt-3">{t.hotel.name}</h3>
              <div className="flex items-center gap-1 text-xs text-charcoal-500 mt-1">
                <MapPin size={12} /> {t.hotel.location}, {t.hotel.country}
              </div>
              <div className="text-sm text-charcoal-700 mt-3 flex items-center gap-1">
                <Calendar size={13} className="text-plum-700" /> {t.dates}
              </div>
            </div>
            <div className="p-5 flex flex-col justify-center gap-2 border-l border-ivory-200">
              <button className="btn btn-primary btn-sm">Ver detalle</button>
              <button className="btn btn-ghost btn-sm">Voucher</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function FavoritosTab() {
  return (
    <div>
      <h1 className="heading-lg mb-2">Favoritos</h1>
      <p className="text-charcoal-500 mb-6">Los lugares que has guardado para soñar despues</p>
      <div className="grid sm:grid-cols-2 gap-5">
        {destinations.slice(0, 4).map((d) => (
          <article key={d.id} className="card-soft overflow-hidden group">
            <div className="relative aspect-[4/3]">
              <Image src={d.image} alt={d.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-rose-400">
                <Heart size={16} fill="currentColor" />
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg">{d.name}</h3>
              <div className="text-xs text-charcoal-500">{d.country}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function RecompensasTab() {
  const tiers = [
    { name: 'Silver', points: '0 - 2,000', benefits: ['5% descuento', 'Newsletter exclusivo'] },
    {
      name: 'Rose Gold',
      points: '2,000 - 8,000',
      benefits: ['10% descuento', 'Upgrade habitacion', 'Check-in prioritario'],
      current: true,
    },
    {
      name: 'Platinum',
      points: '8,000+',
      benefits: ['15% descuento', 'Concierge privado', 'Experiencias VIP', 'Spa gratis'],
    },
  ];
  return (
    <div>
      <h1 className="heading-lg mb-2">Recompensas</h1>
      <p className="text-charcoal-500 mb-6">Tu programa de lealtad Aurelia Society</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="card-soft p-5 text-center">
          <TrendingUp className="text-plum-700 mx-auto mb-2" size={20} />
          <div className="font-display text-3xl text-plum-700">4,850</div>
          <div className="text-xs text-charcoal-500 uppercase tracking-wider">Puntos actuales</div>
        </div>
        <div className="card-soft p-5 text-center">
          <Gift className="text-gold-600 mx-auto mb-2" size={20} />
          <div className="font-display text-3xl text-plum-700">3,150</div>
          <div className="text-xs text-charcoal-500 uppercase tracking-wider">Para Platinum</div>
        </div>
        <div className="card-soft p-5 text-center">
          <Sparkles className="text-rose-400 mx-auto mb-2" size={20} />
          <div className="font-display text-3xl text-plum-700">$245</div>
          <div className="text-xs text-charcoal-500 uppercase tracking-wider">Ahorros totales</div>
        </div>
      </div>

      <h2 className="font-display text-2xl mb-4">Niveles de membresia</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl p-6 ${
              tier.current
                ? 'bg-gradient-to-br from-plum-800 to-plum-700 text-white shadow-soft-lg'
                : 'bg-white border border-ivory-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className={tier.current ? 'text-gold-400' : 'text-plum-700'} />
              <h3 className="font-display text-xl">{tier.name}</h3>
            </div>
            <div
              className={`text-xs mb-4 ${
                tier.current ? 'text-white/70' : 'text-charcoal-500'
              }`}
            >
              {tier.points} puntos
            </div>
            <ul className="space-y-2 text-sm">
              {tier.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className={tier.current ? 'text-gold-400' : 'text-plum-700'}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
            {tier.current && (
              <div className="mt-5 pt-4 border-t border-white/20 text-xs uppercase tracking-widest text-gold-400">
                Tu nivel actual
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DatosTab() {
  return (
    <div>
      <h1 className="heading-lg mb-2">Datos personales</h1>
      <p className="text-charcoal-500 mb-6">Mantiene tu informacion actualizada</p>

      <div className="card-soft p-7 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="field-label">Nombre</label>
            <input type="text" defaultValue="Sofia" className="field-input" />
          </div>
          <div>
            <label className="field-label">Apellidos</label>
            <input type="text" defaultValue="Martinez Garcia" className="field-input" />
          </div>
          <div>
            <label className="field-label">Email</label>
            <input type="email" defaultValue="sofia@aurelia.com" className="field-input" />
          </div>
          <div>
            <label className="field-label">Telefono</label>
            <input type="tel" defaultValue="+52 55 1234 5678" className="field-input" />
          </div>
          <div>
            <label className="field-label">Pais</label>
            <input type="text" defaultValue="Mexico" className="field-input" />
          </div>
          <div>
            <label className="field-label">Fecha de nacimiento</label>
            <input type="date" defaultValue="1992-06-14" className="field-input" />
          </div>
        </div>

        <hr className="border-ivory-200" />

        <h3 className="font-display text-lg flex items-center gap-2">
          <CreditCard size={18} className="text-plum-700" />
          Metodos de pago
        </h3>
        <div className="flex items-center justify-between p-4 bg-ivory-100 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 rounded bg-gradient-to-r from-plum-700 to-plum-500" />
            <div>
              <div className="text-sm font-semibold">Visa · · · · 4242</div>
              <div className="text-xs text-charcoal-500">Expira 05/28</div>
            </div>
          </div>
          <button className="text-xs text-plum-700 hover:underline">Editar</button>
        </div>
        <button className="btn btn-outline btn-sm">+ Agregar metodo de pago</button>

        <hr className="border-ivory-200" />

        <div className="flex gap-3">
          <button className="btn btn-primary btn-md">Guardar cambios</button>
          <button className="btn btn-ghost btn-md">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

function NotificacionesTab() {
  const prefs = [
    { label: 'Ofertas exclusivas para miembros', desc: 'Promociones flash y descuentos Rose Gold', on: true },
    { label: 'Recordatorios de viaje', desc: 'Alertas 48h antes de tu check-in', on: true },
    { label: 'Newsletter Aurelia', desc: 'Destinos curados cada semana', on: true },
    { label: 'Blog de viajes', desc: 'Nuevos articulos y guias', on: false },
    { label: 'Alertas de precio', desc: 'Cuando bajan los vuelos que buscas', on: false },
  ];
  return (
    <div>
      <h1 className="heading-lg mb-2">Notificaciones</h1>
      <p className="text-charcoal-500 mb-6">Elige que quieres recibir y cuando</p>
      <div className="card-soft p-2">
        {prefs.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 p-5 border-b border-ivory-200 last:border-0"
          >
            <div>
              <div className="font-semibold text-charcoal-900">{p.label}</div>
              <div className="text-xs text-charcoal-500">{p.desc}</div>
            </div>
            <button
              className={`relative w-12 h-6 rounded-full transition-colors ${
                p.on ? 'bg-plum-700' : 'bg-ivory-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-soft transition-transform ${
                  p.on ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
