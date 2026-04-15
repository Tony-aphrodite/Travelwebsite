'use client';

import { useState, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export type FilterGroup = {
  title: string;
  paramKey: string;
  options: { label: string; value?: string; count?: number }[];
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize checked state from current URL
  const initChecked = useCallback(() => {
    const state: Record<string, Set<string>> = {};
    for (const g of groups) {
      const raw = searchParams.get(g.paramKey);
      state[g.paramKey] = raw ? new Set(raw.split(',')) : new Set();
    }
    return state;
  }, [groups, searchParams]);

  const [checked, setChecked] = useState<Record<string, Set<string>>>(initChecked);

  // Initialize price from URL or defaults
  const [min, setMin] = useState(
    searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : priceMin,
  );
  const [max, setMax] = useState(
    searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : priceMax,
  );

  const pct = (v: number) => ((v - priceMin) / (priceMax - priceMin)) * 100;

  const toggleCheck = (paramKey: string, value: string) => {
    setChecked((prev) => {
      const next = { ...prev };
      const set = new Set(prev[paramKey] || []);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      next[paramKey] = set;
      return next;
    });
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Set price params (only if changed from defaults)
    if (min > priceMin) params.set('priceMin', String(min));
    else params.delete('priceMin');

    if (max < priceMax) params.set('priceMax', String(max));
    else params.delete('priceMax');

    // Set checkbox params
    for (const g of groups) {
      const set = checked[g.paramKey];
      if (set && set.size > 0) {
        params.set(g.paramKey, Array.from(set).join(','));
      } else {
        params.delete(g.paramKey);
      }
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const clearFilters = () => {
    setMin(priceMin);
    setMax(priceMax);
    const empty: Record<string, Set<string>> = {};
    for (const g of groups) empty[g.paramKey] = new Set();
    setChecked(empty);
    router.push(pathname);
  };

  const hasActiveFilters =
    min > priceMin ||
    max < priceMax ||
    Object.values(checked).some((s) => s.size > 0);

  return (
    <aside className="card-soft p-7 h-fit lg:sticky lg:top-28">
      <div className="flex justify-between items-center pb-4 mb-6 border-b border-ivory-200">
        <h3 className="font-display text-lg">Filtros</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-plum-700 hover:underline"
          >
            Limpiar todo
          </button>
        )}
      </div>

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
            {group.options.map((opt) => {
              const val = opt.value || opt.label;
              const isChecked = checked[group.paramKey]?.has(val) || false;
              return (
                <label
                  key={opt.label}
                  className="flex items-center gap-2.5 py-1.5 text-sm text-charcoal-700 cursor-pointer hover:text-plum-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCheck(group.paramKey, val)}
                    className="w-4 h-4 rounded border-ivory-300 text-plum-700 focus:ring-plum-700/20 accent-plum-700"
                  />
                  <span>{opt.label}</span>
                  {opt.count !== undefined && (
                    <span className="ml-auto text-xs text-charcoal-300">{opt.count}</span>
                  )}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <button onClick={applyFilters} className="btn btn-primary btn-md w-full mt-2">
        Aplicar filtros
      </button>
    </aside>
  );
}
