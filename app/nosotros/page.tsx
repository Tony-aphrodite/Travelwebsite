import Link from 'next/link';
import { Heart, Compass, Shield, Sparkles, Award, Users, Globe } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { getTestimonials } from '@/lib/db/queries';

const VALUES = [
  {
    icon: Heart,
    title: 'Hecho por y para viajeras',
    desc: 'Entendemos lo que importa cuando una mujer viaja sola, en pareja o con amigas.',
  },
  {
    icon: Compass,
    title: 'Curaduria personal',
    desc: 'Cada destino, hotel y experiencia es visitada y aprobada por nuestras expertas.',
  },
  {
    icon: Shield,
    title: 'Seguridad ante todo',
    desc: 'Proteccion 24/7, asistencia medica y respaldo en cualquier rincon del mundo.',
  },
  {
    icon: Sparkles,
    title: 'Lujo accesible',
    desc: 'Experiencias extraordinarias sin precios inalcanzables. Calidad transparente.',
  },
];

const TEAM = [
  {
    name: 'Isabella Fonseca',
    role: 'Fundadora & CEO',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
  },
  {
    name: 'Valentina Rios',
    role: 'Directora de Experiencias',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
  },
  {
    name: 'Camila Herrera',
    role: 'Curadora de Hoteles',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
  },
  {
    name: 'Lucia Mendez',
    role: 'Concierge Principal',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
  },
];

const STATS = [
  { icon: Globe, value: '120+', label: 'Destinos curados' },
  { icon: Users, value: '15k', label: 'Viajeras felices' },
  { icon: Award, value: '98%', label: 'Satisfaccion' },
  { icon: Sparkles, value: '12', label: 'Anos de experiencia' },
];

export default async function NosotrosPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHeader
        eyebrow="Nuestra historia"
        title="Creadoras de <span class='italic-script'>memorias</span>"
        subtitle="Somos Aurelia Viajes. Una agencia nacida del suenho de hacer que cada viajera descubra el mundo con elegancia, seguridad y libertad."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Nosotras' }]}
      />

      {/* Story */}
      <section className="container-site py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-soft-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80"
              alt="Aurelia team"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="eyebrow">Desde 2014</span>
            <h2 className="heading-lg mt-3 mb-6">
              Una agencia <span className="italic-script">diferente</span>
            </h2>
            <p className="text-charcoal-700 leading-relaxed mb-4">
              Aurelia nacio cuando Isabella, tras un viaje en solitario por Europa, se dio cuenta
              de que no existia una agencia pensada desde la perspectiva de una mujer viajera.
              Queria recomendar hoteles seguros, experiencias autenticas y destinos que inspirasen.
            </p>
            <p className="text-charcoal-700 leading-relaxed mb-4">
              Hoy somos un equipo de{' '}
              <strong className="text-plum-700">20 expertas en viajes</strong> que recorren el
              mundo personalmente para seleccionar solo aquello que recomendariamos a nuestras
              mejores amigas.
            </p>
            <p className="font-script italic text-xl text-plum-700">
              &ldquo;Viajar debe ser un acto de libertad, no una lista de logistica.&rdquo;
            </p>
            <div className="text-sm text-charcoal-500 mt-2">— Isabella Fonseca, Fundadora</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-plum-900 text-white py-16">
        <div className="container-site">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="text-center">
                  <Icon size={28} className="text-gold-400 mx-auto mb-3" />
                  <div className="font-display text-5xl text-gold-400 mb-1">{s.value}</div>
                  <div className="text-sm text-white/70 uppercase tracking-wider">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-site py-20">
        <div className="text-center mb-12">
          <span className="eyebrow">Nuestros valores</span>
          <h2 className="heading-lg mt-3">Lo que nos define</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="card-soft p-7 text-center hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-plum-700 to-rose-400 text-white flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="container-site py-20">
        <div className="text-center mb-12">
          <span className="eyebrow">Nuestro equipo</span>
          <h2 className="heading-lg mt-3">Las mujeres de Aurelia</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m) => (
            <article key={m.name} className="card-soft overflow-hidden group">
              <div className="relative aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.image}
                  alt={m.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-display text-xl">{m.name}</h3>
                <div className="text-xs text-gold-700 uppercase tracking-widest mt-1">
                  {m.role}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-rose-100 py-20">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="eyebrow">Lo que dicen</span>
            <h2 className="heading-lg mt-3">Voces de viajeras</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card-soft p-7">
                <div className="text-gold-600 mb-3 text-xl">★ ★ ★ ★ ★</div>
                <p className="font-script italic text-lg text-charcoal-700 mb-5 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-ivory-200">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-plum-700 to-rose-400 text-white flex items-center justify-center font-display">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-charcoal-500">{t.trip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-site py-20 text-center">
        <h2 className="heading-lg mb-4">
          Lista para tu <span className="italic-script">proxima aventura</span>?
        </h2>
        <p className="text-charcoal-500 max-w-xl mx-auto mb-8">
          Deja que nuestras expertas diseñen un viaje a tu medida. Sin compromiso, sin costo
          inicial, solo inspiracion.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/contacto" className="btn btn-primary btn-lg">
            Hablar con una experta
          </Link>
          <Link href="/destinos" className="btn btn-outline btn-lg">
            Explorar destinos
          </Link>
        </div>
      </section>
    </>
  );
}
