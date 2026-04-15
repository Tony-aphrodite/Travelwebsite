import Link from 'next/link';
import { MapPin, Heart, Users, Bed, Bath } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SearchWidget from '@/components/SearchWidget';
import FilterSidebar from '@/components/FilterSidebar';
import SortSelect from '@/components/SortSelect';
import { getVillas } from '@/lib/db/queries';

export default async function VillasPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;

  const filters = {
    country: params.country || undefined,
    priceMin: params.priceMin ? Number(params.priceMin) : undefined,
    priceMax: params.priceMax ? Number(params.priceMax) : undefined,
    guests: params.guests ? Number(params.guests) : undefined,
    sort: params.sort || undefined,
    q: params.q || undefined,
  };

  const villas = await getVillas(filters);

  return (
    <>
      <PageHeader
        eyebrow="Villas privadas"
        title="Tu <span class='italic-script'>refugio</span> en el mundo"
        subtitle="Villas exclusivas en los rincones mas hermosos de Europa, Asia y el Caribe."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Villas' }]}
      />

      <div className="container-site -mt-10 relative z-10 mb-12">
        <SearchWidget initialTab="villas" />
      </div>

      <section className="pb-24">
        <div className="container-site grid lg:grid-cols-[300px_1fr] gap-8">
          <FilterSidebar
            currentParams={params}
            priceMin={100}
            priceMax={2000}
            groups={[
              {
                title: 'Capacidad',
                paramKey: 'guests',
                options: [
                  { label: '2-4 huespedes', value: '4' },
                  { label: '5-6 huespedes', value: '6' },
                  { label: '7-8 huespedes', value: '8' },
                  { label: '9+ huespedes', value: '9' },
                ],
              },
              {
                title: 'Pais',
                paramKey: 'country',
                options: [
                  { label: 'Italia' },
                  { label: 'Grecia' },
                  { label: 'Espana' },
                  { label: 'Indonesia' },
                  { label: 'Tailandia' },
                ],
              },
              {
                title: 'Amenidades',
                paramKey: 'amenity',
                options: [
                  { label: 'Piscina privada', value: 'Piscina' },
                  { label: 'Vista al mar' },
                  { label: 'Cocina completa' },
                  { label: 'Chef privado' },
                  { label: 'WiFi' },
                ],
              },
            ]}
          />

          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4 bg-white rounded-2xl px-6 py-4 shadow-soft">
              <span className="text-charcoal-500 text-sm">
                <strong className="text-plum-700 font-display text-lg">{villas.length}</strong>{' '}
                villas exclusivas
              </span>
              <SortSelect
                currentParams={params}
                options={[
                  { label: 'Mas recomendadas', value: '' },
                  { label: 'Precio: menor a mayor', value: 'price_asc' },
                  { label: 'Precio: mayor a menor', value: 'price_desc' },
                ]}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {villas.map((villa) => (
                <article
                  key={villa.id}
                  className="card-soft overflow-hidden hover:-translate-y-1 hover:shadow-soft-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={villa.image}
                      alt={villa.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                      loading="lazy"
                    />
                    <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-plum-700 flex items-center justify-center hover:bg-plum-700 hover:text-white transition-colors">
                      <Heart size={18} />
                    </button>
                    <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold">
                      <span className="text-gold-600">★</span>
                      {villa.rating} · {villa.reviewCount}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-charcoal-500 mb-2">
                      <MapPin size={12} />
                      {villa.location}, {villa.country}
                    </div>
                    <h3 className="font-display text-xl mb-2">{villa.name}</h3>
                    <p className="text-sm text-charcoal-500 line-clamp-2 mb-4">
                      {villa.description}
                    </p>
                    <div className="flex gap-4 text-xs text-charcoal-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Users size={14} /> {villa.guests}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed size={14} /> {villa.bedrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath size={14} /> {villa.bathrooms}
                      </span>
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t border-ivory-200">
                      <div>
                        <div className="text-xs text-charcoal-500">Desde</div>
                        <div className="font-display text-2xl text-plum-700 leading-none">
                          ${villa.price}
                          <small className="text-xs text-charcoal-500 font-sans ml-1">
                            / noche
                          </small>
                        </div>
                      </div>
                      <Link href={`/hotel/${villa.id}`} className="btn btn-primary btn-sm">
                        Ver detalle
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
