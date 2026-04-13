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
  const [min, setMin] = useState(priceMin);
  const [max, setMax] = useState(priceMax);

  const pct = (v: number) => ((v - priceMin) / (priceMax - priceMin)) * 100;

  return (
    <aside className="card-soft p-7 h-fit lg:sticky lg:top-28">
      <h3 className="font-display text-lg pb-4 mb-6 border-b border-ivory-200">Filtros</h3>

      <div className="mb-7">
        <h4 className="text-[11px] uppercase tracking-widest text-charcoal-500 font-semibold mb-4">
          Precio por noche
        </h4>

        {/* Price display */}
        <div className="flex justify-between items-baseline mb-4">
          <span className="font-display text-xl text-plum-700">${min}</span>
          <span className="text-charcoal-300 text-xs">—</span>
          <span className="font-display text-xl text-plum-700">${max}</span>
        </div>

        {/* Dual range slider */}
        <div className="relative h-2 mb-2">
          {/* Track background */}
          <div className="absolute inset-0 bg-ivory-200 rounded-full" />
          {/* Active track */}
          <div
            className="absolute h-full bg-gradient-to-r from-plum-700 to-plum-600 rounded-full"
            style={{ left: `${pct(min)}%`, right: `${100 - pct(max)}%` }}
          />
          {/* Min slider */}
          <input
            type="range"
            min={priceMin}
            max={priceMax}
            step={50}
            value={min}
            onChange={(e) => setMin(Math.min(+e.target.value, max - 50))}
            className="price-slider absolute inset-0 w-full"
          />
          {/* Max slider */}
          <input
            type="range"
            min={priceMin}
            max={priceMax}
            step={50}
            value={max}
            onChange={(e) => setMax(Math.max(+e.target.value, min + 50))}
            className="price-slider absolute inset-0 w-full"
          />
        </div>

        <div className="flex justify-between text-[10px] text-charcoal-300 mt-1">
          <span>${priceMin}</span>
          <span>${priceMax}+</span>
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
                className="flex items-center gap-2.5 py-1.5 text-sm text-charcoal-700 cursor-pointer hover:text-plum-700 transition-colors"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-ivory-300 text-plum-700 focus:ring-plum-700/20 accent-plum-700"
                />
                <span>{opt.label}</span>
                {opt.count !== undefined && (
                  <span className="ml-auto text-xs text-charcoal-300">{opt.count}</span>
                )}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button className="btn btn-primary btn-md w-full mt-2">Aplicar filtros</button>
    </aside>
  );
}
