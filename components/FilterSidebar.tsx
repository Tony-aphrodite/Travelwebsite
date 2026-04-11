'use client';

import { useState } from 'react';

export type FilterGroup = {
  title: string;
  options: { label: string; count?: number }[];
};

export default function FilterSidebar({
  groups,
  priceMin = 0,
  priceMax = 2500,
}: {
  groups: FilterGroup[];
  priceMin?: number;
  priceMax?: number;
}) {
  const [range, setRange] = useState([priceMin, priceMax]);

  return (
    <aside className="card-soft p-7 h-fit lg:sticky lg:top-28">
      <h3 className="font-display text-lg pb-4 mb-6 border-b border-ivory-200">Filtros</h3>

      <div className="mb-7">
        <h4 className="text-[11px] uppercase tracking-widest text-charcoal-500 font-semibold mb-3">
          Precio por noche
        </h4>
        <div className="flex gap-2">
          <input
            type="number"
            value={range[0]}
            onChange={(e) => setRange([+e.target.value, range[1]])}
            className="flex-1 px-3 py-2 border border-ivory-300 rounded-lg text-sm bg-ivory-50"
            placeholder="Min"
          />
          <input
            type="number"
            value={range[1]}
            onChange={(e) => setRange([range[0], +e.target.value])}
            className="flex-1 px-3 py-2 border border-ivory-300 rounded-lg text-sm bg-ivory-50"
            placeholder="Max"
          />
        </div>
      </div>

      {groups.map((group) => (
        <div key={group.title} className="mb-7">
          <h4 className="text-[11px] uppercase tracking-widest text-charcoal-500 font-semibold mb-3">
            {group.title}
          </h4>
          <div className="space-y-1">
            {group.options.map((opt) => (
              <label
                key={opt.label}
                className="flex items-center gap-2.5 py-1.5 text-sm text-charcoal-700 cursor-pointer"
              >
                <input type="checkbox" className="accent-plum-700" />
                <span>{opt.label}</span>
                {opt.count !== undefined && (
                  <span className="ml-auto text-xs text-charcoal-500">{opt.count}</span>
                )}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button className="btn btn-outline btn-md w-full mt-2">Aplicar filtros</button>
    </aside>
  );
}
