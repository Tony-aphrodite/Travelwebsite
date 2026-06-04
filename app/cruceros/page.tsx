export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Ship, Anchor, MapPin, Moon } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SearchWidget from '@/components/SearchWidget';
import FilterSidebar from '@/components/FilterSidebar';
import SortSelect from '@/components/SortSelect';
import Pagination from '@/components/Pagination';
import { getCruises } from '@/lib/db/queries';
import { formatCurrency } from '@/lib/utils';

const PAGE_SIZE = 12;

export default async function CrucerosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || '1') || 1);

  const filters = {
    cruiseLine: params.cruiseLine || undefined,
    departurePort: params.departurePort || undefined,
    priceMin: params.priceMin ? Number(params.priceMin) : undefined,
    priceMax: params.priceMax ? Number(params.priceMax) : undefined,
    nightsMin: params.nightsMin ? Number(params.nightsMin) : undefined,
    nightsMax: params.nightsMax ? Number(params.nightsMax) : undefined,
    sort: params.sort || undefined,
    q: params.q || undefined,
    page,
    pageSize: PAGE_SIZE + 1,
  };

  const rows = await getCruises(filters);
  const hasNext = rows.length > PAGE_SIZE;
  const cruises = rows.slice(0, PAGE_SIZE);

  return (
    <>
      <PageHeader
        eyebrow="Cruceros de lujo"
        title="Navega con <span class='italic-script'>elegancia</span>"
        subtitle="Desde el Mediterráneo hasta el Caribe, vive el mar a bordo de los buques más distinguidos del mundo."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Cruceros' }]}
        bgImage="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1800&q=80&auto=format&fit=crop"
        bgImageAlt="Crucero de lujo navegando al atardecer"
      />

      <div className="container-site -mt-10 relative z-10 mb-12">
        <SearchWidget initialTab="cruceros" />
      </div>

      <section className="pb-24">
        <div className="container-site grid lg:grid-cols-[300px_1fr] gap-8">
          <FilterSidebar
            currentParams={params}
            priceMin={0}
            priceMax={8000}
            groups={[
              {
                title: 'Naviera',
                paramKey: 'cruiseLine',
                options: [
                  { label: 'Norwegian Cruise Line' },
                  { label: 'Royal Caribbean' },
                  { label: 'MSC Cruceros' },
                  { label: 'Costa Cruceros' },
                  { label: 'Princess Cruises' },
                  { label: 'Celebrity Cruises' },
                  { label: 'Disney Cruise Line' },
                  { label: 'Silversea' },
                ],
              },
              {
                title: 'Duración',
                paramKey: 'nightsMax',
                options: [
                  { label: 'Hasta 5 noches', value: '5' },
                  { label: 'Hasta 10 noches', value: '10' },
                  { label: 'Hasta 15 noches', value: '15' },
                  { label: 'Más de 15 noches', value: '60' },
                ],
              },
            ]}
          />

          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4 bg-ivory-50 rounded-2xl px-6 py-4 shadow-soft">
              <span className="text-charcoal-500 text-sm">
                <strong className="text-plum-700 font-display text-lg">{cruises.length}</strong>{' '}
                cruceros disponibles
              </span>
              <SortSelect
                currentParams={params}
                options={[
                  { label: 'Mejor valorados', value: '' },
                  { label: 'Precio: menor', value: 'price_asc' },
                  { label: 'Precio: mayor', value: 'price_desc' },
                ]}
              />
            </div>

            {cruises.length === 0 ? (
              <div className="card-soft p-16 text-center">
                <Ship size={42} className="text-plum-700/40 mx-auto mb-4" />
                <h3 className="font-display text-2xl mb-2">Próximamente</h3>
                <p className="text-charcoal-500 text-sm">
                  Estamos preparando una colección curada de cruceros. Vuelve pronto.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {cruises.map((cruise) => {
                  const stops = (cruise.destinations as string[] | undefined) ?? [];
                  return (
                    <article
                      key={cruise.id}
                      className="card-soft overflow-hidden hover:-translate-y-1 hover:shadow-soft-lg"
                    >
                      <div className="relative aspect-[16/10] bg-ivory-200 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cruise.image}
                          alt={cruise.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4 bg-ivory-50/95 px-3 py-1 rounded-full text-xs font-semibold text-plum-700 inline-flex items-center gap-1.5">
                          <Ship size={12} /> {cruise.cruiseLine}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start gap-3 mb-3">
                          <div>
                            <h3 className="font-display text-xl">{cruise.name}</h3>
                            <div className="text-xs text-charcoal-500">Buque: {cruise.ship}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-display text-2xl text-plum-700 leading-none">
                              {formatCurrency(cruise.price)}
                            </div>
                            <div className="text-[11px] text-charcoal-500">desde / persona</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-charcoal-700 mb-4">
                          <div className="flex items-center gap-1.5">
                            <Anchor size={13} className="text-plum-700" /> Sale de {cruise.departurePort}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Moon size={13} className="text-plum-700" /> {cruise.nights} noches
                          </div>
                        </div>

                        {stops.length > 0 && (
                          <div className="flex items-start gap-1.5 text-xs text-charcoal-500 mb-5">
                            <MapPin size={13} className="text-plum-700 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{stops.join(' · ')}</span>
                          </div>
                        )}

                        <Link href="/carrito" className="btn btn-primary btn-md w-full">
                          Reservar
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <Pagination
              basePath="/cruceros"
              searchParams={params}
              currentPage={page}
              hasNext={hasNext}
            />
          </div>
        </div>
      </section>
    </>
  );
}
