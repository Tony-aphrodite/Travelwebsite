'use client';

import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Plane, Building2, Home, Package, Car, Compass, Search } from 'lucide-react';

type TabId = 'vuelos' | 'hoteles' | 'villas' | 'paquetes' | 'autos' | 'actividades';

const TABS: { id: TabId; label: string; Icon: typeof Plane }[] = [
  { id: 'vuelos', label: 'Vuelos', Icon: Plane },
  { id: 'hoteles', label: 'Hoteles', Icon: Building2 },
  { id: 'villas', label: 'Villas', Icon: Home },
  { id: 'paquetes', label: 'Paquetes', Icon: Package },
  { id: 'autos', label: 'Autos', Icon: Car },
  { id: 'actividades', label: 'Experiencias', Icon: Compass },
];

export default function SearchWidget({ initialTab = 'vuelos' }: { initialTab?: TabId }) {
  const [active, setActive] = useState<TabId>(initialTab);
  const router = useRouter();

  const navigate = (path: string, params: Record<string, string>) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v && v.trim()) sp.set(k, v.trim());
    }
    const qs = sp.toString();
    router.push(qs ? `${path}?${qs}` : path);
  };

  return (
    <div className="max-w-[1120px] mx-auto bg-white rounded-3xl shadow-soft-xl p-6 md:p-8">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-ivory-200 mb-6 overflow-x-auto">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`px-5 py-3 border-b-2 -mb-px text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
              active === id
                ? 'text-plum-700 border-plum-700'
                : 'text-charcoal-500 border-transparent hover:text-plum-700'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {/* Forms */}
      {active === 'vuelos' && <FlightForm navigate={navigate} />}
      {active === 'hoteles' && <HotelForm navigate={navigate} />}
      {active === 'villas' && <VillaForm navigate={navigate} />}
      {active === 'paquetes' && <PackageForm navigate={navigate} />}
      {active === 'autos' && <CarForm navigate={navigate} />}
      {active === 'actividades' && <ActivityForm navigate={navigate} />}
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
  return (
    <button type="submit" className="btn btn-primary btn-lg self-end">
      <Search size={18} />
      Buscar
    </button>
  );
}

type NavigateFn = (path: string, params: Record<string, string>) => void;

function FlightForm({ navigate }: { navigate: NavigateFn }) {
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
          <span>Ida y vuelta</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="radio" name="trip" className="accent-plum-700" />
          <span>Solo ida</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="radio" name="trip" className="accent-plum-700" />
          <span>Multidestino</span>
        </label>
      </div>
      <div className="flex flex-wrap gap-4 items-end">
        <Field label="Desde" className="flex-1 min-w-[160px]">
          <input ref={fromRef} className="field-input" defaultValue="Ciudad de Mexico" />
        </Field>
        <Field label="Hacia" className="flex-1 min-w-[160px]">
          <input ref={toRef} className="field-input" defaultValue="Paris, Francia" />
        </Field>
        <Field label="Salida" className="flex-1 min-w-[140px]">
          <input className="field-input" type="date" defaultValue="2026-05-15" />
        </Field>
        <Field label="Regreso" className="flex-1 min-w-[140px]">
          <input className="field-input" type="date" defaultValue="2026-05-25" />
        </Field>
        <Field label="Pasajeros" className="w-[180px]">
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
  const destRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/hoteles', {
      q: destRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <Field label="Destino" className="flex-1 min-w-[200px]">
        <input ref={destRef} className="field-input" placeholder="Santorini, Grecia" />
      </Field>
      <Field label="Entrada" className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-05-15" />
      </Field>
      <Field label="Salida" className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-05-20" />
      </Field>
      <Field label="Habitaciones" className="w-[200px]">
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
  const regionRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/villas', {
      q: regionRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <Field label="Region" className="flex-1 min-w-[200px]">
        <input ref={regionRef} className="field-input" placeholder="Toscana, Italia" />
      </Field>
      <Field label="Llegada" className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-06-10" />
      </Field>
      <Field label="Salida" className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-06-17" />
      </Field>
      <Field label="Huespedes" className="w-[180px]">
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
  const destRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/paquetes', {
      destination: destRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <Field label="Desde" className="flex-1 min-w-[160px]">
        <input className="field-input" defaultValue="Ciudad de Mexico" />
      </Field>
      <Field label="Hacia" className="flex-1 min-w-[160px]">
        <input ref={destRef} className="field-input" placeholder="Maldivas" />
      </Field>
      <Field label="Salida" className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-07-01" />
      </Field>
      <Field label="Regreso" className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-07-10" />
      </Field>
      <Field label="Viajeros" className="w-[160px]">
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
  const locationRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/autos', {
      q: locationRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <Field label="Recoger en" className="flex-1 min-w-[200px]">
        <input ref={locationRef} className="field-input" placeholder="Aeropuerto de Niza" />
      </Field>
      <Field label="Devolver en" className="flex-1 min-w-[200px]">
        <input className="field-input" defaultValue="Mismo lugar" />
      </Field>
      <Field label="Fecha inicio" className="flex-1 min-w-[180px]">
        <input className="field-input" type="datetime-local" defaultValue="2026-05-20T10:00" />
      </Field>
      <Field label="Fecha fin" className="flex-1 min-w-[180px]">
        <input className="field-input" type="datetime-local" defaultValue="2026-05-25T18:00" />
      </Field>
      <Submit />
    </form>
  );
}

function ActivityForm({ navigate }: { navigate: NavigateFn }) {
  const queryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/actividades', {
      q: queryRef.current?.value || '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <Field label="Destino o experiencia" className="flex-1 min-w-[260px]">
        <input ref={queryRef} className="field-input" placeholder="Tour de vinedos en Toscana" />
      </Field>
      <Field label="Fecha" className="flex-1 min-w-[140px]">
        <input className="field-input" type="date" defaultValue="2026-06-12" />
      </Field>
      <Field label="Personas" className="w-[160px]">
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
