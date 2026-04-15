'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = [
  'Todas',
  'Guia',
  'Bienestar',
  'Consejos',
  'Experiencia',
  'Solo Travel',
  'Gastronomia',
];

export default function BlogFilters({
  activeCategory,
  activeQuery,
}: {
  activeCategory?: string;
  activeQuery?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(activeQuery || '');

  function navigate(category?: string, q?: string) {
    const params = new URLSearchParams();
    if (category && category !== 'Todas') params.set('category', category);
    if (q) params.set('q', q);
    const qs = params.toString();
    router.push(qs ? `/blog?${qs}` : '/blog');
  }

  function handleCategoryClick(c: string) {
    navigate(c, query || undefined);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate(activeCategory, query || undefined);
  }

  return (
    <div className="card-soft p-5 flex flex-wrap gap-4 items-center">
      <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[240px] relative">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-500"
        />
        <input
          type="text"
          placeholder="Buscar articulos..."
          className="field-input pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((c) => {
          const isActive = c === 'Todas' ? !activeCategory : activeCategory === c;
          return (
            <button
              key={c}
              onClick={() => handleCategoryClick(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                isActive
                  ? 'bg-plum-700 text-white'
                  : 'bg-ivory-100 text-charcoal-700 hover:bg-plum-100'
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}
