'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export default function ShareButton({ title, text }: { title: string; text?: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareData = { title, text: text || title, url };

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled or share unsupported — fall through to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked — silently no-op
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-ghost btn-sm" aria-label="Compartir">
      {copied ? <Check size={16} /> : <Share2 size={16} />}
      {copied ? 'Enlace copiado' : 'Compartir'}
    </button>
  );
}
