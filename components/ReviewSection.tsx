'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Star, Loader2 } from 'lucide-react';

type Review = {
  id: number;
  rating: number;
  text: string | null;
  createdAt: string;
  userName: string | null;
  userImage: string | null;
};

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  const active = hover || value;
  return (
    <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(n)}
          aria-label={`${n} estrellas`}
          className="p-1"
        >
          <Star
            size={28}
            className={n <= active ? 'text-gold-600' : 'text-ivory-300'}
            fill={n <= active ? 'currentColor' : 'none'}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewSection({
  type,
  itemId,
}: {
  type: 'hotel' | 'villa' | 'package' | 'flight' | 'car' | 'activity';
  itemId: string;
}) {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/reviews?type=${type}&itemId=${itemId}`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setReviews(data))
      .finally(() => setLoading(false));
  }, [type, itemId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (rating < 1) {
      setError('Selecciona una calificacion');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, itemId, rating, text: text.trim() || undefined }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(typeof data.error === 'string' ? data.error : 'No se pudo publicar tu opinion');
        return;
      }
      // Optimistically prepend (server returns the inserted row)
      const created = await res.json();
      setReviews((prev) => [
        {
          id: created.id,
          rating: created.rating,
          text: created.text ?? null,
          createdAt: created.createdAt,
          userName: session?.user?.name ?? 'Tu',
          userImage: session?.user?.image ?? null,
        },
        ...prev,
      ]);
      setRating(0);
      setText('');
    } catch {
      setError('Error de red');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-8">
      <h2 className="heading-md mb-6">Opiniones de viajeras</h2>

      {/* Review form */}
      <div className="card-soft p-6 mb-6">
        <h3 className="font-display text-lg mb-3">Comparte tu experiencia</h3>
        {status === 'unauthenticated' ? (
          <p className="text-sm text-charcoal-500">
            <Link href="/auth/login" className="text-plum-700 underline">
              Inicia sesion
            </Link>{' '}
            para dejar una opinion.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <StarPicker value={rating} onChange={setRating} />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cuentanos como fue tu estancia (opcional)"
              rows={3}
              maxLength={1000}
              className="field-input resize-y"
            />
            {error && <p className="text-sm text-rose-700">{error}</p>}
            <button type="submit" disabled={submitting} className="btn btn-primary btn-sm">
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Publicando...
                </span>
              ) : (
                'Publicar opinion'
              )}
            </button>
          </form>
        )}
      </div>

      {/* Reviews list */}
      {loading ? (
        <div className="text-center py-8">
          <Loader2 size={20} className="animate-spin text-plum-700 inline" />
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-charcoal-500">
          Aun no hay opiniones publicadas. Se la primera en compartir tu experiencia.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="card-soft p-6">
              <div className="flex items-center gap-1 text-gold-600 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < r.rating ? 'currentColor' : 'none'}
                    className={i < r.rating ? 'text-gold-600' : 'text-ivory-300'}
                  />
                ))}
              </div>
              {r.text && (
                <p className="font-script italic text-[17px] text-charcoal-700 mb-4">
                  &ldquo;{r.text}&rdquo;
                </p>
              )}
              <div className="text-sm">
                <strong className="text-charcoal-900">{r.userName || 'Viajera'}</strong>
                <span className="text-charcoal-500 ml-2">
                  ·{' '}
                  {new Date(r.createdAt).toLocaleDateString('es-MX', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
