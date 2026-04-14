'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Check } from 'lucide-react';

export default function AddToCartButton({
  type,
  itemId,
  itemName,
  itemImage,
  unitPrice,
  className = '',
}: {
  type: 'hotel' | 'villa' | 'package' | 'flight' | 'car' | 'activity';
  itemId: string;
  itemName: string;
  itemImage: string;
  unitPrice: number;
  className?: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleClick() {
    if (!session) {
      router.push('/auth/login');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, itemId, itemName, itemImage, unitPrice, quantity: 1 }),
      });

      if (res.ok) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    } catch {
      // silently fail
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || added}
      className={`btn ${added ? 'bg-sage-500 text-white' : 'btn-primary'} btn-md ${className}`}
    >
      {added ? (
        <>
          <Check size={16} /> Agregado
        </>
      ) : loading ? (
        'Agregando...'
      ) : (
        <>
          <ShoppingCart size={16} /> Reservar
        </>
      )}
    </button>
  );
}
