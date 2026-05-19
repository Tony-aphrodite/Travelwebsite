import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function buildUrl(basePath: string, params: Record<string, string | undefined>, page: number) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v && k !== 'page') sp.set(k, v);
  }
  if (page > 1) sp.set('page', String(page));
  const qs = sp.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export default function Pagination({
  basePath,
  searchParams,
  currentPage,
  hasNext,
}: {
  basePath: string;
  searchParams: Record<string, string>;
  currentPage: number;
  hasNext: boolean;
}) {
  if (currentPage === 1 && !hasNext) return null;
  return (
    <nav
      aria-label="Paginacion"
      className="flex items-center justify-center gap-3 mt-10"
    >
      {currentPage > 1 ? (
        <Link
          href={buildUrl(basePath, searchParams, currentPage - 1)}
          className="btn btn-outline btn-sm"
          rel="prev"
        >
          <ChevronLeft size={14} /> Anterior
        </Link>
      ) : (
        <span className="btn btn-outline btn-sm opacity-40 pointer-events-none">
          <ChevronLeft size={14} /> Anterior
        </span>
      )}

      <span className="text-sm text-charcoal-500">Pagina {currentPage}</span>

      {hasNext ? (
        <Link
          href={buildUrl(basePath, searchParams, currentPage + 1)}
          className="btn btn-outline btn-sm"
          rel="next"
        >
          Siguiente <ChevronRight size={14} />
        </Link>
      ) : (
        <span className="btn btn-outline btn-sm opacity-40 pointer-events-none">
          Siguiente <ChevronRight size={14} />
        </span>
      )}
    </nav>
  );
}
