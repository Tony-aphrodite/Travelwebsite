'use client';

import Link from 'next/link';
import { Component, useEffect, useState, type ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, User, ShoppingCart, LogOut, ChevronDown, ShieldCheck, Heart, Globe } from 'lucide-react';
import { useIsNight } from '@/hooks/useIsNight';

const NAV_LINKS = [
  { href: '/vuelos', label: 'Vuelos' },
  { href: '/hoteles', label: 'Hoteles' },
  { href: '/villas', label: 'Villas' },
  { href: '/paquetes', label: 'Paquetes' },
  { href: '/autos', label: 'Autos' },
  { href: '/actividades', label: 'Experiencias' },
  { href: '/cruceros', label: 'Cruceros' },
  { href: '/asesoria-consular', label: 'Asesoria' },
  { href: '/ofertas', label: 'Ofertas' },
];

/* ── Error boundary: if auth crashes, show fallback (login buttons) ── */
class AuthBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ── Login / Register buttons (shown when NOT logged in) ── */
function AuthButtons({ lightOnDark }: { lightOnDark: boolean }) {
  return (
    <>
      <Link href="/auth/login" className={`btn btn-outline btn-sm ${lightOnDark ? 'btn-on-dark' : ''}`}>
        <User size={16} />
        Iniciar sesion
      </Link>
      <Link href="/auth/registro" className="btn btn-primary btn-sm">
        Registrarse
      </Link>
    </>
  );
}

/* ── Language switcher (visual only for now — locale stays es_MX) ── */
function LanguageSwitcher({ lightOnDark }: { lightOnDark: boolean }) {
  return (
    <button
      type="button"
      title="Idioma"
      className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
        lightOnDark
          ? 'text-ivory-50 hover:bg-ivory-50/15 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
          : 'text-charcoal-700 hover:bg-ivory-100 hover:text-plum-700'
      }`}
    >
      <Globe size={14} />
      ES
      <ChevronDown size={11} />
    </button>
  );
}

/* ── Favorites quick-access (logged-in users) ── */
function FavoritesLink({ lightOnDark }: { lightOnDark: boolean }) {
  return (
    <Link
      href="/cuenta?tab=favoritos"
      title="Favoritos"
      className={`relative p-2.5 rounded-full transition-colors ${
        lightOnDark
          ? 'text-ivory-50 hover:bg-ivory-50/15 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
          : 'text-charcoal-700 hover:bg-ivory-100 hover:text-plum-700'
      }`}
    >
      <Heart size={18} />
    </Link>
  );
}

/* ── Logged-in user area: cart + dropdown ── */
function UserArea({ lightOnDark }: { lightOnDark: boolean }) {
  const { data: session, status } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (!userMenuOpen) return;
    const close = () => setUserMenuOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [userMenuOpen]);

  const user = session?.user;
  const isLoggedIn = status === 'authenticated' && !!user;
  const isAdmin = (user as any)?.role === 'admin';

  if (!isLoggedIn) {
    return (
      <>
        <LanguageSwitcher lightOnDark={lightOnDark} />
        <AuthButtons lightOnDark={lightOnDark} />
      </>
    );
  }

  return (
    <>
      <LanguageSwitcher lightOnDark={lightOnDark} />
      <FavoritesLink lightOnDark={lightOnDark} />

      <Link
        href="/carrito"
        className={`relative p-2.5 rounded-full transition-colors ${
          lightOnDark
            ? 'text-ivory-50 hover:bg-ivory-50/15 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
            : 'text-charcoal-700 hover:bg-ivory-100 hover:text-plum-700'
        }`}
        title="Carrito"
      >
        <ShoppingCart size={18} />
      </Link>

      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setUserMenuOpen(!userMenuOpen);
          }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            lightOnDark
              ? 'bg-ivory-50/15 text-ivory-50 hover:bg-ivory-50/25 backdrop-blur-md border border-ivory-50/20 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]'
              : 'text-charcoal-700 hover:bg-ivory-100 hover:text-plum-700'
          }`}
        >
          {user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="w-7 h-7 rounded-full object-cover" />
          ) : (
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-plum-700 to-plum-600 flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0) || 'U'}
            </span>
          )}
          <span className="hidden sm:inline max-w-[100px] truncate">{user?.name?.split(' ')[0] || 'Mi Cuenta'}</span>
          <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {userMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-ivory-50 rounded-2xl shadow-soft-lg border border-ivory-200 py-2 animate-in fade-in slide-in-from-top-2">
            <div className="px-4 py-3 border-b border-ivory-200">
              <p className="text-sm font-semibold text-charcoal-900 truncate">{user?.name}</p>
              <p className="text-xs text-charcoal-500 truncate">{user?.email}</p>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 mt-2 text-[10px] uppercase tracking-widest font-bold text-gold-700">
                  <ShieldCheck size={11} /> Administrador
                </span>
              )}
            </div>
            {isAdmin && (
              <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-plum-700 bg-gold-100 hover:bg-gold-200 transition-colors border-b border-ivory-200">
                <ShieldCheck size={15} /> Panel admin
              </Link>
            )}
            <Link href="/cuenta" className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-rose-100 hover:text-plum-700 transition-colors">
              <User size={15} /> Mi cuenta
            </Link>
            <Link href="/carrito" className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-rose-100 hover:text-plum-700 transition-colors">
              <ShoppingCart size={15} /> Carrito
            </Link>
            <hr className="my-1 border-ivory-200" />
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} /> Cerrar sesion
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ── Mobile menu auth section ── */
function MobileAuthSection({ onClose }: { onClose: () => void }) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoggedIn = status === 'authenticated' && !!user;
  const isAdmin = (user as any)?.role === 'admin';

  if (isLoggedIn) {
    return (
      <>
        {isAdmin && (
          <Link href="/admin" className="px-8 py-3 text-sm font-bold text-plum-700 bg-gold-100 hover:bg-gold-200 flex items-center gap-2" onClick={onClose}>
            <ShieldCheck size={15} /> Panel admin
          </Link>
        )}
        <Link href="/cuenta" className="px-8 py-3 text-sm font-medium text-charcoal-700 hover:bg-ivory-100 hover:text-plum-700" onClick={onClose}>
          Mi cuenta
        </Link>
        <Link href="/carrito" className="px-8 py-3 text-sm font-medium text-charcoal-700 hover:bg-ivory-100 hover:text-plum-700" onClick={onClose}>
          Carrito
        </Link>
        <button onClick={() => { signOut({ callbackUrl: '/' }); onClose(); }} className="px-8 py-3 text-sm font-medium text-left text-red-600 hover:bg-red-50">
          Cerrar sesion
        </button>
      </>
    );
  }

  return (
    <>
      <Link href="/auth/login" className="px-8 py-3 text-sm font-medium text-charcoal-700 hover:bg-ivory-100 hover:text-plum-700" onClick={onClose}>
        Iniciar sesion
      </Link>
      <Link href="/auth/registro" className="px-8 py-3 text-sm font-medium text-plum-700 font-semibold hover:bg-ivory-100" onClick={onClose}>
        Registrarse gratis
      </Link>
    </>
  );
}

function MobileAuthFallback({ onClose }: { onClose: () => void }) {
  return (
    <>
      <Link href="/auth/login" className="px-8 py-3 text-sm font-medium text-charcoal-700 hover:bg-ivory-100 hover:text-plum-700" onClick={onClose}>
        Iniciar sesion
      </Link>
      <Link href="/auth/registro" className="px-8 py-3 text-sm font-medium text-plum-700 font-semibold hover:bg-ivory-100" onClick={onClose}>
        Registrarse gratis
      </Link>
    </>
  );
}

/* ── Main Header ── */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isNight = useIsNight();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Light text only when we're at the top AND it's night.
  // Once you scroll the bar gets its cream backdrop and dark text is fine again.
  const lightOnDark = !scrolled && isNight;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'py-3 bg-ivory-50/90 backdrop-blur-xl border-b border-ivory-200 shadow-soft'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-plum-900 text-sm font-bold shadow-soft">
            A
          </span>
          <span
            className={`font-display text-[1.6rem] font-bold tracking-tight transition-colors duration-500 ${
              lightOnDark ? 'text-ivory-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]' : 'text-plum-700'
            }`}
          >
            Aurelia
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors py-2 group ${
                lightOnDark
                  ? 'text-ivory-50 hover:text-gold-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
                  : 'text-charcoal-700 hover:text-plum-700'
              }`}
            >
              {link.label}
              <span
                className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-px group-hover:w-full transition-all duration-500 ${
                  lightOnDark ? 'bg-gold-300' : 'bg-plum-700'
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AuthBoundary fallback={<AuthButtons lightOnDark={lightOnDark} />}>
            <UserArea lightOnDark={lightOnDark} />
          </AuthBoundary>

          <button
            className="lg:hidden p-2 text-plum-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-ivory-50/95 backdrop-blur-xl border-b border-ivory-200 shadow-soft-md">
          <nav className="flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-8 py-3 text-sm font-medium text-charcoal-700 hover:bg-ivory-100 hover:text-plum-700"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 mx-6 border-ivory-200" />
            <AuthBoundary fallback={<MobileAuthFallback onClose={() => setMobileOpen(false)} />}>
              <MobileAuthSection onClose={() => setMobileOpen(false)} />
            </AuthBoundary>
          </nav>
        </div>
      )}
    </header>
  );
}
