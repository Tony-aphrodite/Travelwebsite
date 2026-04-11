'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, User } from 'lucide-react';

const NAV_LINKS = [
  { href: '/vuelos', label: 'Vuelos' },
  { href: '/hoteles', label: 'Hoteles' },
  { href: '/villas', label: 'Villas' },
  { href: '/paquetes', label: 'Paquetes' },
  { href: '/autos', label: 'Autos' },
  { href: '/actividades', label: 'Experiencias' },
  { href: '/ofertas', label: 'Ofertas' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'py-3 bg-ivory-50/90 backdrop-blur-xl border-b border-ivory-300 shadow-soft'
          : 'py-5 bg-ivory-50/70 backdrop-blur-xl border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-500 via-rose-500 to-plum-600 flex items-center justify-center text-white text-sm font-bold shadow-soft">
            A
          </span>
          <span className="font-display text-[1.6rem] font-bold text-plum-700 tracking-tight">
            Aurelia
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-charcoal-700 hover:text-plum-700 transition-colors py-2 group"
            >
              {link.label}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-px bg-plum-700 group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/cuenta" className="hidden sm:inline-flex btn btn-ghost btn-sm">
            <User size={16} />
            Mi Cuenta
          </Link>
          <Link href="/contacto" className="btn btn-primary btn-sm">
            Reservar
          </Link>
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-ivory-50/95 backdrop-blur-xl border-b border-ivory-300 shadow-soft-md">
          <nav className="flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-8 py-3 text-sm font-medium text-charcoal-700 hover:bg-rose-100 hover:text-plum-700"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
