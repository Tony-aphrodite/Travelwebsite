import Link from 'next/link';
import { Flame, Clock, Tag, Sparkles, Percent, type LucideIcon } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { getPackages, getHotels } from '@/lib/db/queries';

export default async function OfertasPage() {
  const [packages, hotels] = await Promise.all([getPackages(), getHotels()]);

  return (
    <>
      <PageHeader
        eyebrow="Ofertas Aurelia"
        title="Descuentos <span class='italic-script'>que enamoran</span>"
        subtitle="Promociones limitadas, descuentos exclusivos para miembros y ofertas flash por tiempo limitado."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Ofertas' }]}
      />

      {/* Flash deal */}
      <section className="container-site -mt-8 relative z-10 mb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-plum-900 via-plum-800 to-plum-700 p-10 lg:p-14 text-white shadow-soft-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl -translate-y-20 translate-x-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-400/20 rounded-full blur-3xl translate-y-20" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Flame size={18} className="text-gold-400" />
                <span className="text-xs uppercase tracking-widest text-gold-400">
                  Oferta flash
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl mb-4 leading-tight">
                40% OFF en <span className="italic-script text-gold-400">lunas de miel</span>
              </h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                Reserva antes del 30 de abril tu luna de miel en Maldivas, Bali o Santorini.
                Incluye upgrade gratuito y cena romantica.
              </p>
              <div className="flex gap-4 mb-8">
                <CountBox value="02" label="Dias" />
                <CountBox value="18" label="Horas" />
                <CountBox value="45" label="Min" />
                <CountBox value="30" label="Seg" />
              </div>
              <Link href="/paquetes" className="btn btn-gold btn-lg">
                Aprovechar ahora
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80"
                alt="Luna de miel"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-site mb-16">
        <div className="grid sm:grid-cols-3 gap-6">
          <CategoryCard
            icon={Percent}
            title="Hasta 50% OFF"
            desc="Hoteles seleccionados"
            color="bg-gradient-to-br from-plum-700 to-plum-500"
          />
          <CategoryCard
            icon={Sparkles}
            title="Solo para miembros"
            desc="Aurelia Society exclusivo"
            color="bg-gradient-to-br from-gold-600 to-gold-400"
          />
          <CategoryCard
            icon={Tag}
            title="Ultimo minuto"
            desc="Salidas esta semana"
            color="bg-gradient-to-br from-rose-400 to-rose-300"
          />
        </div>
      </section>

      {/* Deals grid */}
      <section className="container-site pb-24">
        <div className="flex items-center gap-2 mb-6">
          <Flame size={16} className="text-gold-600" />
          <span className="eyebrow">Ofertas activas</span>
        </div>
        <h2 className="heading-md mb-8">Escapa sin arruinarte</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.slice(0, 3).map((pkg) => {
            const save = pkg.oldPrice - pkg.price;
            const pct = Math.round((save / pkg.oldPrice) * 100);
            return (
              <article
                key={pkg.id}
                className="card-soft overflow-hidden hover:-translate-y-1 hover:shadow-soft-lg group"
              >
                <div className="relative aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-gold-600 to-gold-500 text-charcoal-900 px-3 py-1.5 rounded-full text-xs font-bold">
                    -{pct}%
                  </span>
                  <span className="absolute top-4 right-4 bg-white/95 text-plum-700 px-2 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1">
                    <Clock size={10} /> 48h
                  </span>
                </div>
                <div className="p-6">
                  <div className="text-[11px] uppercase tracking-widest text-gold-700 font-semibold mb-1">
                    {pkg.destination}
                  </div>
                  <h3 className="font-display text-xl mb-2 leading-tight">{pkg.title}</h3>
                  <p className="text-sm text-charcoal-500 line-clamp-2 mb-4">{pkg.description}</p>
                  <div className="flex items-end justify-between pt-4 border-t border-ivory-200">
                    <div>
                      <div className="line-through text-charcoal-500 text-xs">
                        ${pkg.oldPrice.toLocaleString()}
                      </div>
                      <div className="font-display text-2xl text-plum-700 leading-none">
                        ${pkg.price.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-sage-500 font-semibold mt-1">
                        Ahorras ${save.toLocaleString()}
                      </div>
                    </div>
                    <Link href="/carrito" className="btn btn-primary btn-sm">
                      Reservar
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}

          {hotels.slice(0, 3).map((h) => (
            <article
              key={h.id}
              className="card-soft overflow-hidden hover:-translate-y-1 hover:shadow-soft-lg group"
            >
              <div className="relative aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={h.image}
                  alt={h.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-plum-700 to-plum-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  -25%
                </span>
              </div>
              <div className="p-6">
                <div className="text-[11px] uppercase tracking-widest text-charcoal-500 mb-1">
                  {h.location}, {h.country}
                </div>
                <h3 className="font-display text-xl mb-2 leading-tight">{h.name}</h3>
                <p className="text-sm text-charcoal-500 line-clamp-2 mb-4">{h.description}</p>
                <div className="flex items-end justify-between pt-4 border-t border-ivory-200">
                  <div>
                    <div className="line-through text-charcoal-500 text-xs">
                      ${Math.round(h.price * 1.33)}
                    </div>
                    <div className="font-display text-2xl text-plum-700 leading-none">
                      ${h.price}
                      <small className="text-xs text-charcoal-500 font-sans ml-1">/ noche</small>
                    </div>
                  </div>
                  <Link href={`/hotel/${h.id}`} className="btn btn-primary btn-sm">
                    Ver
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function CountBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-center min-w-[64px]">
      <div className="font-display text-2xl">{value}</div>
      <div className="text-[10px] uppercase tracking-widest opacity-70">{label}</div>
    </div>
  );
}

function CategoryCard({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div className={`rounded-2xl p-8 text-white shadow-soft ${color}`}>
      <Icon size={28} className="mb-4 opacity-90" />
      <div className="font-display text-2xl mb-1">{title}</div>
      <div className="text-sm opacity-80">{desc}</div>
    </div>
  );
}
