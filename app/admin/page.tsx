'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Hotel,
  Plane,
  Package,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Star,
  Search,
  Bell,
  Settings,
  ChevronRight,
  ArrowUpRight,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  type LucideIcon,
} from 'lucide-react';
import { hotels, packages as pkgs } from '@/lib/data';

type Panel = 'dashboard' | 'reservas' | 'hoteles' | 'paquetes' | 'usuarios' | 'reportes';

const NAV: { key: Panel; label: string; icon: LucideIcon }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'reservas', label: 'Reservas', icon: Calendar },
  { key: 'hoteles', label: 'Hoteles', icon: Hotel },
  { key: 'paquetes', label: 'Paquetes', icon: Package },
  { key: 'usuarios', label: 'Usuarias', icon: Users },
  { key: 'reportes', label: 'Reportes', icon: TrendingUp },
];

export default function AdminPage() {
  const [panel, setPanel] = useState<Panel>('dashboard');

  return (
    <div className="min-h-screen bg-ivory-100 pt-20">
      <div className="grid lg:grid-cols-[260px_1fr] min-h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <aside className="bg-plum-900 text-white p-6 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
          <div className="flex items-center gap-2 mb-8 pb-6 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-charcoal-900 font-display text-lg">
              A
            </div>
            <div>
              <div className="font-display text-lg">Aurelia</div>
              <div className="text-[10px] uppercase tracking-widest text-gold-400">
                Panel admin
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {NAV.map((n) => {
              const Icon = n.icon;
              const active = panel === n.key;
              return (
                <button
                  key={n.key}
                  onClick={() => setPanel(n.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-colors ${
                    active
                      ? 'bg-white/10 text-gold-400'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {n.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-10 pt-6 border-t border-white/10 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/70 hover:bg-white/5 hover:text-white text-left">
              <Settings size={16} />
              Configuracion
            </button>
            <Link
              href="/"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/70 hover:bg-white/5 hover:text-white"
            >
              <ChevronRight size={16} />
              Volver al sitio
            </Link>
          </div>
        </aside>

        {/* Content */}
        <div>
          {/* Topbar */}
          <header className="bg-white border-b border-ivory-200 px-8 py-4 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-2xl text-plum-700 capitalize">{panel}</h1>
              <div className="text-xs text-charcoal-500">
                {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-500"
                />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-9 pr-4 py-2 rounded-full bg-ivory-100 border border-ivory-200 text-sm w-48 focus:outline-none focus:border-plum-500"
                />
              </div>
              <button className="relative w-10 h-10 rounded-full bg-ivory-100 flex items-center justify-center hover:bg-plum-100">
                <Bell size={16} className="text-plum-700" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-400 rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-plum-700 to-rose-400 text-white flex items-center justify-center font-display">
                I
              </div>
            </div>
          </header>

          {/* Panels */}
          <main className="p-8">
            {panel === 'dashboard' && <Dashboard />}
            {panel === 'reservas' && <Reservas />}
            {panel === 'hoteles' && <Hoteles />}
            {panel === 'paquetes' && <Paquetes />}
            {panel === 'usuarios' && <Usuarios />}
            {panel === 'reportes' && <Reportes />}
          </main>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const kpis = [
    { label: 'Ingresos del mes', value: '$148,200', delta: '+12.5%', icon: DollarSign, color: 'plum' },
    { label: 'Reservas activas', value: '342', delta: '+8.2%', icon: Calendar, color: 'gold' },
    { label: 'Usuarias nuevas', value: '1,284', delta: '+24.1%', icon: Users, color: 'rose' },
    { label: 'Rating promedio', value: '4.92', delta: '+0.08', icon: Star, color: 'sage' },
  ];

  const recentBookings = [
    { id: '#A-24891', user: 'Sofia Martinez', item: 'Canaves Oia Suites', amount: '$2,450', status: 'Confirmada' },
    { id: '#A-24890', user: 'Ana Carolina R.', item: 'Luna de miel Bali', amount: '$4,890', status: 'Pendiente' },
    { id: '#A-24889', user: 'Valentina Torres', item: 'Ritz Paris', amount: '$3,200', status: 'Confirmada' },
    { id: '#A-24888', user: 'Camila Estrada', item: 'Tour Toscana', amount: '$890', status: 'Completada' },
    { id: '#A-24887', user: 'Isabel Ramirez', item: 'Villa Santorini', amount: '$5,400', status: 'Confirmada' },
  ];

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((k) => {
          const Icon = k.icon;
          const bg =
            k.color === 'plum'
              ? 'from-plum-700 to-plum-500'
              : k.color === 'gold'
              ? 'from-gold-600 to-gold-400'
              : k.color === 'rose'
              ? 'from-rose-400 to-rose-300'
              : 'from-sage-500 to-sage-400';
          return (
            <div key={k.label} className="card-soft p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${bg} text-white flex items-center justify-center`}
                >
                  <Icon size={18} />
                </div>
                <span className="text-xs text-sage-500 font-semibold flex items-center gap-1">
                  <ArrowUpRight size={12} /> {k.delta}
                </span>
              </div>
              <div className="text-xs text-charcoal-500 uppercase tracking-wider">{k.label}</div>
              <div className="font-display text-3xl text-plum-700 mt-1">{k.value}</div>
            </div>
          );
        })}
      </div>

      {/* Chart + activity */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
        <div className="card-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-xl">Ingresos mensuales</h3>
              <p className="text-xs text-charcoal-500">Ultimos 12 meses</p>
            </div>
            <select className="px-3 py-1.5 rounded-full bg-ivory-100 text-xs border border-ivory-200">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          <FakeChart />
        </div>

        <div className="card-soft p-6">
          <h3 className="font-display text-xl mb-4">Destinos top</h3>
          <div className="space-y-4">
            {[
              { name: 'Santorini', pct: 92 },
              { name: 'Paris', pct: 78 },
              { name: 'Bali', pct: 64 },
              { name: 'Maldivas', pct: 51 },
              { name: 'Kyoto', pct: 38 },
            ].map((d) => (
              <div key={d.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold">{d.name}</span>
                  <span className="text-charcoal-500">{d.pct}%</span>
                </div>
                <div className="h-2 bg-ivory-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-plum-700 to-rose-400"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent bookings */}
      <div className="card-soft overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-ivory-200">
          <div>
            <h3 className="font-display text-xl">Reservas recientes</h3>
            <p className="text-xs text-charcoal-500">Actividad de las ultimas 24h</p>
          </div>
          <button className="btn btn-outline btn-sm">Ver todas</button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-ivory-100 text-xs uppercase tracking-wider text-charcoal-500">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Viajera</th>
              <th className="px-6 py-3 text-left">Experiencia</th>
              <th className="px-6 py-3 text-right">Monto</th>
              <th className="px-6 py-3 text-left">Estado</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((b) => (
              <tr key={b.id} className="border-t border-ivory-200 hover:bg-ivory-50">
                <td className="px-6 py-4 font-mono text-xs text-charcoal-500">{b.id}</td>
                <td className="px-6 py-4 font-semibold">{b.user}</td>
                <td className="px-6 py-4 text-charcoal-700">{b.item}</td>
                <td className="px-6 py-4 text-right font-display text-plum-700">{b.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`status-pill ${
                      b.status === 'Confirmada'
                        ? 'bg-sage-100 text-sage-500'
                        : b.status === 'Pendiente'
                        ? 'bg-gold-100 text-gold-700'
                        : 'bg-ivory-200 text-charcoal-700'
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-charcoal-500 hover:text-plum-700">
                    <MoreVertical size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FakeChart() {
  const bars = [42, 58, 51, 67, 73, 61, 78, 84, 79, 92, 88, 95];
  const months = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  return (
    <div>
      <div className="flex items-end justify-between gap-2 h-48">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-gradient-to-t from-plum-700 to-rose-400 rounded-t-lg hover:opacity-80 transition-opacity"
              style={{ height: `${h}%` }}
            />
            <span className="text-[10px] text-charcoal-500 uppercase">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reservas() {
  const rows = [
    { id: '#A-24891', user: 'Sofia Martinez', hotel: 'Canaves Oia', dates: '15-20 May', guests: 2, total: '$2,450', status: 'Confirmada' },
    { id: '#A-24890', user: 'Ana Carolina', hotel: 'Four Seasons Bali', dates: '10-17 Jun', guests: 2, total: '$4,890', status: 'Pendiente' },
    { id: '#A-24889', user: 'Valentina T.', hotel: 'Ritz Paris', dates: '3-7 Jul', guests: 1, total: '$3,200', status: 'Confirmada' },
    { id: '#A-24888', user: 'Camila E.', hotel: 'Belmond Venice', dates: '22-26 Ago', guests: 2, total: '$5,100', status: 'Cancelada' },
  ];
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-2">
          <button className="btn btn-primary btn-sm">Todas</button>
          <button className="btn btn-ghost btn-sm">Confirmadas</button>
          <button className="btn btn-ghost btn-sm">Pendientes</button>
          <button className="btn btn-ghost btn-sm">Canceladas</button>
        </div>
        <button className="btn btn-primary btn-sm">
          <Plus size={14} /> Nueva reserva
        </button>
      </div>
      <div className="card-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ivory-100 text-xs uppercase tracking-wider text-charcoal-500">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Viajera</th>
              <th className="px-6 py-3 text-left">Hotel</th>
              <th className="px-6 py-3 text-left">Fechas</th>
              <th className="px-6 py-3 text-left">Huespedes</th>
              <th className="px-6 py-3 text-right">Total</th>
              <th className="px-6 py-3 text-left">Estado</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-ivory-200 hover:bg-ivory-50">
                <td className="px-6 py-4 font-mono text-xs text-charcoal-500">{r.id}</td>
                <td className="px-6 py-4 font-semibold">{r.user}</td>
                <td className="px-6 py-4">{r.hotel}</td>
                <td className="px-6 py-4 text-charcoal-500">{r.dates}</td>
                <td className="px-6 py-4 text-charcoal-500">{r.guests}</td>
                <td className="px-6 py-4 text-right font-display text-plum-700">{r.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`status-pill ${
                      r.status === 'Confirmada'
                        ? 'bg-sage-100 text-sage-500'
                        : r.status === 'Pendiente'
                        ? 'bg-gold-100 text-gold-700'
                        : 'bg-rose-100 text-rose-400'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="text-charcoal-500 hover:text-plum-700">
                    <Edit size={14} />
                  </button>
                  <button className="text-charcoal-500 hover:text-rose-400">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Hoteles() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-sm text-charcoal-500">{hotels.length} hoteles curados</p>
        <button className="btn btn-primary btn-sm">
          <Plus size={14} /> Agregar hotel
        </button>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {hotels.map((h) => (
          <div key={h.id} className="card-soft overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image src={h.image} alt={h.name} fill className="object-cover" sizes="33vw" />
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 text-plum-700 flex items-center justify-center">
                <MoreVertical size={14} />
              </button>
            </div>
            <div className="p-5">
              <h4 className="font-display text-lg">{h.name}</h4>
              <div className="text-xs text-charcoal-500 mb-3">
                {h.location}, {h.country}
              </div>
              <div className="flex items-center justify-between">
                <div className="font-display text-xl text-plum-700">${h.price}<small className="text-xs text-charcoal-500 font-sans ml-1">/ noche</small></div>
                <div className="flex gap-1">
                  <button className="w-8 h-8 rounded-full bg-ivory-100 hover:bg-plum-100 text-plum-700 flex items-center justify-center">
                    <Edit size={13} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-ivory-100 hover:bg-rose-100 text-rose-400 flex items-center justify-center">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Paquetes() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-sm text-charcoal-500">{pkgs.length} paquetes activos</p>
        <button className="btn btn-primary btn-sm">
          <Plus size={14} /> Nuevo paquete
        </button>
      </div>
      <div className="space-y-4">
        {pkgs.slice(0, 4).map((p) => (
          <div key={p.id} className="card-soft p-5 grid md:grid-cols-[140px_1fr_auto] gap-5 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src={p.image} alt={p.title} fill className="object-cover" sizes="140px" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-1">
                {p.destination}
              </div>
              <h4 className="font-display text-lg">{p.title}</h4>
              <div className="text-xs text-charcoal-500 mt-1">{p.duration}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-display text-xl text-plum-700">
                  ${p.price.toLocaleString()}
                </div>
                <div className="text-[10px] text-sage-500">
                  {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF
                </div>
              </div>
              <div className="flex gap-1">
                <button className="w-9 h-9 rounded-full bg-ivory-100 hover:bg-plum-100 text-plum-700 flex items-center justify-center">
                  <Edit size={14} />
                </button>
                <button className="w-9 h-9 rounded-full bg-ivory-100 hover:bg-rose-100 text-rose-400 flex items-center justify-center">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Usuarios() {
  const users = [
    { name: 'Sofia Martinez', email: 'sofia@email.com', tier: 'Rose Gold', trips: 8, spent: '$24,500' },
    { name: 'Ana Carolina Ruiz', email: 'ana@email.com', tier: 'Platinum', trips: 15, spent: '$52,300' },
    { name: 'Valentina Torres', email: 'valentina@email.com', tier: 'Silver', trips: 3, spent: '$8,900' },
    { name: 'Camila Estrada', email: 'camila@email.com', tier: 'Rose Gold', trips: 6, spent: '$18,700' },
  ];
  return (
    <div className="card-soft overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-ivory-100 text-xs uppercase tracking-wider text-charcoal-500">
          <tr>
            <th className="px-6 py-3 text-left">Viajera</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Nivel</th>
            <th className="px-6 py-3 text-right">Viajes</th>
            <th className="px-6 py-3 text-right">Gasto total</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email} className="border-t border-ivory-200 hover:bg-ivory-50">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-plum-700 to-rose-400 text-white flex items-center justify-center font-display text-sm">
                  {u.name[0]}
                </div>
                <span className="font-semibold">{u.name}</span>
              </td>
              <td className="px-6 py-4 text-charcoal-500">{u.email}</td>
              <td className="px-6 py-4">
                <span
                  className={`status-pill ${
                    u.tier === 'Platinum'
                      ? 'bg-plum-100 text-plum-700'
                      : u.tier === 'Rose Gold'
                      ? 'bg-gold-100 text-gold-700'
                      : 'bg-ivory-200 text-charcoal-700'
                  }`}
                >
                  {u.tier}
                </span>
              </td>
              <td className="px-6 py-4 text-right">{u.trips}</td>
              <td className="px-6 py-4 text-right font-display text-plum-700">{u.spent}</td>
              <td className="px-6 py-4">
                <button className="text-charcoal-500 hover:text-plum-700">
                  <MoreVertical size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Reportes() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card-soft p-6">
          <h3 className="font-display text-xl mb-2">Rendimiento por categoria</h3>
          <p className="text-xs text-charcoal-500 mb-5">Distribucion de ingresos Q1 2026</p>
          <div className="space-y-3">
            {[
              { cat: 'Hoteles', val: 45, color: 'from-plum-700 to-plum-500' },
              { cat: 'Paquetes', val: 28, color: 'from-gold-600 to-gold-400' },
              { cat: 'Villas', val: 15, color: 'from-rose-400 to-rose-300' },
              { cat: 'Actividades', val: 8, color: 'from-sage-500 to-sage-400' },
              { cat: 'Vuelos', val: 4, color: 'from-plum-500 to-plum-400' },
            ].map((c) => (
              <div key={c.cat}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold">{c.cat}</span>
                  <span className="text-charcoal-500">{c.val}%</span>
                </div>
                <div className="h-3 bg-ivory-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${c.color}`}
                    style={{ width: `${c.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft p-6">
          <h3 className="font-display text-xl mb-2">Conversion funnel</h3>
          <p className="text-xs text-charcoal-500 mb-5">Ultimos 30 dias</p>
          <div className="space-y-4">
            {[
              { step: 'Visitas', val: 48200, pct: 100 },
              { step: 'Busquedas', val: 18450, pct: 38 },
              { step: 'Carrito', val: 4120, pct: 8.5 },
              { step: 'Reservas', val: 1284, pct: 2.7 },
            ].map((f) => (
              <div key={f.step}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{f.step}</span>
                  <span className="font-display text-plum-700">{f.val.toLocaleString()}</span>
                </div>
                <div className="h-6 bg-ivory-100 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-plum-700 to-rose-400 flex items-center px-3 text-white text-xs font-semibold"
                    style={{ width: `${f.pct}%` }}
                  >
                    {f.pct}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl">Tendencia anual</h3>
          <button className="btn btn-outline btn-sm">Exportar CSV</button>
        </div>
        <FakeChart />
      </div>
    </div>
  );
}
