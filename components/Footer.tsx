import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const SECTIONS = [
  {
    title: 'Explorar',
    links: [
      { href: '/vuelos', label: 'Vuelos' },
      { href: '/hoteles', label: 'Hoteles' },
      { href: '/villas', label: 'Villas' },
      { href: '/paquetes', label: 'Paquetes' },
      { href: '/actividades', label: 'Experiencias' },
    ],
  },
  {
    title: 'Aurelia',
    links: [
      { href: '/nosotros', label: 'Sobre Nosotros' },
      { href: '/blog', label: 'Diario de Viaje' },
      { href: '/ofertas', label: 'Ofertas Exclusivas' },
      { href: '/destinos', label: 'Destinos' },
      { href: '/cuenta', label: 'Mi Aurelia' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { href: '/contacto', label: 'Contacto' },
      { href: '/contacto', label: 'Centro de Ayuda' },
      { href: '#', label: 'Politica de Cancelacion' },
      { href: '#', label: 'Terminos y Condiciones' },
      { href: '#', label: 'Privacidad' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-plum-900 text-white/70 pt-20 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-500 via-rose-500 to-plum-600 flex items-center justify-center text-white text-sm font-bold">
                A
              </span>
              <span className="font-display text-[1.6rem] font-bold text-white">Aurelia</span>
            </Link>
            <p className="max-w-sm leading-relaxed mb-6">
              Viajes curados con el arte de la hospitalidad y el lujo discreto. Descubre el mundo
              con elegancia.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-white hover:bg-gold-600 hover:text-charcoal-900 hover:-translate-y-1 transition-all duration-500"
                  aria-label="social"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-gold-500 hover:pl-1 transition-all duration-300 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>&copy; 2026 Aurelia Viajes. Todos los derechos reservados. Licencia #AV-2024-1872</div>
          <div className="flex gap-2 items-center">
            {['VISA', 'MASTERCARD', 'AMEX', 'PAYPAL', 'STRIPE'].map((p) => (
              <span key={p} className="px-2.5 py-1 bg-white/[0.06] rounded text-[10px] font-semibold tracking-wider">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
