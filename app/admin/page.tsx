'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  LayoutDashboard, Hotel, Plane, Package, Users, TrendingUp,
  Calendar, Search, Bell, ChevronRight, Loader2, ShieldAlert,
  Home as HomeIcon, Car, Sparkles, MapPin, FileText, MessageSquare,
  Mail, Tag, Settings as SettingsIcon, Quote,
  type LucideIcon,
} from 'lucide-react';
import type { Panel, Booking, UserRow, Stats } from './_lib/types';
import {
  HOTEL_CONFIG, PACKAGE_CONFIG, FLIGHT_CONFIG, VILLA_CONFIG,
  CAR_CONFIG, ACTIVITY_CONFIG, DESTINATION_CONFIG, BLOG_CONFIG,
  TESTIMONIAL_CONFIG, PROMO_CONFIG,
} from './_lib/configs';
import { CrudPanel } from './_components/CrudPanel';
import { Dashboard } from './_components/Dashboard';
import { Reservas } from './_components/Reservas';
import { Usuarios } from './_components/Usuarios';
import { Reportes } from './_components/Reportes';
import { Consultas } from './_components/Consultas';
import { Newsletter } from './_components/Newsletter';
import { Settings } from './_components/Settings';

const NAV: { key: Panel; label: string; icon: LucideIcon; group?: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Inicio' },
  { key: 'reservas', label: 'Reservas', icon: Calendar, group: 'Inicio' },

  { key: 'hoteles', label: 'Hoteles', icon: Hotel, group: 'Catálogo' },
  { key: 'paquetes', label: 'Paquetes', icon: Package, group: 'Catálogo' },
  { key: 'vuelos', label: 'Vuelos', icon: Plane, group: 'Catálogo' },
  { key: 'villas', label: 'Villas', icon: HomeIcon, group: 'Catálogo' },
  { key: 'autos', label: 'Autos', icon: Car, group: 'Catálogo' },
  { key: 'actividades', label: 'Actividades', icon: Sparkles, group: 'Catálogo' },
  { key: 'destinos', label: 'Destinos', icon: MapPin, group: 'Catálogo' },

  { key: 'blog', label: 'Blog', icon: FileText, group: 'Contenido' },
  { key: 'testimonials', label: 'Testimonios', icon: Quote, group: 'Contenido' },

  { key: 'consultas', label: 'Asesoría consular', icon: MessageSquare, group: 'Comunicación' },
  { key: 'newsletter', label: 'Newsletter', icon: Mail, group: 'Comunicación' },
  { key: 'promos', label: 'Códigos promo', icon: Tag, group: 'Comunicación' },

  { key: 'usuarios', label: 'Usuarias', icon: Users, group: 'Operación' },
  { key: 'reportes', label: 'Reportes', icon: TrendingUp, group: 'Operación' },
  { key: 'settings', label: 'Configuración', icon: SettingsIcon, group: 'Operación' },
];

const GROUPS = ['Inicio', 'Catálogo', 'Contenido', 'Comunicación', 'Operación'] as const;

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [panel, setPanel] = useState<Panel>('dashboard');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Booking[]>([]);
  const [loadingShared, setLoadingShared] = useState(true);

  const isAdmin = (session?.user as any)?.role === 'admin';

  useEffect(() => {
    if (status === 'authenticated' && isAdmin) {
      Promise.all([
        fetch('/api/admin/bookings').then((r) => r.json()),
        fetch('/api/admin/users').then((r) => r.json()),
        fetch('/api/admin/stats').then((r) => r.json()),
      ])
        .then(([b, u, s]) => {
          if (Array.isArray(b)) setBookings(b);
          if (Array.isArray(u)) setUsers(u);
          if (s && s.stats) {
            setStats(s.stats);
            setRecent(s.recent || []);
          }
        })
        .catch(() => {})
        .finally(() => setLoadingShared(false));
    } else if (status !== 'loading') {
      setLoadingShared(false);
    }
  }, [status, isAdmin]);

  const changeBookingStatus = async (id: string, next: Booking['status']) => {
    const prev = bookings;
    setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status: next } : b)));
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) {
      setBookings(prev);
      alert('No se pudo actualizar la reserva');
    }
  };

  const changeUserRole = async (userId: string, role: 'user' | 'admin') => {
    const prev = users;
    setUsers((us) => us.map((u) => (u.id === userId ? { ...u, role } : u)));
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role }),
    });
    if (!res.ok) {
      setUsers(prev);
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'No se pudo cambiar el rol');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center">
        <Loader2 size={40} className="text-plum-700 animate-spin" />
      </div>
    );
  }

  if (!session || !isAdmin) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center">
        <div className="card-soft p-12 text-center max-w-md">
          <ShieldAlert size={48} className="text-rose-700 mx-auto mb-4" />
          <h1 className="font-display text-2xl mb-2">Acceso denegado</h1>
          <p className="text-charcoal-500 mb-6">
            No tienes permisos de administrador para acceder a esta sección.
          </p>
          <Link href="/" className="btn btn-primary btn-md">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const currentLabel = NAV.find((n) => n.key === panel)?.label ?? '';

  return (
    <div className="min-h-screen bg-ivory-100 pt-20">
      <div className="grid lg:grid-cols-[260px_1fr] min-h-[calc(100vh-5rem)]">
        <aside className="bg-ivory-50 text-charcoal-700 p-6 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] overflow-y-auto border-r border-ivory-200">
          <div className="flex items-center gap-2 mb-6 pb-6 border-b border-ivory-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-plum-900 font-display text-lg">
              A
            </div>
            <div>
              <div className="font-display text-lg text-plum-900">Aurelia</div>
              <div className="text-[10px] uppercase tracking-widest text-gold-700">Panel admin</div>
            </div>
          </div>

          <nav className="space-y-4">
            {GROUPS.map((group) => (
              <div key={group}>
                <div className="text-[10px] uppercase tracking-widest text-charcoal-500 font-semibold px-4 mb-2">
                  {group}
                </div>
                <div className="space-y-0.5">
                  {NAV.filter((n) => n.group === group).map((n) => {
                    const Icon = n.icon;
                    const active = panel === n.key;
                    return (
                      <button
                        key={n.key}
                        onClick={() => setPanel(n.key)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-left transition-colors ${
                          active ? 'bg-plum-700/10 text-plum-700 font-semibold' : 'text-charcoal-700 hover:bg-ivory-100 hover:text-plum-700'
                        }`}
                      >
                        <Icon size={15} />
                        {n.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-ivory-200 space-y-1">
            <Link
              href="/"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-charcoal-700 hover:bg-ivory-100 hover:text-plum-700"
            >
              <ChevronRight size={16} />
              Volver al sitio
            </Link>
          </div>
        </aside>

        <div>
          <header className="bg-ivory-50 border-b border-ivory-200 px-8 py-4 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-2xl text-plum-700">{currentLabel}</h1>
              <div className="text-xs text-charcoal-500">
                {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                })}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-500" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-9 pr-4 py-2 rounded-full bg-ivory-100 border border-ivory-200 text-sm w-48 focus:outline-none focus:border-plum-500"
                />
              </div>
              <button className="relative w-10 h-10 rounded-full bg-ivory-100 flex items-center justify-center hover:bg-ivory-200" aria-label="Notificaciones">
                <Bell size={16} className="text-plum-700" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-plum-700 to-rose-700 text-white flex items-center justify-center font-display">
                {session.user?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </header>

          <main className="p-8">
            {loadingShared && (panel === 'dashboard' || panel === 'reservas' || panel === 'usuarios' || panel === 'reportes') ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="text-plum-700 animate-spin" />
              </div>
            ) : (
              <>
                {panel === 'dashboard' && <Dashboard stats={stats} recent={recent} />}
                {panel === 'reservas' && <Reservas bookings={bookings} onStatusChange={changeBookingStatus} />}
                {panel === 'hoteles' && <CrudPanel config={HOTEL_CONFIG} />}
                {panel === 'paquetes' && <CrudPanel config={PACKAGE_CONFIG} />}
                {panel === 'vuelos' && <CrudPanel config={FLIGHT_CONFIG} />}
                {panel === 'villas' && <CrudPanel config={VILLA_CONFIG} />}
                {panel === 'autos' && <CrudPanel config={CAR_CONFIG} />}
                {panel === 'actividades' && <CrudPanel config={ACTIVITY_CONFIG} />}
                {panel === 'destinos' && <CrudPanel config={DESTINATION_CONFIG} />}
                {panel === 'blog' && <CrudPanel config={BLOG_CONFIG} />}
                {panel === 'testimonials' && <CrudPanel config={TESTIMONIAL_CONFIG} />}
                {panel === 'consultas' && <Consultas />}
                {panel === 'newsletter' && <Newsletter />}
                {panel === 'promos' && <CrudPanel config={PROMO_CONFIG} />}
                {panel === 'usuarios' && <Usuarios users={users} currentUserId={session.user?.id} onRoleChange={changeUserRole} />}
                {panel === 'reportes' && <Reportes bookings={bookings} />}
                {panel === 'settings' && <Settings />}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
