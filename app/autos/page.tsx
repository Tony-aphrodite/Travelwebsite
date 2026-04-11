import Link from 'next/link';
import Image from 'next/image';
import { Users, Fuel, Settings, Snowflake } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SearchWidget from '@/components/SearchWidget';
import FilterSidebar from '@/components/FilterSidebar';
import { cars } from '@/lib/data';

export default function AutosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Renta de autos"
        title="Conduce con <span class='italic-script'>libertad</span>"
        subtitle="Desde compactos para la ciudad hasta deportivos para la costa amalfitana."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Autos' }]}
      />

      <div className="container-site -mt-10 relative z-10 mb-12">
        <SearchWidget initialTab="autos" />
      </div>

      <section className="pb-24">
        <div className="container-site grid lg:grid-cols-[300px_1fr] gap-8">
          <FilterSidebar
            priceMin={30}
            priceMax={500}
            groups={[
              {
                title: 'Categoria',
                options: [
                  { label: 'Compacto', count: 12 },
                  { label: 'Sedan', count: 18 },
                  { label: 'SUV', count: 24 },
                  { label: 'Premium', count: 15 },
                  { label: 'Deportivo', count: 8 },
                  { label: 'Descapotable', count: 6 },
                ],
              },
              {
                title: 'Transmision',
                options: [{ label: 'Automatico' }, { label: 'Manual' }],
              },
              {
                title: 'Combustible',
                options: [
                  { label: 'Gasolina' },
                  { label: 'Diesel' },
                  { label: 'Hibrido' },
                  { label: 'Electrico' },
                ],
              },
              {
                title: 'Compania',
                options: [
                  { label: 'Hertz' },
                  { label: 'Sixt' },
                  { label: 'Europcar' },
                  { label: 'Avis' },
                  { label: 'Enterprise' },
                ],
              },
            ]}
          />

          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4 bg-white rounded-2xl px-6 py-4 shadow-soft">
              <span className="text-charcoal-500 text-sm">
                <strong className="text-plum-700 font-display text-lg">{cars.length}</strong>{' '}
                vehiculos disponibles
              </span>
              <select className="px-4 py-2 border border-ivory-300 rounded-full bg-ivory-50 text-sm cursor-pointer">
                <option>Mas populares</option>
                <option>Precio: menor</option>
                <option>Precio: mayor</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {cars.map((car) => (
                <article
                  key={car.id}
                  className="card-soft overflow-hidden hover:-translate-y-1 hover:shadow-soft-lg"
                >
                  <div className="relative aspect-[16/10] bg-ivory-200 overflow-hidden">
                    <Image
                      src={car.image}
                      alt={car.model}
                      fill
                      className="object-cover transition-transform duration-1000 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-xs font-semibold text-plum-700">
                      {car.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-display text-xl">{car.model}</h3>
                        <div className="text-xs text-charcoal-500">o similar · {car.company}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-2xl text-plum-700 leading-none">
                          ${car.price}
                        </div>
                        <div className="text-[11px] text-charcoal-500">/ dia</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-charcoal-700 mb-5">
                      <div className="flex items-center gap-1.5">
                        <Users size={13} className="text-plum-700" /> {car.seats} asientos
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Settings size={13} className="text-plum-700" /> {car.transmission}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Fuel size={13} className="text-plum-700" /> {car.fuel}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Snowflake size={13} className="text-plum-700" /> AC incluido
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {car.features.map((f) => (
                        <span key={f} className="amenity-chip">
                          {f}
                        </span>
                      ))}
                    </div>

                    <Link href="/carrito" className="btn btn-primary btn-md w-full">
                      Reservar
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
