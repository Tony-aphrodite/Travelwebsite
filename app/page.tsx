export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Star } from 'lucide-react';
import SearchWidget from '@/components/SearchWidget';
import HeroSection from '@/components/HeroSection';
import DestinationsSection from '@/components/DestinationsSection';
import { getDestinations, getPackages, getActivities, getTestimonials, getBlogPosts } from '@/lib/db/queries';
import NewsletterForm from '@/components/NewsletterForm';

export default async function HomePage() {
  const [destinations, packages, activities, testimonials, blogPosts] = await Promise.all([
    getDestinations(),
    getPackages(),
    getActivities(),
    getTestimonials(),
    getBlogPosts(),
  ]);

  return (
    <>
      {/* HERO */}
      <HeroSection />

      {/* SEARCH WIDGET — pulled up to overlap the hero photo */}
      <div id="search" className="container-site -mt-12 lg:-mt-16 relative z-20 mb-3">
        <SearchWidget />
      </div>

      {/* DESTINATIONS + AURELIA CLUB + TRUST BAR */}
      <DestinationsSection destinations={destinations} />

      {/* OFFERS */}
      <section className="py-10 bg-ivory-50">
        <div className="container-site">
          <div className="flex justify-between items-end gap-8 flex-wrap mb-8">
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
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
      <section className="py-10 bg-ivory-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(196,148,53,0.10),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(216,119,97,0.08),transparent_50%)] pointer-events-none" />
        <div className="container-site grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <span className="eyebrow">Aurelia Society</span>
            <h2 className="heading-lg mt-4 mb-6">
              Unete al <em className="italic text-gold-700 font-normal">club de las viajeras</em>{' '}
              del mundo.
            </h2>
            <p className="text-charcoal-700 text-[17px] mb-8 max-w-lg">
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
                  className="flex-1 min-w-[140px] p-5 bg-ivory-50 border border-ivory-200 rounded-2xl"
                >
                  <strong className="font-display text-lg text-plum-700 block mb-1">
                    {t.tier}
                  </strong>
                  <span className="text-xs text-charcoal-500">{t.desc}</span>
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
      <section className="py-10 bg-ivory-50">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-8">
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
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
      <section className="py-10 bg-ivory-100">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-8">
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover w-12 h-12"
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
      <section className="py-10">
        <div className="container-site">
          <div className="flex justify-between items-end gap-8 flex-wrap mb-8">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`card-soft overflow-hidden group hover:-translate-y-1 hover:shadow-soft-lg ${
                  i === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="relative overflow-hidden bg-ivory-200 aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-4 text-xs uppercase tracking-widest text-charcoal-500 mb-3">
                    <span className="text-gold-700 font-semibold">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-display text-lg leading-tight mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-charcoal-500 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-10 bg-ivory-100">
        <div className="container-site max-w-2xl text-center">
          <span className="eyebrow">Carta de Aurelia</span>
          <h2 className="heading-lg mt-4 mb-4">
            Inspiracion en tu <span className="italic-script">bandeja de entrada</span>
          </h2>
          <p className="text-charcoal-700 mb-8">
            Suscribete a nuestra carta mensual y recibe ofertas exclusivas, guias de viaje curadas y
            avances de nuevos destinos.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
