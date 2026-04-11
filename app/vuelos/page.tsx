import Link from 'next/link';
import { Plane, Clock, Briefcase } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SearchWidget from '@/components/SearchWidget';
import FilterSidebar from '@/components/FilterSidebar';
import { flights } from '@/lib/data';

export default function VuelosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Busqueda de vuelos"
        title="Volar con <span class='italic-script'>estilo</span>"
        subtitle="Compara vuelos de las mejores aerolineas del mundo con tarifas exclusivas Aurelia."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Vuelos' }]}
      />

      <div className="container-site -mt-10 relative z-10 mb-12">
        <SearchWidget initialTab="vuelos" />
      </div>

      <section className="pb-24">
        <div className="container-site grid lg:grid-cols-[300px_1fr] gap-8">
          <FilterSidebar
            priceMin={0}
            priceMax={3000}
            groups={[
              {
                title: 'Escalas',
                options: [
                  { label: 'Directo', count: 12 },
                  { label: '1 escala', count: 48 },
                  { label: '2+ escalas', count: 23 },
                ],
              },
              {
                title: 'Horario salida',
                options: [
                  { label: 'Madrugada (0-6h)', count: 8 },
                  { label: 'Manana (6-12h)', count: 24 },
                  { label: 'Tarde (12-18h)', count: 31 },
                  { label: 'Noche (18-24h)', count: 20 },
                ],
              },
              {
                title: 'Aerolinea',
                options: [
                  { label: 'Air France', count: 14 },
                  { label: 'Emirates', count: 9 },
                  { label: 'Lufthansa', count: 17 },
                  { label: 'KLM', count: 11 },
                  { label: 'Aeromexico', count: 23 },
                ],
              },
              {
                title: 'Clase',
                options: [
                  { label: 'Economy' },
                  { label: 'Economy Premium' },
                  { label: 'Business' },
                  { label: 'Primera' },
                ],
              },
              {
                title: 'Equipaje',
                options: [
                  { label: 'Incluye equipaje de mano' },
                  { label: 'Incluye equipaje facturado' },
                ],
              },
            ]}
          />

          <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4 bg-white rounded-2xl px-6 py-4 shadow-soft">
              <span className="text-charcoal-500 text-sm">
                <strong className="text-plum-700 font-display text-lg">{flights.length}</strong>{' '}
                vuelos disponibles · CDMX → Paris
              </span>
              <select className="px-4 py-2 border border-ivory-300 rounded-full bg-ivory-50 text-sm cursor-pointer">
                <option>Mejor opcion</option>
                <option>Menor precio</option>
                <option>Menor duracion</option>
                <option>Salida mas temprana</option>
              </select>
            </div>

            <div className="space-y-5">
              {flights.map((flight) => (
                <article
                  key={flight.id}
                  className="card-soft p-7 grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center hover:-translate-y-0.5 hover:shadow-soft-lg"
                >
                  <div className="flex items-center gap-3 min-w-[160px]">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-300 to-gold-300 flex items-center justify-center font-display font-bold text-plum-700 text-lg">
                      {flight.airlineCode}
                    </div>
                    <div>
                      <strong className="block text-sm text-charcoal-900 font-semibold">
                        {flight.airline}
                      </strong>
                      <span className="text-xs text-charcoal-500">{flight.cabin}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                    <div>
                      <strong className="font-display text-3xl text-charcoal-900 block leading-none">
                        {flight.departure}
                      </strong>
                      <span className="text-xs text-charcoal-500 uppercase tracking-wider mt-1 block">
                        {flight.from} · {flight.fromCity}
                      </span>
                    </div>
                    <div className="text-center relative min-w-[140px]">
                      <div className="absolute left-0 right-0 top-1/2 h-px bg-ivory-300" />
                      <div className="relative inline-block bg-white px-3">
                        <Plane size={16} className="text-plum-700 inline" />
                      </div>
                      <div className="flex gap-3 justify-center mt-2 text-[11px] text-charcoal-500">
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {flight.duration}
                        </span>
                        <span>{flight.stopInfo}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <strong className="font-display text-3xl text-charcoal-900 block leading-none">
                        {flight.arrival}
                      </strong>
                      <span className="text-xs text-charcoal-500 uppercase tracking-wider mt-1 block">
                        {flight.to} · {flight.toCity}
                      </span>
                    </div>
                  </div>

                  <div className="text-right min-w-[160px]">
                    <div className="text-xs text-charcoal-500">Por persona</div>
                    <div className="font-display text-3xl text-plum-700 leading-none my-1">
                      ${flight.price}
                      <small className="text-xs text-charcoal-500 font-sans ml-1">USD</small>
                    </div>
                    <div className="flex items-center gap-1 justify-end text-[11px] text-charcoal-500 mb-3">
                      <Briefcase size={10} /> Equipaje incluido
                    </div>
                    <Link href="/carrito" className="btn btn-primary btn-md w-full">
                      Seleccionar
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
