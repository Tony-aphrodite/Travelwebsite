'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
  Loader2,
  type LucideIcon,
} from 'lucide-react';

type Tab = 'resumen' | 'viajes' | 'favoritos' | 'recompensas' | 'datos' | 'notificaciones';

const TABS: { key: Tab; label: string; icon: LucideIcon }[] = [
  { key: 'resumen', label: 'Resumen', icon: User },
  { key: 'viajes', label: 'Mis viajes', icon: Plane },
  { key: 'favoritos', label: 'Favoritos', icon: Heart },
  { key: 'recompensas', label: 'Recompensas', icon: Award },
  { key: 'datos', label: 'Datos personales', icon: Settings },
  { key: 'notificaciones', label: 'Notificaciones', icon: Bell },
];

type Booking = {
  id: string;
  type: string;
  itemId: string;
  itemName: string;
  status: string;
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  quantity: number;
  unitPrice: number;
  total: number;
  pointsEarned: number;
  createdAt: string;
};

type Favorite = {
  id: number;
  type: string;
  itemId: string;
  createdAt: string;
};

export default function CuentaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('resumen');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      Promise.all([
        fetch('/api/bookings').then((r) => r.json()),
        fetch('/api/favorites').then((r) => r.json()),
      ])
        .then(([b, f]) => {
          if (Array.isArray(b)) setBookings(b);
          if (Array.isArray(f)) setFavorites(f);
        })
        .finally(() => setLoadingData(false));
    }
  }, [status]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="pt-28 pb-20 bg-ivory-100 min-h-screen flex items-center justify-center">
        <Loader2 size={40} className="text-plum-700 animate-spin" />
      </div>
    );
  }

  const user = session?.user;
  const userName = user?.name || 'Viajera';
  const userEmail = user?.email || '';
  const userInitial = userName.charAt(0).toUpperCase();
  const userRole = (user as any)?.role || 'user';

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
              {user?.image ? (
                <img
                  src={user.image}
                  alt={userName}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-plum-700 to-rose-400 text-white flex items-center justify-center mx-auto mb-3 font-display text-3xl">
                  {userInitial}
                </div>
              )}
              <h3 className="font-display text-xl">{userName}</h3>
              <p className="text-xs text-charcoal-500 mb-3">{userEmail}</p>
              <span className="status-pill bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-900">
                <Sparkles size={12} /> Miembro
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
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-charcoal-500 hover:bg-ivory-100 text-left"
              >
                <LogOut size={16} />
                Cerrar sesion
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div>
            {loadingData ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="text-plum-700 animate-spin" />
              </div>
            ) : (
              <>
                {tab === 'resumen' && (
                  <ResumenTab
                    userName={userName}
                    bookings={bookings}
                    favoritesCount={favorites.length}
                  />
                )}
                {tab === 'viajes' && <ViajesTab bookings={bookings} />}
                {tab === 'favoritos' && <FavoritosTab favorites={favorites} />}
                {tab === 'recompensas' && <RecompensasTab />}
                {tab === 'datos' && <DatosTab userName={userName} userEmail={userEmail} />}
                {tab === 'notificaciones' && <NotificacionesTab />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResumenTab({
  userName,
  bookings,
  favoritesCount,
}: {
  userName: string;
  bookings: Booking[];
  favoritesCount: number;
}) {
  const totalPoints = bookings.reduce((sum, b) => sum + (b.pointsEarned || 0), 0);
  const upcomingBooking = bookings.find(
    (b) => b.status === 'confirmed' || b.status === 'pending'
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-lg mb-2">Bienvenida, {userName.split(' ')[0]}</h1>
        <p className="text-charcoal-500">
          Tu proxima aventura te espera. Revisa tus reservas y recompensas.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard
          icon={Plane}
          label="Viajes realizados"
          value={String(bookings.length)}
          accent="plum"
        />
        <StatCard
          icon={Award}
          label="Puntos acumulados"
          value={totalPoints.toLocaleString()}
          accent="gold"
        />
        <StatCard
          icon={Heart}
          label="Favoritos guardados"
          value={String(favoritesCount)}
          accent="rose"
        />
      </div>

      {/* Loyalty card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-plum-900 via-plum-800 to-plum-700 p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl -translate-y-20 translate-x-20" />
        <div className="relative">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-widest opacity-70">Aurelia Society</div>
              <div className="font-display text-3xl">Miembro</div>
            </div>
            <Sparkles size={32} className="text-gold-500" />
          </div>
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-2 opacity-80">
              <span>{totalPoints.toLocaleString()} puntos acumulados</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
                style={{ width: `${Math.min(100, (totalPoints / 8000) * 100)}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[11px] opacity-70">Viajes completados</div>
              <div className="font-display text-lg">{bookings.length}</div>
            </div>
            <button className="btn btn-gold btn-sm">Ver beneficios</button>
          </div>
        </div>
      </div>

      {/* Upcoming trip */}
      {upcomingBooking && (
        <div>
          <h2 className="font-display text-2xl mb-4">Proximo viaje</h2>
          <article className="card-soft overflow-hidden p-6">
            <span
              className={`status-pill ${
                upcomingBooking.status === 'confirmed'
                  ? 'bg-sage-100 text-sage-500'
                  : 'bg-gold-100 text-gold-700'
              }`}
            >
              {upcomingBooking.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
            </span>
            <h3 className="font-display text-2xl mt-3">{upcomingBooking.itemName}</h3>
            <div className="flex items-center gap-4 mt-4 text-sm text-charcoal-700">
              {upcomingBooking.checkIn && (
                <span className="flex items-center gap-1">
                  <Calendar size={14} className="text-plum-700" />
                  {new Date(upcomingBooking.checkIn).toLocaleDateString('es-ES')}
                  {upcomingBooking.checkOut &&
                    ` - ${new Date(upcomingBooking.checkOut).toLocaleDateString('es-ES')}`}
                </span>
              )}
              <span>· {upcomingBooking.guests} huespedes</span>
            </div>
            <div className="flex gap-2 mt-5">
              <button className="btn btn-primary btn-sm">Ver detalle</button>
            </div>
          </article>
        </div>
      )}
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

function ViajesTab({ bookings }: { bookings: Booking[] }) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filtered = bookings.filter((b) => {
    if (filter === 'upcoming')
      return b.status === 'confirmed' || b.status === 'pending';
    if (filter === 'past') return b.status === 'completed' || b.status === 'cancelled';
    return true;
  });

  const statusLabel = (s: string) => {
    switch (s) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendiente';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return s;
    }
  };

  const statusStyle = (s: string) => {
    switch (s) {
      case 'confirmed': return 'bg-sage-100 text-sage-500';
      case 'pending': return 'bg-gold-100 text-gold-700';
      case 'cancelled': return 'bg-rose-100 text-rose-400';
      default: return 'bg-ivory-200 text-charcoal-700';
    }
  };

  return (
    <div>
      <h1 className="heading-lg mb-2">Mis viajes</h1>
      <p className="text-charcoal-500 mb-6">Tu historial y reservas en curso</p>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`btn btn-sm ${filter === 'upcoming' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Proximos
        </button>
        <button
          onClick={() => setFilter('past')}
          className={`btn btn-sm ${filter === 'past' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Pasados
        </button>
      </div>
      {filtered.length === 0 ? (
        <div className="card-soft p-12 text-center">
          <Plane size={40} className="text-plum-700 mx-auto mb-3 opacity-50" />
          <p className="text-charcoal-500">No hay viajes en esta categoria</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <article key={b.id} className="card-soft overflow-hidden p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`status-pill ${statusStyle(b.status)}`}>
                    {statusLabel(b.status)}
                  </span>
                  <h3 className="font-display text-xl mt-3">{b.itemName}</h3>
                  <div className="text-xs text-charcoal-500 mt-1 uppercase tracking-wider">
                    {b.type}
                  </div>
                  {b.checkIn && (
                    <div className="text-sm text-charcoal-700 mt-3 flex items-center gap-1">
                      <Calendar size={13} className="text-plum-700" />
                      {new Date(b.checkIn).toLocaleDateString('es-ES')}
                      {b.checkOut &&
                        ` - ${new Date(b.checkOut).toLocaleDateString('es-ES')}`}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-display text-xl text-plum-700">
                    ${b.total.toLocaleString()}
                  </div>
                  <div className="text-xs text-charcoal-500">
                    +{b.pointsEarned} puntos
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function FavoritosTab({ favorites }: { favorites: Favorite[] }) {
  return (
    <div>
      <h1 className="heading-lg mb-2">Favoritos</h1>
      <p className="text-charcoal-500 mb-6">Los lugares que has guardado para sonar despues</p>
      {favorites.length === 0 ? (
        <div className="card-soft p-12 text-center">
          <Heart size={40} className="text-plum-700 mx-auto mb-3 opacity-50" />
          <p className="text-charcoal-500">Aun no has guardado favoritos</p>
          <Link href="/" className="btn btn-primary btn-sm mt-4 inline-block">
            Explorar destinos
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {favorites.map((f) => (
            <article key={f.id} className="card-soft overflow-hidden group">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-charcoal-500">
                      {f.type}
                    </span>
                    <h3 className="font-display text-lg">{f.itemId}</h3>
                  </div>
                  <button className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-400">
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
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
          <div className="font-display text-3xl text-plum-700">--</div>
          <div className="text-xs text-charcoal-500 uppercase tracking-wider">Puntos actuales</div>
        </div>
        <div className="card-soft p-5 text-center">
          <Gift className="text-gold-600 mx-auto mb-2" size={20} />
          <div className="font-display text-3xl text-plum-700">--</div>
          <div className="text-xs text-charcoal-500 uppercase tracking-wider">Para siguiente nivel</div>
        </div>
        <div className="card-soft p-5 text-center">
          <Sparkles className="text-rose-400 mx-auto mb-2" size={20} />
          <div className="font-display text-3xl text-plum-700">--</div>
          <div className="text-xs text-charcoal-500 uppercase tracking-wider">Ahorros totales</div>
        </div>
      </div>

      <h2 className="font-display text-2xl mb-4">Niveles de membresia</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-2xl p-6 bg-white border border-ivory-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-plum-700" />
              <h3 className="font-display text-xl">{tier.name}</h3>
            </div>
            <div className="text-xs mb-4 text-charcoal-500">
              {tier.points} puntos
            </div>
            <ul className="space-y-2 text-sm">
              {tier.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="text-plum-700">&#10003;</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function DatosTab({ userName, userEmail }: { userName: string; userEmail: string }) {
  const nameParts = userName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return (
    <div>
      <h1 className="heading-lg mb-2">Datos personales</h1>
      <p className="text-charcoal-500 mb-6">Mantiene tu informacion actualizada</p>

      <div className="card-soft p-7 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="field-label">Nombre</label>
            <input type="text" defaultValue={firstName} className="field-input" />
          </div>
          <div>
            <label className="field-label">Apellidos</label>
            <input type="text" defaultValue={lastName} className="field-input" />
          </div>
          <div>
            <label className="field-label">Email</label>
            <input type="email" defaultValue={userEmail} className="field-input" readOnly />
          </div>
          <div>
            <label className="field-label">Telefono</label>
            <input type="tel" placeholder="+52 55 1234 5678" className="field-input" />
          </div>
          <div>
            <label className="field-label">Pais</label>
            <input type="text" placeholder="Mexico" className="field-input" />
          </div>
          <div>
            <label className="field-label">Fecha de nacimiento</label>
            <input type="date" className="field-input" />
          </div>
        </div>

        <hr className="border-ivory-200" />

        <h3 className="font-display text-lg flex items-center gap-2">
          <CreditCard size={18} className="text-plum-700" />
          Metodos de pago
        </h3>
        <p className="text-sm text-charcoal-500">
          Los pagos se gestionan de forma segura a traves de Stripe.
        </p>

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
    { label: 'Ofertas exclusivas para miembros', desc: 'Promociones flash y descuentos', on: true },
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
