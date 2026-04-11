import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Heart, Wifi, Waves, Utensils, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SearchWidget from '@/components/SearchWidget';
import FilterSidebar from '@/components/FilterSidebar';
import { hotels } from '@/lib/data';

export default function HotelesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hoteles boutique"
        title="Hospedajes <span class='italic-script'>selectos</span>"
        subtitle="Una coleccion de los mejores hoteles del mundo, curada por nuestras especialistas."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Hoteles' }]}
      />

      <div className="container-site -mt-10 relative z-10 mb-12">
        <SearchWidget initialTab="hoteles" />
      </div>

      <section className="pb-24">
        <div className="container-site grid lg:grid-cols-[300px_1fr] gap-8">
          <FilterSidebar
            groups={[
              {
                title: 'Estrellas',
                options: [
                  { label: '5 estrellas', count: 48 },
                  { label: '4 estrellas', count: 126 },
                  { label: '3 estrellas', count: 89 },
                ],
              },
              {
                title: 'Valoracion',
                options: [
                  { label: 'Excepcional (9+)', count: 32 },
                  { label: 'Muy bueno (8+)', count: 87 },
                  { label: 'Bueno (7+)', count: 142 },
                ],
              },
              {
                title: 'Amenidades',
                options: [
                  { label: 'Piscina', count: 156 },
                  { label: 'Spa', count: 98 },
                  { label: 'Restaurante', count: 201 },
                  { label: 'Gimnasio', count: 178 },
                  { label: 'WiFi gratis', count: 234 },
                  { label: 'Vista al mar', count: 67 },
                ],
              },
              {
                title: 'Tipo',
                options: [
                  { label: 'Boutique', count: 45 },
                  { label: 'Resort', count: 78 },
                  { label: 'Villa', count: 34 },
                  { label: 'Palacio', count: 12 },
                ],
              },
            ]}
          />

          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4 bg-white rounded-2xl px-6 py-4 shadow-soft">
              <span className="text-charcoal-500 text-sm">
                <strong className="text-plum-700 font-display text-lg">{hotels.length}</strong>{' '}
                hoteles encontrados
              </span>
              <select className="px-4 py-2 border border-ivory-300 rounded-full bg-ivory-50 text-sm cursor-pointer">
                <option>Ordenar por recomendado</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Mejor valorados</option>
                <option>Mas populares</option>
              </select>
            </div>

            <div className="space-y-6">
              {hotels.map((hotel) => (
                <article
                  key={hotel.id}
                  className="card-soft overflow-hidden grid md:grid-cols-[320px_1fr_auto] hover:-translate-y-0.5 hover:shadow-soft-lg"
                >
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px] overflow-hidden">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover transition-transform duration-1000 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                    <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-plum-700 hover:bg-plum-700 hover:text-white flex items-center justify-center transition-colors">
                      <Heart size={18} />
                    </button>
                  </div>

                  <div className="p-7">
                    <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-charcoal-500 mb-2">
                      <MapPin size={12} />
                      {hotel.location}, {hotel.country}
                    </div>
                    <h3 className="font-display text-2xl mb-1">{hotel.name}</h3>
                    <div className="text-gold-600 text-sm">
                      {'★'.repeat(hotel.stars)}{' '}
                      <span className="text-charcoal-500 ml-1">Hotel {hotel.stars} estrellas</span>
                    </div>
                    <div className="flex items-center gap-3 my-4">
                      <span className="bg-plum-700 text-white px-2.5 py-1 rounded-lg font-semibold text-sm">
                        {hotel.rating}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-charcoal-900">{hotel.ratingLabel}</div>
                        <div className="text-xs text-charcoal-500">
                          {hotel.reviewCount} opiniones
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-charcoal-500 mb-4 line-clamp-2">{hotel.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.slice(0, 4).map((a) => (
                        <span key={a} className="amenity-chip">
                          {a.includes('WiFi') ? (
                            <Wifi size={12} />
                          ) : a.includes('Piscina') || a.includes('infinita') ? (
                            <Waves size={12} />
                          ) : a.includes('Restaurante') || a.includes('Michelin') ? (
                            <Utensils size={12} />
                          ) : (
                            <Sparkles size={12} />
                          )}
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-7 md:border-l border-t md:border-t-0 border-ivory-200 flex flex-col justify-between items-stretch md:items-end md:text-right min-w-[220px]">
                    <div>
                      {hotel.oldPrice && (
                        <div className="line-through text-charcoal-500 text-sm">
                          ${hotel.oldPrice}
                        </div>
                      )}
                      <div className="text-xs text-charcoal-500">Por noche desde</div>
                      <div className="font-display text-3xl text-plum-700 leading-none my-2">
                        ${hotel.price}
                        <small className="text-xs text-charcoal-500 font-sans ml-1">USD</small>
                      </div>
                      <div className="text-[11px] text-charcoal-500">Impuestos incluidos</div>
                    </div>
                    <Link
                      href={`/hotel/${hotel.id}`}
                      className="btn btn-primary btn-md mt-4 md:w-auto w-full"
                    >
                      Ver detalle
                    </Link>
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
