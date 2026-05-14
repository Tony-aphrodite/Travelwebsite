'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';

type Props = {
  type: 'hotel' | 'villa' | 'package' | 'flight' | 'car' | 'activity';
  itemId: string;
  initialFavorited?: boolean;
  variant?: 'icon' | 'text';
};

export default function FavoriteButton({ type, itemId, initialFavorited = false, variant = 'icon' }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [pending, setPending] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      router.push('/auth/login');
      return;
    }

    setPending(true);
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, itemId }),
      });
      if (res.ok) {
        const data = await res.json();
        setFavorited(data.action === 'added');
      }
    } finally {
      setPending(false);
    }
  }

  if (variant === 'text') {
    return (
      <button onClick={handleClick} disabled={pending} className="btn btn-ghost btn-sm" aria-pressed={favorited}>
        {pending ? <Loader2 size={16} className="animate-spin" /> : <Heart size={16} fill={favorited ? 'currentColor' : 'none'} />}
        {favorited ? 'Guardado' : 'Guardar'}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      aria-pressed={favorited}
      aria-label={favorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
        favorited
          ? 'bg-plum-700 text-ivory-50'
          : 'bg-ivory-50/90 text-plum-700 hover:bg-plum-700 hover:text-ivory-50'
      }`}
    >
      {pending ? <Loader2 size={16} className="animate-spin" /> : <Heart size={18} fill={favorited ? 'currentColor' : 'none'} />}
    </button>
  );
}
