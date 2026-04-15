import Link from 'next/link';
import { MapPin, Heart, Wifi, Waves, Utensils, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SearchWidget from '@/components/SearchWidget';
import FilterSidebar from '@/components/FilterSidebar';
import SortSelect from '@/components/SortSelect';
import { getHotels } from '@/lib/db/queries';

export default async function HotelesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;

  const filters = {
    country: params.country || undefined,
    priceMin: params.priceMin ? Number(params.priceMin) : undefined,
    priceMax: params.priceMax ? Number(params.priceMax) : undefined,
    stars: params.stars ? params.stars.split(',').map(Number) : undefined,
    amenity: params.amenity || undefined,
    sort: params.sort || undefined,
    q: params.q || undefined,
  };

  const hotels = await getHotels(filters);

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
                paramKey: 'stars',
                options: [
                  { label: '5 estrellas', value: '5', count: 48 },
                  { label: '4 estrellas', value: '4', count: 126 },
                  { label: '3 estrellas', value: '3', count: 89 },
                ],
              },
              {
                title: 'Amenidades',
                paramKey: 'amenity',
                options: [
                  { label: 'Piscina', count: 156 },
                  { label: 'Spa', count: 98 },
                  { label: 'Restaurante', count: 201 },
                  { label: 'Gimnasio', count: 178 },
                  { label: 'WiFi gratis', value: 'WiFi', count: 234 },
                  { label: 'Vista al mar', count: 67 },
                ],
              },
              {
                title: 'Pais',
                paramKey: 'country',
                options: [
                  { label: 'Grecia' },
                  { label: 'Italia' },
                  { label: 'Francia' },
                  { label: 'Espana' },
                  { label: 'Japon' },
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
              <SortSelect
                options={[
                  { label: 'Ordenar por recomendado', value: '' },
                  { label: 'Precio: menor a mayor', value: 'price_asc' },
                  { label: 'Precio: mayor a menor', value: 'price_desc' },
                  { label: 'Mejor valorados', value: 'rating_desc' },
                ]}
              />
            </div>

            <div className="space-y-6">
              {hotels.map((hotel) => (
                <article
                  key={hotel.id}
                  className="card-soft overflow-hidden grid md:grid-cols-[320px_1fr_auto] hover:-translate-y-0.5 hover:shadow-soft-lg"
                >
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px] overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                      loading="lazy"
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
                      {(hotel.amenities ?? []).slice(0, 4).map((a) => (
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
