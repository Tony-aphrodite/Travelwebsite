import Link from 'next/link';
import Image from 'next/image';
import { Star, Award } from 'lucide-react';
import SearchWidget from '@/components/SearchWidget';
import { destinations, packages, activities, testimonials, blogPosts } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-ivory-100 to-rose-100 min-h-screen">
        <div className="absolute w-[400px] h-[400px] -top-24 -right-24 rounded-full bg-gold-600/20 blur-3xl pointer-events-none" />
        <div className="absolute w-[300px] h-[300px] -bottom-12 left-[10%] rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative z-10">
          <div className="max-w-[600px]">
            <span className="eyebrow">Coleccion 2026</span>
            <h1 className="heading-xl mt-6 mb-6 text-balance">
              El arte de viajar, <span className="italic-script">redescubierto</span> para ti.
            </h1>
            <p className="text-[18px] text-charcoal-700 mb-8 max-w-[500px] leading-relaxed">
              Aurelia crea experiencias de viaje que combinan el lujo discreto con el alma de cada
              destino. Vuelos, hoteles boutique, villas privadas y momentos que recordaras para
              siempre.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#search" className="btn btn-primary btn-lg">
                Planifica tu viaje
              </Link>
              <Link href="/destinos" className="btn btn-outline btn-lg">
                Explorar destinos
              </Link>
            </div>
            <div className="flex gap-10 mt-12 pt-8 border-t border-ivory-300 flex-wrap">
              {[
                { value: '120+', label: 'Destinos curados' },
                { value: '15k', label: 'Viajeras felices' },
                { value: '4.9', label: 'Valoracion' },
              ].map((stat) => (
                <div key={stat.label}>
                  <strong className="font-display text-4xl text-plum-700 block leading-none">
                    {stat.value}
                  </strong>
                  <span className="text-xs text-charcoal-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[500px] lg:h-[600px]">
            <div className="absolute w-[280px] lg:w-[340px] h-[360px] lg:h-[440px] top-5 right-16 overflow-hidden shadow-soft-xl animate-float rounded-t-[200px]">
              <Image
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80"
                alt="Destino de lujo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 280px, 340px"
                priority
                unoptimized
              />
            </div>
            <div className="absolute w-[180px] lg:w-[220px] h-[240px] lg:h-[280px] bottom-10 left-0 overflow-hidden shadow-soft-xl animate-float-delayed rounded-b-[200px]">
              <Image
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80"
                alt="Experiencia de viaje"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 180px, 220px"
                unoptimized
              />
            </div>
            <div className="absolute bottom-16 right-5 bg-white p-4 rounded-2xl shadow-soft-lg flex items-center gap-3 animate-float">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-600 to-rose-500 flex items-center justify-center text-white">
                <Award size={20} />
              </div>
              <div>
                <strong className="block text-sm text-charcoal-900 font-semibold">
                  Premiado 2025
                </strong>
                <span className="text-xs text-charcoal-500">Mejor agencia boutique</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH WIDGET */}
      <div id="search" className="container-site -mt-20 relative z-20">
        <SearchWidget />
      </div>

      {/* DESTINATIONS */}
      <section className="py-24">
        <div className="container-site">
          <div className="flex justify-between items-end gap-8 flex-wrap mb-12">
            <div className="max-w-xl">
              <span className="eyebrow">Destinos del momento</span>
              <h2 className="heading-lg mt-4">
                Lugares que <span className="italic-script">enamoran</span>
              </h2>
            </div>
            <p className="max-w-md text-charcoal-500">
              Una seleccion cuidada de destinos para tu proxima escapada. Desde playas turquesa
              hasta ciudades historicas.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {destinations.slice(0, 5).map((dest, i) => (
              <Link
                key={dest.id}
                href={`/hotel/${dest.id}`}
                className={`relative rounded-3xl overflow-hidden shadow-soft-md cursor-pointer group transition-all duration-500 hover:-translate-y-2 hover:shadow-soft-xl bg-ivory-200 ${
                  i === 0
                    ? 'col-span-12 md:col-span-6 row-span-2 aspect-[4/5] md:aspect-auto'
                    : 'col-span-6 md:col-span-3 aspect-[3/4]'
                }`}
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-gold-500 font-semibold">
                    {dest.country}
                  </span>
                  <h3 className="font-display text-2xl mt-1 mb-2 text-white">
                    {dest.name}
                    {i === 0 && `, ${dest.tagline.toLowerCase()}`}
                  </h3>
                  <div className="text-sm opacity-90">
                    Desde{' '}
                    <strong className="font-display text-xl ml-1">
                      ${dest.priceFrom.toLocaleString()}
                    </strong>{' '}
                    USD
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section className="py-24 bg-ivory-50">
        <div className="container-site">
          <div className="flex justify-between items-end gap-8 flex-wrap mb-12">
            <div className="max-w-xl">
              <span className="eyebrow">Ofertas exclusivas</span>
              <h2 className="heading-lg mt-4">
                Escapadas <span className="italic-script">irresistibles</span>
              </h2>
            </div>
            <Link href="/ofertas" className="btn btn-outline btn-md">
              Ver todas las ofertas
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.slice(0, 3).map((pkg) => (
              <div
                key={pkg.id}
                className="card-soft overflow-hidden group hover:-translate-y-2 hover:shadow-soft-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ivory-200">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <span className="absolute top-4 left-4 bg-plum-700 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider">
                    {pkg.badge}
                  </span>
                </div>
                <div className="p-7">
                  <div className="text-xs uppercase tracking-widest text-charcoal-500">
                    {pkg.destination}
                  </div>
                  <h3 className="font-display text-xl mt-2 mb-2">{pkg.title}</h3>
                  <p className="text-sm text-charcoal-500 mb-4">{pkg.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-ivory-200">
                    <div>
                      <div className="line-through text-charcoal-500 text-sm">
                        ${pkg.oldPrice.toLocaleString()} USD
                      </div>
                      <div className="font-display text-2xl text-plum-700 font-semibold leading-none">
                        ${pkg.price.toLocaleString()}{' '}
                        <small className="text-xs text-charcoal-500 font-sans">/ persona</small>
                      </div>
                    </div>
                    <Link href={`/paquetes`} className="btn btn-primary btn-sm">
                      Reservar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REWARDS */}
      <section className="py-24 bg-gradient-to-br from-plum-800 to-plum-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(212,165,116,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(232,165,181,0.2),transparent_50%)] pointer-events-none" />
        <div className="container-site grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <span className="eyebrow" style={{ color: '#D4B97D' }}>
              Aurelia Society
            </span>
            <h2 className="heading-lg mt-4 mb-6 text-white">
              Unete al <em className="italic text-gold-500 font-normal">club de las viajeras</em>{' '}
              del mundo.
            </h2>
            <p className="text-white/80 text-[17px] mb-8 max-w-lg">
              Acumula puntos con cada reserva y disfruta de beneficios exclusivos: upgrades de
              habitacion, amenidades, acceso VIP y precios solo para miembros.
            </p>

            <div className="flex gap-4 mb-10 flex-wrap">
              {[
                { tier: 'Silver', desc: '1,000 pts · 5% desc.' },
                { tier: 'Rose Gold', desc: '5,000 pts · 12% desc.' },
                { tier: 'Platinum', desc: '15,000 pts · 20% + upgrades' },
              ].map((t) => (
                <div
                  key={t.tier}
                  className="flex-1 min-w-[140px] p-5 bg-white/[0.08] border border-white/10 rounded-2xl backdrop-blur"
                >
                  <strong className="font-display text-lg text-gold-500 block mb-1">
                    {t.tier}
                  </strong>
                  <span className="text-xs text-white/65">{t.desc}</span>
                </div>
              ))}
            </div>

            <Link href="/cuenta" className="btn btn-gold btn-lg">
              Unirse gratis
            </Link>
          </div>

          <div className="relative h-[400px] lg:h-[500px]">
            <div className="absolute top-1/2 left-1/2 w-full max-w-[420px] aspect-[1.6/1] -translate-x-1/2 -translate-y-1/2 -rotate-[4deg] hover:rotate-0 transition-transform duration-700 bg-gradient-to-br from-gold-600 via-gold-500 to-rose-500 rounded-3xl shadow-soft-xl p-8 text-charcoal-900 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-semibold">
                    Aurelia Society
                  </h4>
                  <div className="mt-2 font-display text-2xl">Rose Gold</div>
                </div>
                <Star size={40} fill="currentColor" className="opacity-60" />
              </div>
              <div>
                <div className="font-display text-xl tracking-[0.1em]">•••• •••• •••• 8472</div>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <small className="text-[11px] uppercase tracking-wider opacity-70">
                      Miembro desde
                    </small>
                    <div className="font-semibold mt-1">2024</div>
                  </div>
                  <div className="text-right">
                    <small className="text-[11px] uppercase tracking-wider opacity-70">
                      Puntos
                    </small>
                    <div className="font-display text-xl font-semibold mt-1">8,240</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="py-24 bg-ivory-50">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">Experiencias Aurelia</span>
            <h2 className="heading-lg mt-4 mb-3">
              Momentos <span className="italic-script">inolvidables</span>
            </h2>
            <p className="text-charcoal-500 text-[17px]">
              Tours privados, cenas con chefs estrella Michelin, acceso a museos fuera de horario.
              Experiencias que solo Aurelia puede organizar.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.slice(0, 4).map((exp) => (
              <Link
                key={exp.id}
                href="/actividades"
                className="relative rounded-3xl overflow-hidden aspect-[3/4] group cursor-pointer bg-ivory-200"
              >
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="font-display text-xl text-white mb-1 leading-tight">
                    {exp.title}
                  </h4>
                  <span className="text-xs opacity-80">
                    {exp.location.split(',')[0]} · {exp.duration}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-ivory-100">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">Voces de nuestras viajeras</span>
            <h2 className="heading-lg mt-4">
              Historias que <span className="italic-script">inspiran</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="card-soft p-10 relative hover:-translate-y-1.5 hover:shadow-soft-lg"
              >
                <div className="absolute top-4 left-6 font-display text-[80px] leading-[0.8] text-rose-300">
                  &ldquo;
                </div>
                <div className="text-gold-600 mb-4 relative z-10">★ ★ ★ ★ ★</div>
                <p className="font-script text-[22px] italic leading-relaxed text-charcoal-700 mb-6 relative z-10">
                  {t.text}
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-ivory-200">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                  <div>
                    <strong className="block text-[15px] text-charcoal-900">{t.name}</strong>
                    <span className="text-xs text-charcoal-500">{t.trip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-24">
        <div className="container-site">
          <div className="flex justify-between items-end gap-8 flex-wrap mb-12">
            <div className="max-w-xl">
              <span className="eyebrow">Diario de Aurelia</span>
              <h2 className="heading-lg mt-4">
                Inspiracion para tu <span className="italic-script">proxima aventura</span>
              </h2>
            </div>
            <Link href="/blog" className="btn btn-outline btn-md">
              Leer el diario
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Link
                key={post.slug}
                href="/blog"
                className={`card-soft overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-soft-lg ${
                  i === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className={`relative overflow-hidden bg-ivory-200 ${i === 0 ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
                <div className="p-7">
                  <div className="flex gap-4 text-xs uppercase tracking-widest text-charcoal-500 mb-3">
                    <span className="text-gold-700 font-semibold">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className={`font-display leading-tight mb-2 ${i === 0 ? 'text-2xl' : 'text-lg'}`}>
                    {post.title}
                  </h3>
                  <p className={`text-sm text-charcoal-500 ${i === 0 ? '' : 'line-clamp-2'}`}>{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-gradient-to-br from-rose-100 to-ivory-100">
        <div className="container-site max-w-2xl text-center">
          <span className="eyebrow">Carta de Aurelia</span>
          <h2 className="heading-lg mt-4 mb-4">
            Inspiracion en tu <span className="italic-script">bandeja de entrada</span>
          </h2>
          <p className="text-charcoal-500 mb-8">
            Suscribete a nuestra carta mensual y recibe ofertas exclusivas, guias de viaje curadas y
            avances de nuevos destinos.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="tu@correo.com"
              required
              className="flex-1 px-6 py-4 rounded-full border border-ivory-300 bg-white text-[15px] outline-none focus:border-plum-700 focus:ring-4 focus:ring-plum-700/10"
            />
            <button type="submit" className="btn btn-primary btn-md">
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
