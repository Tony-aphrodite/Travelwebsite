import Link from 'next/link';
import { Compass, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { getDestinations } from '@/lib/db/queries';

const REGIONS = [
  { name: 'Europa', count: 34, color: 'from-plum-700 to-rose-400' },
  { name: 'Asia', count: 28, color: 'from-gold-600 to-gold-500' },
  { name: 'Caribe & Oceania', count: 19, color: 'from-sage-500 to-sage-400' },
  { name: 'Medio Oriente', count: 12, color: 'from-plum-800 to-plum-600' },
];

export default async function DestinosPage() {
  const destinations = await getDestinations();

  const featured = destinations[0];
  const rest = destinations.slice(1);

  return (
    <>
      <PageHeader
        eyebrow="Inspiracion para viajeras"
        title="Destinos que <span class='italic-script'>enamoran</span>"
        subtitle="Lugares curados por nuestras expertas. Cada uno con su propio caracter, elegancia y magia."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Destinos' }]}
      />

      {/* Regions */}
      <section className="container-site -mt-8 relative z-10 mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REGIONS.map((r) => (
            <div
              key={r.name}
              className={`rounded-2xl p-6 bg-gradient-to-br ${r.color} text-white shadow-soft hover:shadow-soft-lg transition-shadow`}
            >
              <Compass size={22} className="mb-3 opacity-80" />
              <div className="font-display text-xl">{r.name}</div>
              <div className="text-xs opacity-80 mt-1">{r.count} destinos</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="container-site mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={16} className="text-gold-600" />
            <span className="eyebrow">Destino del mes</span>
          </div>
          <article className="card-soft overflow-hidden grid lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto min-h-[380px]">
              <img
                src={featured.image}
                alt={featured.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div className="text-xs uppercase tracking-widest text-gold-700 mb-2 font-semibold">
                {featured.country}
              </div>
              <h2 className="heading-lg mb-3">{featured.name}</h2>
              <p className="font-script italic text-xl text-charcoal-700 mb-4">
                &ldquo;{featured.tagline}&rdquo;
              </p>
              <p className="text-charcoal-700 leading-relaxed mb-6">
                Descubre {featured.name} como nunca antes. Nuestras viajeras lo describen como el
                lugar donde el tiempo se detiene, las puestas de sol pintan el cielo y cada rincon
                guarda un secreto por descubrir.
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-sm text-charcoal-500">Desde</span>
                <span className="font-display text-4xl text-plum-700">
                  ${featured.priceFrom.toLocaleString()}
                </span>
                <span className="text-sm text-charcoal-500">USD</span>
              </div>
              <div className="flex gap-3">
                <Link href="/paquetes" className="btn btn-primary btn-md">
                  Ver paquetes
                </Link>
                <Link href="/hoteles" className="btn btn-outline btn-md">
                  Explorar hoteles
                </Link>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Grid */}
      <section className="container-site pb-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="eyebrow">Todos los destinos</span>
            <h2 className="heading-md mt-2">Explora el mundo con Aurelia</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((d) => (
            <Link
              key={d.id}
              href="/paquetes"
              className="card-soft overflow-hidden group block"
            >
              <div className="relative aspect-[4/5]">
                <img
                  src={d.image}
                  alt={d.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-[11px] uppercase tracking-widest opacity-80 mb-1">
                    {d.country}
                  </div>
                  <h3 className="font-display text-2xl mb-1">{d.name}</h3>
                  <p className="font-script italic text-sm opacity-90">{d.tagline}</p>
                  <div className="mt-3 pt-3 border-t border-white/20 flex justify-between items-center">
                    <span className="text-xs opacity-70">Desde</span>
                    <span className="font-display text-lg">${d.priceFrom.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
