'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

export default function FavoriteButton({
  type,
  itemId,
  initialFavorited = false,
}: {
  type: 'hotel' | 'villa' | 'package' | 'flight' | 'car' | 'activity';
  itemId: string;
  initialFavorited?: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      router.push('/auth/login');
      return;
    }

    const res = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, itemId }),
    });

    if (res.ok) {
      const data = await res.json();
      setFavorited(data.action === 'added');
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
        favorited
          ? 'bg-plum-700 text-white'
          : 'bg-white/90 text-plum-700 hover:bg-plum-700 hover:text-white'
      }`}
    >
      <Heart size={18} fill={favorited ? 'currentColor' : 'none'} />
    </button>
  );
}
