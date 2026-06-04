'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Heart, Loader2, ArrowRight, MapPin } from 'lucide-react';

type Favorite = {
  id: number;
  type: 'hotel' | 'villa' | 'package' | 'flight' | 'car' | 'activity' | 'cruise';
  itemId: string;
  createdAt: string;
};

const TYPE_LABEL: Record<Favorite['type'], string> = {
  hotel: 'Hotel',
  villa: 'Villa',
  package: 'Paquete',
  flight: 'Vuelo',
  car: 'Auto',
  activity: 'Experiencia',
  cruise: 'Crucero',
};

const TYPE_PATH: Record<Favorite['type'], string> = {
  hotel: '/hotel',
  villa: '/villas',
  package: '/paquetes',
  flight: '/vuelos',
  car: '/autos',
  activity: '/actividades',
  cruise: '/cruceros',
};

export default function FavoritosPage() {
  const { status } = useSession();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/favorites')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setFavorites(data);
      })
      .finally(() => setLoading(false));
  }, [status]);

  const remove = async (fav: Favorite) => {
    const prev = favorites;
    setFavorites((f) => f.filter((x) => x.id !== fav.id));
    const res = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: fav.type, itemId: fav.itemId }),
    });
    if (!res.ok) setFavorites(prev);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center bg-ivory-100">
        <Loader2 size={40} className="text-plum-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-ivory-100">
      <div className="container-site">
        <div className="text-xs text-charcoal-500 mb-6 flex gap-2 uppercase tracking-wider">
          <Link href="/" className="text-plum-700">Inicio</Link>
          <span>/</span>
          <span>Favoritos</span>
        </div>

        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="eyebrow">Tu coleccion</span>
            <h1 className="heading-xl mt-3 mb-2">
              Mis <span className="italic-script">favoritos</span>
            </h1>
            <p className="text-charcoal-500 max-w-xl">
              Los lugares, hoteles y experiencias que has guardado para soñar despues. Toca el corazón en
              cualquier ficha para quitar un elemento de la lista.
            </p>
          </div>
          <div className="card-soft px-5 py-3 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
              <Heart size={18} fill="currentColor" />
            </div>
            <div>
              <div className="font-display text-2xl text-plum-700 leading-none">{favorites.length}</div>
              <div className="text-[10px] uppercase tracking-widest text-charcoal-500">guardados</div>
            </div>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="card-soft p-16 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-400 flex items-center justify-center mx-auto mb-5">
              <Heart size={32} />
            </div>
            <h2 className="font-display text-2xl mb-2">Aún no has guardado favoritos</h2>
            <p className="text-charcoal-500 mb-6 max-w-md mx-auto">
              Cuando explores destinos, hoteles o experiencias, toca el corazón para guardarlos aquí
              para más tarde.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/destinos" className="btn btn-primary btn-md">
                Explorar destinos
              </Link>
              <Link href="/hoteles" className="btn btn-outline btn-md">
                Ver hoteles
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorites.map((f) => (
              <article
                key={f.id}
                className="card-soft p-5 group hover:-translate-y-1 hover:shadow-soft-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold">
                    {TYPE_LABEL[f.type] ?? f.type}
                  </span>
                  <button
                    onClick={() => remove(f)}
                    title="Quitar de favoritos"
                    aria-label="Quitar de favoritos"
                    className="w-9 h-9 rounded-full bg-rose-100 text-rose-500 hover:bg-rose-200 hover:text-rose-700 flex items-center justify-center transition-colors"
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
                <h3 className="font-display text-lg text-plum-700 mb-1 capitalize">
                  {f.itemId.replace(/-/g, ' ')}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-4">
                  <MapPin size={11} />
                  Guardado el {new Date(f.createdAt).toLocaleDateString('es-ES')}
                </div>
                <Link
                  href={f.type === 'hotel' ? `${TYPE_PATH[f.type]}/${f.itemId}` : TYPE_PATH[f.type]}
                  className="inline-flex items-center gap-1.5 text-sm text-plum-700 font-semibold group-hover:gap-2.5 transition-all"
                >
                  Ver ficha
                  <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
