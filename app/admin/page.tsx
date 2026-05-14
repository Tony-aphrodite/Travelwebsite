'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
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
  Edit,
  Trash2,
  Plus,
  Loader2,
  ShieldAlert,
  X,
  type LucideIcon,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

type Panel = 'dashboard' | 'reservas' | 'hoteles' | 'paquetes' | 'usuarios' | 'reportes';

const NAV: { key: Panel; label: string; icon: LucideIcon }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'reservas', label: 'Reservas', icon: Calendar },
  { key: 'hoteles', label: 'Hoteles', icon: Hotel },
  { key: 'paquetes', label: 'Paquetes', icon: Package },
  { key: 'usuarios', label: 'Usuarias', icon: Users },
  { key: 'reportes', label: 'Reportes', icon: TrendingUp },
];

type HotelRow = {
  id: string;
  name: string;
  location: string;
  country: string;
  image: string;
  price: number;
  rating: number;
  stars: number;
  description?: string;
  ratingLabel?: string;
};

type PackageRow = {
  id: string;
  title: string;
  destination: string;
  image: string;
  duration: string;
  price: number;
  oldPrice: number;
  badge?: string;
  description?: string;
};

type Booking = {
  id: string;
  type: string;
  itemName: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  total: number;
  createdAt: string;
  userName: string | null;
  userEmail: string | null;
};

type UserRow = {
  id: string;
  name: string | null;
  email: string;
  role: 'user' | 'admin';
  loyaltyTier: string;
  loyaltyPoints: number;
  createdAt: string;
};

type Stats = {
  hotels: number;
  bookings: number;
  users: number;
  revenue: number;
};

const STATUS_STYLE: Record<Booking['status'], string> = {
  confirmed: 'bg-sage-500/15 text-sage-500',
  pending: 'bg-gold-600/15 text-gold-700',
  cancelled: 'bg-rose-500/15 text-rose-700',
  completed: 'bg-plum-700/10 text-plum-700',
};

const STATUS_LABEL: Record<Booking['status'], string> = {
  confirmed: 'Confirmada',
  pending: 'Pendiente',
  cancelled: 'Cancelada',
  completed: 'Completada',
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [panel, setPanel] = useState<Panel>('dashboard');
  const [hotels, setHotels] = useState<HotelRow[]>([]);
  const [packages, setPackages] = useState<PackageRow[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Booking[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [editingHotel, setEditingHotel] = useState<HotelRow | null>(null);
  const [editingPackage, setEditingPackage] = useState<PackageRow | null>(null);

  const isAdmin = (session?.user as any)?.role === 'admin';

  useEffect(() => {
    if (status === 'authenticated' && isAdmin) {
      Promise.all([
        fetch('/api/admin/hotels').then((r) => r.json()),
        fetch('/api/admin/packages').then((r) => r.json()),
        fetch('/api/admin/bookings').then((r) => r.json()),
        fetch('/api/admin/users').then((r) => r.json()),
        fetch('/api/admin/stats').then((r) => r.json()),
      ])
        .then(([h, p, b, u, s]) => {
          if (Array.isArray(h)) setHotels(h);
          if (Array.isArray(p)) setPackages(p);
          if (Array.isArray(b)) setBookings(b);
          if (Array.isArray(u)) setUsers(u);
          if (s && s.stats) {
            setStats(s.stats);
            setRecent(s.recent || []);
          }
        })
        .catch(() => {})
        .finally(() => setLoadingData(false));
    } else if (status !== 'loading') {
      setLoadingData(false);
    }
  }, [status, isAdmin]);

  const deleteHotel = async (id: string, name: string) => {
    if (!confirm(`Eliminar el hotel "${name}"? Esta accion no se puede deshacer.`)) return;
    const res = await fetch(`/api/admin/hotels/${id}`, { method: 'DELETE' });
    if (res.ok) setHotels((prev) => prev.filter((h) => h.id !== id));
    else alert('No se pudo eliminar el hotel');
  };

  const deletePackage = async (id: string, title: string) => {
    if (!confirm(`Eliminar el paquete "${title}"?`)) return;
    const res = await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' });
    if (res.ok) setPackages((prev) => prev.filter((p) => p.id !== id));
    else alert('No se pudo eliminar el paquete');
  };

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

  const saveHotel = async (h: HotelRow) => {
    const res = await fetch(`/api/admin/hotels/${h.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(h),
    });
    if (res.ok) {
      const updated = await res.json();
      setHotels((prev) => prev.map((x) => (x.id === h.id ? { ...x, ...updated } : x)));
      setEditingHotel(null);
    } else {
      alert('No se pudo guardar el hotel');
    }
  };

  const savePackage = async (p: PackageRow) => {
    const res = await fetch(`/api/admin/packages/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    });
    if (res.ok) {
      const updated = await res.json();
      setPackages((prev) => prev.map((x) => (x.id === p.id ? { ...x, ...updated } : x)));
      setEditingPackage(null);
    } else {
      alert('No se pudo guardar el paquete');
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
            No tienes permisos de administrador para acceder a esta seccion.
          </p>
          <Link href="/" className="btn btn-primary btn-md">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-100 pt-20">
      <div className="grid lg:grid-cols-[260px_1fr] min-h-[calc(100vh-5rem)]">
        <aside className="bg-plum-900 text-white p-6 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
          <div className="flex items-center gap-2 mb-8 pb-6 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-plum-900 font-display text-lg">
              A
            </div>
            <div>
              <div className="font-display text-lg">Aurelia</div>
              <div className="text-[10px] uppercase tracking-widest text-gold-500">Panel admin</div>
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
                    active ? 'bg-white/10 text-gold-500' : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {n.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-10 pt-6 border-t border-white/10 space-y-1">
            <Link
              href="/"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/70 hover:bg-white/5 hover:text-white"
            >
              <ChevronRight size={16} />
              Volver al sitio
            </Link>
          </div>
        </aside>

        <div>
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
            {loadingData ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="text-plum-700 animate-spin" />
              </div>
            ) : (
              <>
                {panel === 'dashboard' && <Dashboard stats={stats} recent={recent} />}
                {panel === 'reservas' && <Reservas bookings={bookings} onStatusChange={changeBookingStatus} />}
                {panel === 'hoteles' && <Hoteles hotels={hotels} onDelete={deleteHotel} onEdit={setEditingHotel} />}
                {panel === 'paquetes' && <Paquetes packages={packages} onDelete={deletePackage} onEdit={setEditingPackage} />}
                {panel === 'usuarios' && <Usuarios users={users} currentUserId={session.user?.id} onRoleChange={changeUserRole} />}
                {panel === 'reportes' && <Reportes bookings={bookings} />}
              </>
            )}
          </main>
        </div>
      </div>

      {editingHotel && (
        <HotelEditModal hotel={editingHotel} onClose={() => setEditingHotel(null)} onSave={saveHotel} />
      )}
      {editingPackage && (
        <PackageEditModal pkg={editingPackage} onClose={() => setEditingPackage(null)} onSave={savePackage} />
      )}
    </div>
  );
}

function Dashboard({ stats, recent }: { stats: Stats | null; recent: Booking[] }) {
  const kpis = [
    { label: 'Ingresos totales', value: stats ? formatCurrency(stats.revenue) : '—', icon: DollarSign, color: 'plum' },
    { label: 'Reservas totales', value: stats ? stats.bookings.toLocaleString() : '—', icon: Calendar, color: 'gold' },
    { label: 'Usuarias registradas', value: stats ? stats.users.toLocaleString() : '—', icon: Users, color: 'rose' },
    { label: 'Hoteles activos', value: stats ? stats.hotels.toLocaleString() : '—', icon: Star, color: 'sage' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((k) => {
          const Icon = k.icon;
          const bg =
            k.color === 'plum' ? 'from-plum-700 to-plum-500'
            : k.color === 'gold' ? 'from-gold-600 to-gold-500'
            : k.color === 'rose' ? 'from-rose-700 to-rose-500'
            : 'from-sage-500 to-sage-300';
          return (
            <div key={k.label} className="card-soft p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${bg} text-white flex items-center justify-center`}>
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
            <p className="text-xs text-charcoal-500">Ultimas 6 reservas registradas</p>
          </div>
        </div>
        {recent.length === 0 ? (
          <p className="p-8 text-center text-sm text-charcoal-500">No hay reservas aun.</p>
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
                  <td className="px-6 py-4 font-mono text-xs text-charcoal-500">
                    #{b.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 font-semibold">{b.userName || b.userEmail || 'Usuaria'}</td>
                  <td className="px-6 py-4 text-charcoal-700">{b.itemName}</td>
                  <td className="px-6 py-4 text-right font-display text-plum-700">
                    {formatCurrency(b.total)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`status-pill ${STATUS_STYLE[b.status]}`}>
                      {STATUS_LABEL[b.status]}
                    </span>
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

function Reservas({
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
          <button onClick={() => setFilter('all')} className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}>Todas</button>
          <button onClick={() => setFilter('confirmed')} className={`btn btn-sm ${filter === 'confirmed' ? 'btn-primary' : 'btn-ghost'}`}>Confirmadas</button>
          <button onClick={() => setFilter('pending')} className={`btn btn-sm ${filter === 'pending' ? 'btn-primary' : 'btn-ghost'}`}>Pendientes</button>
          <button onClick={() => setFilter('cancelled')} className={`btn btn-sm ${filter === 'cancelled' ? 'btn-primary' : 'btn-ghost'}`}>Canceladas</button>
          <button onClick={() => setFilter('completed')} className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-ghost'}`}>Completadas</button>
        </div>
        <p className="text-xs text-charcoal-500">{filtered.length} reservas</p>
      </div>

      <div className="card-soft overflow-hidden">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-charcoal-500">No hay reservas en esta categoria.</p>
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
                  <td className="px-6 py-4 font-mono text-xs text-charcoal-500">
                    #{b.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 font-semibold">{b.userName || b.userEmail || 'Usuaria'}</td>
                  <td className="px-6 py-4">{b.itemName}</td>
                  <td className="px-6 py-4 text-charcoal-500 text-xs">
                    {b.checkIn ? new Date(b.checkIn).toLocaleDateString('es-ES') : '—'}
                    {b.checkOut ? ` → ${new Date(b.checkOut).toLocaleDateString('es-ES')}` : ''}
                  </td>
                  <td className="px-6 py-4 text-right font-display text-plum-700">
                    {formatCurrency(b.total)}
                  </td>
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

function Hoteles({
  hotels,
  onDelete,
  onEdit,
}: {
  hotels: HotelRow[];
  onDelete: (id: string, name: string) => void;
  onEdit: (h: HotelRow) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-sm text-charcoal-500">{hotels.length} hoteles curados</p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {hotels.map((h) => (
          <div key={h.id} className="card-soft overflow-hidden">
            <div className="relative aspect-[16/10]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={h.image} alt={h.name} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <h4 className="font-display text-lg">{h.name}</h4>
              <div className="text-xs text-charcoal-500 mb-3">{h.location}, {h.country}</div>
              <div className="flex items-center justify-between">
                <div className="font-display text-xl text-plum-700">
                  ${h.price}<small className="text-xs text-charcoal-500 font-sans ml-1">/ noche</small>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => onEdit(h)} title="Editar" aria-label="Editar"
                    className="w-8 h-8 rounded-full bg-ivory-100 hover:bg-ivory-200 text-plum-700 flex items-center justify-center">
                    <Edit size={13} />
                  </button>
                  <button onClick={() => onDelete(h.id, h.name)} title="Eliminar" aria-label="Eliminar"
                    className="w-8 h-8 rounded-full bg-ivory-100 hover:bg-rose-100 text-rose-700 flex items-center justify-center">
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

function Paquetes({
  packages,
  onDelete,
  onEdit,
}: {
  packages: PackageRow[];
  onDelete: (id: string, title: string) => void;
  onEdit: (p: PackageRow) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-sm text-charcoal-500">{packages.length} paquetes activos</p>
      </div>
      <div className="space-y-4">
        {packages.map((p) => (
          <div key={p.id} className="card-soft p-5 grid md:grid-cols-[140px_1fr_auto] gap-5 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-1">{p.destination}</div>
              <h4 className="font-display text-lg">{p.title}</h4>
              <div className="text-xs text-charcoal-500 mt-1">{p.duration}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-display text-xl text-plum-700">${p.price.toLocaleString()}</div>
                {p.oldPrice > 0 && (
                  <div className="text-[10px] text-sage-500">
                    {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                <button onClick={() => onEdit(p)} title="Editar" aria-label="Editar"
                  className="w-9 h-9 rounded-full bg-ivory-100 hover:bg-ivory-200 text-plum-700 flex items-center justify-center">
                  <Edit size={14} />
                </button>
                <button onClick={() => onDelete(p.id, p.title)} title="Eliminar" aria-label="Eliminar"
                  className="w-9 h-9 rounded-full bg-ivory-100 hover:bg-rose-100 text-rose-700 flex items-center justify-center">
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

function Usuarios({
  users,
  currentUserId,
  onRoleChange,
}: {
  users: UserRow[];
  currentUserId?: string;
  onRoleChange: (userId: string, role: 'user' | 'admin') => void;
}) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return users;
    return users.filter(
      (u) => (u.name || '').toLowerCase().includes(k) || u.email.toLowerCase().includes(k)
    );
  }, [users, q]);

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre o email..."
          className="field-input max-w-xs"
        />
        <p className="text-xs text-charcoal-500">{filtered.length} usuarias</p>
      </div>
      <div className="card-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ivory-100 text-xs uppercase tracking-wider text-charcoal-500">
            <tr>
              <th className="px-6 py-3 text-left">Viajera</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Nivel</th>
              <th className="px-6 py-3 text-right">Puntos</th>
              <th className="px-6 py-3 text-left">Rol</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t border-ivory-200 hover:bg-ivory-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-plum-700 to-rose-700 text-white flex items-center justify-center font-display text-sm">
                    {(u.name || u.email).charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold">{u.name || '—'}</span>
                </td>
                <td className="px-6 py-4 text-charcoal-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="status-pill bg-ivory-200 text-charcoal-700 capitalize">
                    {u.loyaltyTier.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">{u.loyaltyPoints.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <select
                    value={u.role}
                    disabled={u.id === currentUserId}
                    onChange={(e) => onRoleChange(u.id, e.target.value as 'user' | 'admin')}
                    className={`text-xs font-semibold rounded-full px-3 py-1 border ${
                      u.role === 'admin'
                        ? 'bg-plum-700/10 text-plum-700 border-plum-700/20'
                        : 'bg-ivory-100 text-charcoal-700 border-ivory-200'
                    } ${u.id === currentUserId ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <option value="user">Usuaria</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-charcoal-500">
                  Sin resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Reportes({ bookings }: { bookings: Booking[] }) {
  const byType = useMemo(() => {
    const map = new Map<string, { count: number; revenue: number }>();
    for (const b of bookings) {
      const cur = map.get(b.type) || { count: 0, revenue: 0 };
      map.set(b.type, { count: cur.count + 1, revenue: cur.revenue + b.total });
    }
    const arr = Array.from(map.entries()).map(([type, v]) => ({ type, ...v }));
    arr.sort((a, b) => b.revenue - a.revenue);
    const total = arr.reduce((s, x) => s + x.revenue, 0) || 1;
    return arr.map((x) => ({ ...x, pct: Math.round((x.revenue / total) * 100) }));
  }, [bookings]);

  return (
    <div className="space-y-6">
      <div className="card-soft p-6">
        <h3 className="font-display text-xl mb-2">Ingresos por categoria</h3>
        <p className="text-xs text-charcoal-500 mb-5">Distribucion del total reservado</p>
        {byType.length === 0 ? (
          <p className="text-sm text-charcoal-500">Sin datos suficientes todavia.</p>
        ) : (
          <div className="space-y-3">
            {byType.map((c) => (
              <div key={c.type}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold capitalize">{c.type}</span>
                  <span className="text-charcoal-500">
                    {formatCurrency(c.revenue)} · {c.count} reservas · {c.pct}%
                  </span>
                </div>
                <div className="h-3 bg-ivory-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-plum-700 to-rose-500" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Edit Modals ──────────────────────────────────────────── */

function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 bg-plum-900/50 backdrop-blur-sm z-[100] flex items-start justify-center overflow-y-auto p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full my-8 shadow-soft-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-ivory-200">
          <h3 className="font-display text-2xl">{title}</h3>
          <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-ivory-100 flex items-center justify-center" aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function HotelEditModal({
  hotel,
  onClose,
  onSave,
}: {
  hotel: HotelRow;
  onClose: () => void;
  onSave: (h: HotelRow) => Promise<void>;
}) {
  const [form, setForm] = useState<HotelRow>(hotel);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSave(form);
    } catch (err) {
      setError('No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell title={`Editar hotel`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="field-label">Nombre</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field-input" required />
        </div>
        <div>
          <label className="field-label">Ciudad</label>
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="field-input" required />
        </div>
        <div>
          <label className="field-label">Pais</label>
          <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="field-input" required />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">URL de imagen</label>
          <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="field-input" required />
        </div>
        <div>
          <label className="field-label">Precio (USD/noche)</label>
          <input type="number" value={form.price} min={1} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="field-input" required />
        </div>
        <div>
          <label className="field-label">Estrellas (1-5)</label>
          <input type="number" min={1} max={5} value={form.stars} onChange={(e) => setForm({ ...form, stars: Number(e.target.value) })} className="field-input" required />
        </div>
        <div>
          <label className="field-label">Rating (0-5)</label>
          <input type="number" step="0.1" min={0} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="field-input" required />
        </div>
        <div>
          <label className="field-label">Etiqueta del rating</label>
          <input value={form.ratingLabel || ''} onChange={(e) => setForm({ ...form, ratingLabel: e.target.value })} className="field-input" placeholder="Excepcional" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">Descripcion</label>
          <textarea
            value={form.description || ''}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="field-input resize-y"
          />
        </div>
        {error && <p className="sm:col-span-2 text-sm text-rose-700">{error}</p>}
        <div className="sm:col-span-2 flex gap-3 mt-2">
          <button type="submit" disabled={saving} className="btn btn-primary btn-md">
            {saving ? <><Loader2 size={14} className="animate-spin" /> Guardando...</> : 'Guardar cambios'}
          </button>
          <button type="button" onClick={onClose} className="btn btn-ghost btn-md">Cancelar</button>
        </div>
      </form>
    </ModalShell>
  );
}

function PackageEditModal({
  pkg,
  onClose,
  onSave,
}: {
  pkg: PackageRow;
  onClose: () => void;
  onSave: (p: PackageRow) => Promise<void>;
}) {
  const [form, setForm] = useState<PackageRow>(pkg);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSave(form);
    } catch {
      setError('No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell title="Editar paquete" onClose={onClose}>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="field-label">Titulo</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="field-input" required />
        </div>
        <div>
          <label className="field-label">Destino</label>
          <input value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} className="field-input" required />
        </div>
        <div>
          <label className="field-label">Duracion</label>
          <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="field-input" placeholder="7 noches" required />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">URL de imagen</label>
          <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="field-input" required />
        </div>
        <div>
          <label className="field-label">Precio (USD)</label>
          <input type="number" min={1} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="field-input" required />
        </div>
        <div>
          <label className="field-label">Precio original (USD)</label>
          <input type="number" min={0} value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: Number(e.target.value) })} className="field-input" required />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">Etiqueta (badge)</label>
          <input value={form.badge || ''} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="field-input" placeholder="Luna de miel" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">Descripcion</label>
          <textarea
            value={form.description || ''}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="field-input resize-y"
          />
        </div>
        {error && <p className="sm:col-span-2 text-sm text-rose-700">{error}</p>}
        <div className="sm:col-span-2 flex gap-3 mt-2">
          <button type="submit" disabled={saving} className="btn btn-primary btn-md">
            {saving ? <><Loader2 size={14} className="animate-spin" /> Guardando...</> : 'Guardar cambios'}
          </button>
          <button type="button" onClick={onClose} className="btn btn-ghost btn-md">Cancelar</button>
        </div>
      </form>
    </ModalShell>
  );
}
