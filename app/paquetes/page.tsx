import Link from 'next/link';
import { Check, Clock } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SearchWidget from '@/components/SearchWidget';
import FilterSidebar from '@/components/FilterSidebar';
import SortSelect from '@/components/SortSelect';
import { getPackages } from '@/lib/db/queries';

export default async function PaquetesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;

  const filters = {
    destination: params.destination || undefined,
    priceMin: params.priceMin ? Number(params.priceMin) : undefined,
    priceMax: params.priceMax ? Number(params.priceMax) : undefined,
    sort: params.sort || undefined,
  };

  const packages = await getPackages(filters);

  return (
    <>
      <PageHeader
        eyebrow="Paquetes curados"
        title="Viajes <span class='italic-script'>listos para soñar</span>"
        subtitle="Vuelo, hotel, experiencias y traslados. Todo pensado en un solo precio irresistible."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Paquetes' }]}
      />

      <div className="container-site -mt-10 relative z-10 mb-12">
        <SearchWidget initialTab="paquetes" />
      </div>

      <section className="pb-24">
        <div className="container-site grid lg:grid-cols-[300px_1fr] gap-8">
          <FilterSidebar
            currentParams={params}
            priceMin={1000}
            priceMax={6000}
            groups={[
              {
                title: 'Destino',
                paramKey: 'destination',
                options: [
                  { label: 'Maldivas' },
                  { label: 'Bali' },
                  { label: 'Santorini' },
                  { label: 'Toscana' },
                  { label: 'Paris' },
                  { label: 'Japon' },
                ],
              },
              {
                title: 'Duracion',
                paramKey: 'duration',
                options: [
                  { label: '3-5 noches' },
                  { label: '6-8 noches' },
                  { label: '9-12 noches' },
                  { label: '13+ noches' },
                ],
              },
            ]}
          />

          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4 bg-white rounded-2xl px-6 py-4 shadow-soft">
              <span className="text-charcoal-500 text-sm">
                <strong className="text-plum-700 font-display text-lg">{packages.length}</strong>{' '}
                paquetes curados
              </span>
              <SortSelect
                currentParams={params}
                options={[
                  { label: 'Mas vendidos', value: '' },
                  { label: 'Precio: menor a mayor', value: 'price_asc' },
                  { label: 'Precio: mayor a menor', value: 'price_desc' },
                ]}
              />
            </div>

            <div className="space-y-6">
              {packages.map((pkg) => (
                <article
                  key={pkg.id}
                  className="card-soft overflow-hidden grid md:grid-cols-[380px_1fr] hover:-translate-y-0.5 hover:shadow-soft-lg"
                >
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[300px] overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 bg-plum-700 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider">
                      {pkg.badge}
                    </span>
                  </div>

                  <div className="p-8 flex flex-col">
                    <div className="text-xs uppercase tracking-widest text-gold-700 mb-2 font-semibold">
                      {pkg.destination}
                    </div>
                    <h3 className="font-display text-2xl mb-1">{pkg.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-charcoal-500 mb-3">
                      <Clock size={12} /> {pkg.duration}
                    </div>
                    <p className="text-sm text-charcoal-500 mb-5 leading-relaxed">
                      {pkg.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-5">
                      {(pkg.includes ?? []).map((inc) => (
                        <div
                          key={inc}
                          className="flex items-center gap-2 text-xs text-charcoal-700"
                        >
                          <Check size={14} className="text-plum-700 flex-shrink-0" />
                          {inc}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t border-ivory-200 mt-auto">
                      <div>
                        <div className="line-through text-charcoal-500 text-sm">
                          ${pkg.oldPrice.toLocaleString()} USD
                        </div>
                        <div className="font-display text-3xl text-plum-700 leading-none">
                          ${pkg.price.toLocaleString()}
                          <small className="text-xs text-charcoal-500 font-sans ml-1">
                            / persona
                          </small>
                        </div>
                      </div>
                      <Link href="/carrito" className="btn btn-primary btn-md">
                        Reservar ahora
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
