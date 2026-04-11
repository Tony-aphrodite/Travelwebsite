import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Star } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SearchWidget from '@/components/SearchWidget';
import FilterSidebar from '@/components/FilterSidebar';
import { activities } from '@/lib/data';

export default function ActividadesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Experiencias curadas"
        title="Momentos que <span class='italic-script'>transforman</span>"
        subtitle="Tours privados, cenas con chefs Michelin, retiros de bienestar. Experiencias unicas solo para nuestras viajeras."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Experiencias' }]}
      />

      <div className="container-site -mt-10 relative z-10 mb-12">
        <SearchWidget initialTab="actividades" />
      </div>

      <section className="pb-24">
        <div className="container-site grid lg:grid-cols-[300px_1fr] gap-8">
          <FilterSidebar
            priceMin={50}
            priceMax={600}
            groups={[
              {
                title: 'Categoria',
                options: [
                  { label: 'Gastronomia', count: 34 },
                  { label: 'Bienestar', count: 28 },
                  { label: 'Cultura', count: 41 },
                  { label: 'Aventura', count: 22 },
                  { label: 'Shopping', count: 15 },
                  { label: 'Naturaleza', count: 29 },
                ],
              },
              {
                title: 'Duracion',
                options: [
                  { label: '< 2 horas' },
                  { label: '2-4 horas' },
                  { label: 'Medio dia' },
                  { label: 'Dia completo' },
                  { label: 'Varios dias' },
                ],
              },
              {
                title: 'Tipo',
                options: [
                  { label: 'Tour privado' },
                  { label: 'Grupo pequeno' },
                  { label: 'Con transporte' },
                  { label: 'Sin filas' },
                ],
              },
              {
                title: 'Valoracion',
                options: [{ label: '5 estrellas' }, { label: '4+ estrellas' }],
              },
            ]}
          />

          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4 bg-white rounded-2xl px-6 py-4 shadow-soft">
              <span className="text-charcoal-500 text-sm">
                <strong className="text-plum-700 font-display text-lg">{activities.length}</strong>{' '}
                experiencias disponibles
              </span>
              <select className="px-4 py-2 border border-ivory-300 rounded-full bg-ivory-50 text-sm cursor-pointer">
                <option>Mas recomendadas</option>
                <option>Mejor valoradas</option>
                <option>Precio: menor</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {activities.map((act) => (
                <article
                  key={act.id}
                  className="card-soft overflow-hidden hover:-translate-y-1 hover:shadow-soft-lg flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={act.image}
                      alt={act.title}
                      fill
                      className="object-cover transition-transform duration-1000 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-gold-600 to-gold-500 text-charcoal-900 px-3 py-1 rounded-full text-xs font-semibold">
                      {act.category}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-charcoal-500 mb-2">
                      <MapPin size={12} />
                      {act.location}
                    </div>
                    <h3 className="font-display text-lg mb-2 leading-tight">{act.title}</h3>
                    <p className="text-sm text-charcoal-500 line-clamp-2 mb-4">{act.description}</p>
                    <div className="flex items-center justify-between text-xs text-charcoal-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {act.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={12} className="text-gold-600 fill-gold-600" /> {act.rating} (
                        {act.reviewCount})
                      </span>
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t border-ivory-200 mt-auto">
                      <div>
                        <div className="text-[11px] text-charcoal-500">Desde</div>
                        <div className="font-display text-2xl text-plum-700 leading-none">
                          ${act.price}
                          <small className="text-xs text-charcoal-500 font-sans ml-1">/ pers.</small>
                        </div>
                      </div>
                      <Link href="/carrito" className="btn btn-primary btn-sm">
                        Reservar
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
