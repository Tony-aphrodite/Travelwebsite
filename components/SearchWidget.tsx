'use client';

import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Building2, Home, Package, Car, Compass, Search, Ship, Sliders } from 'lucide-react';
import { useT } from '@/lib/i18n/LocaleProvider';
import type { Dictionary } from '@/lib/i18n/dictionaries';

type TabId = 'vuelos' | 'hoteles' | 'villas' | 'paquetes' | 'autos' | 'actividades' | 'cruceros';

const TABS: { id: TabId; labelKey: keyof Dictionary['search']; Icon: typeof Plane }[] = [
  { id: 'vuelos', labelKey: 'vuelos', Icon: Plane },
  { id: 'hoteles', labelKey: 'hoteles', Icon: Building2 },
  { id: 'villas', labelKey: 'villas', Icon: Home },
  { id: 'paquetes', labelKey: 'paquetes', Icon: Package },
  { id: 'autos', labelKey: 'autos', Icon: Car },
  { id: 'actividades', labelKey: 'experiencias', Icon: Compass },
  { id: 'cruceros', labelKey: 'cruceros', Icon: Ship },
];

export default function SearchWidget({ initialTab = 'vuelos' }: { initialTab?: TabId }) {
  const [active, setActive] = useState<TabId>(initialTab);
  const router = useRouter();
  const t = useT();

  const navigate = (path: string, params: Record<string, string>) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v && v.trim()) sp.set(k, v.trim());
    }
    const qs = sp.toString();
    router.push(qs ? `${path}?${qs}` : path);
  };

  return (
    <div className="max-w-[1120px] mx-auto relative pt-[56px]">
      {/* HORIZONTAL EXTENSION (right side, behind tab strip) — sits to the
          right of the tab strip and bridges it to the widget's right edge
          via a flat horizontal section. Cream color so it merges with the
          tab strip above and the body below into one continuous L-shape. */}
      <div
        className="absolute top-0 right-0 z-0 bg-ivory-50"
        style={{
          width: '300px',
          height: '56px',
          borderTopRightRadius: '24px',
        }}
      />

      {/* TAB STRIP — top-left rounded box. The bottom-right radius is
          deliberately small (18px) so the descent right after Cruceros
          reads as a SHARP ~80° turn — not a gradual sweep — and the
          curve transitions immediately into the flat horizontal section
          on its right. */}
      <div
        className="absolute top-0 left-0 z-10 bg-ivory-50 px-5 md:px-6 pt-3 pb-1 flex"
        style={{
          right: '240px',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          borderBottomRightRadius: '18px',
        }}
      >
        <div className="flex gap-1 overflow-x-auto scrollbar-hide w-full">
          {TABS.map(({ id, labelKey, Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`px-4 md:px-5 py-3 border-b-2 -mb-px text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
                active === id
                  ? 'text-plum-700 border-plum-700'
                  : 'text-charcoal-500 border-transparent hover:text-plum-700'
              }`}
            >
              <Icon size={18} />
              {t.search[labelKey]}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN BODY — full-width box. TL and TR are SHARP (0 radius) so
          they line up cleanly with the tab strip's BL and the horizontal
          extension's BL — otherwise the body's rounded TL/TR would create
          a small V-notch where the boxes meet. BL and BR stay rounded
          (24px) — they're the widget's actual bottom-left and bottom-right
          outer corners. */}
      <div
        className="bg-ivory-50 shadow-soft-xl p-5 md:p-6 relative z-[1]"
        style={{
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
        }}
      >
        {/* Forms */}
        {active === 'vuelos' && <FlightForm navigate={navigate} />}
        {active === 'hoteles' && <HotelForm navigate={navigate} />}
        {active === 'villas' && <VillaForm navigate={navigate} />}
        {active === 'paquetes' && <PackageForm navigate={navigate} />}
        {active === 'autos' && <CarForm navigate={navigate} />}
        {active === 'actividades' && <ActivityForm navigate={navigate} />}
        {active === 'cruceros' && <CruiseForm navigate={navigate} />}

        {/* Advanced search link */}
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-plum-700 transition-colors"
          >
            <Sliders size={12} />
            {t.search.busquedaAvanzada}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}

function Submit() {
  const t = useT();
  return (
    <button type="submit" className="btn btn-primary btn-lg self-end">
      <Search size={18} />
      {t.search.buscar}
    </button>
  );
}

type NavigateFn = (path: string, params: Record<string, string>) => void;

function FlightForm({ navigate }: { navigate: NavigateFn }) {
  const t = useT();
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/vuelos', {
      fromCity: fromRef.current?.value || '',
      toCity: toRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-6 mb-4 text-sm">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="radio" name="trip" defaultChecked className="accent-plum-700" />
          <span>{t.search.idaYVuelta}</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="radio" name="trip" className="accent-plum-700" />
          <span>{t.search.soloIda}</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="radio" name="trip" className="accent-plum-700" />
          <span>{t.search.multidestino}</span>
        </label>
      </div>
      <div className="flex flex-wrap gap-4 items-end">
        <Field label={t.search.desde} className="flex-1 min-w-[160px]">
          <input ref={fromRef} className="field-input" defaultValue="Ciudad de Mexico" />
        </Field>
        <Field label={t.search.hacia} className="flex-1 min-w-[160px]">
          <input ref={toRef} className="field-input" defaultValue="Paris, Francia" />
        </Field>
        <Field label={t.search.salida} className="flex-1 min-w-[140px]">
          <input className="field-input" type="date" defaultValue="2026-05-15" />
        </Field>
        <Field label={t.search.regreso} className="flex-1 min-w-[140px]">
          <input className="field-input" type="date" defaultValue="2026-05-25" />
        </Field>
        <Field label={t.search.pasajeros} className="w-[180px]">
          <select className="field-input">
            <option>1 Adulto</option>
            <option>2 Adultos</option>
            <option>Familia</option>
          </select>
        </Field>
        <Submit />
      </div>
    </form>
  );
}

function HotelForm({ navigate }: { navigate: NavigateFn }) {
  const t = useT();
  const destRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/hoteles', {
      q: destRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <Field label={t.search.destino} className="flex-1 min-w-[200px]">
        <input ref={destRef} className="field-input" placeholder="Santorini, Grecia" />
      </Field>
      <Field label={t.search.entrada} className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-05-15" />
      </Field>
      <Field label={t.search.salida} className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-05-20" />
      </Field>
      <Field label={t.search.habitaciones} className="w-[200px]">
        <select className="field-input">
          <option>1 Hab. · 2 Adultos</option>
          <option>2 Hab. · 4 Adultos</option>
          <option>Familia</option>
        </select>
      </Field>
      <Submit />
    </form>
  );
}

function VillaForm({ navigate }: { navigate: NavigateFn }) {
  const t = useT();
  const regionRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/villas', {
      q: regionRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <Field label={t.search.region} className="flex-1 min-w-[200px]">
        <input ref={regionRef} className="field-input" placeholder="Toscana, Italia" />
      </Field>
      <Field label={t.search.llegada} className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-06-10" />
      </Field>
      <Field label={t.search.salida} className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-06-17" />
      </Field>
      <Field label={t.search.huespedes} className="w-[180px]">
        <select className="field-input">
          <option>2 Huespedes</option>
          <option>4 Huespedes</option>
          <option>6 Huespedes</option>
          <option>8+ Huespedes</option>
        </select>
      </Field>
      <Submit />
    </form>
  );
}

function PackageForm({ navigate }: { navigate: NavigateFn }) {
  const t = useT();
  const destRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/paquetes', {
      destination: destRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <Field label={t.search.desde} className="flex-1 min-w-[160px]">
        <input className="field-input" defaultValue="Ciudad de Mexico" />
      </Field>
      <Field label={t.search.hacia} className="flex-1 min-w-[160px]">
        <input ref={destRef} className="field-input" placeholder="Maldivas" />
      </Field>
      <Field label={t.search.salida} className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-07-01" />
      </Field>
      <Field label={t.search.regreso} className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-07-10" />
      </Field>
      <Field label={t.search.viajeros} className="w-[160px]">
        <select className="field-input">
          <option>2 Adultos</option>
          <option>Familia</option>
        </select>
      </Field>
      <Submit />
    </form>
  );
}

function CarForm({ navigate }: { navigate: NavigateFn }) {
  const t = useT();
  const locationRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/autos', {
      q: locationRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <Field label={t.search.recogerEn} className="flex-1 min-w-[200px]">
        <input ref={locationRef} className="field-input" placeholder="Aeropuerto de Niza" />
      </Field>
      <Field label={t.search.devolverEn} className="flex-1 min-w-[200px]">
        <input className="field-input" defaultValue="Mismo lugar" />
      </Field>
      <Field label={t.search.fechaInicio} className="flex-1 min-w-[180px]">
        <input className="field-input" type="datetime-local" defaultValue="2026-05-20T10:00" />
      </Field>
      <Field label={t.search.fechaFin} className="flex-1 min-w-[180px]">
        <input className="field-input" type="datetime-local" defaultValue="2026-05-25T18:00" />
      </Field>
      <Submit />
    </form>
  );
}

function CruiseForm({ navigate }: { navigate: NavigateFn }) {
  const t = useT();
  const portRef = useRef<HTMLInputElement>(null);
  const lineRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/cruceros', {
      departurePort: portRef.current?.value || '',
      cruiseLine: lineRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <Field label={t.search.puertoSalida} className="flex-1 min-w-[200px]">
        <input ref={portRef} className="field-input" placeholder="Barcelona" />
      </Field>
      <Field label={t.search.naviera} className="flex-1 min-w-[200px]">
        <select ref={lineRef} className="field-input" defaultValue="">
          <option value="">Cualquiera</option>
          <option>Norwegian Cruise Line</option>
          <option>Royal Caribbean</option>
          <option>MSC Cruceros</option>
          <option>Costa Cruceros</option>
          <option>Princess Cruises</option>
          <option>Celebrity Cruises</option>
          <option>Disney Cruise Line</option>
          <option>Silversea</option>
        </select>
      </Field>
      <Field label={t.search.embarque} className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-06-15" />
      </Field>
      <Field label={t.search.duracion} className="w-[180px]">
        <select className="field-input">
          <option>Cualquiera</option>
          <option>3-5 noches</option>
          <option>6-10 noches</option>
          <option>11-15 noches</option>
          <option>16+ noches</option>
        </select>
      </Field>
      <Field label={t.search.pasajeros} className="w-[160px]">
        <select className="field-input">
          <option>2 Adultos</option>
          <option>Familia</option>
          <option>Grupo</option>
        </select>
      </Field>
      <Submit />
    </form>
  );
}

function ActivityForm({ navigate }: { navigate: NavigateFn }) {
  const t = useT();
  const queryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/actividades', {
      q: queryRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <Field label={t.search.destinoOExperiencia} className="flex-1 min-w-[260px]">
        <input ref={queryRef} className="field-input" placeholder="Tour de vinedos en Toscana" />
      </Field>
      <Field label={t.search.fecha} className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-06-12" />
      </Field>
      <Field label={t.search.personas} className="w-[160px]">
        <select className="field-input">
          <option>1 Persona</option>
          <option>2 Personas</option>
          <option>Grupo</option>
        </select>
      </Field>
      <Submit />
    </form>
  );
}
