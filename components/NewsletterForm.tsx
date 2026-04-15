'use client';

import { useState } from 'react';

export default function NewsletterForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className={variant === 'dark' ? 'text-gold-400 font-semibold' : 'text-plum-700 font-semibold'}>
        Gracias por suscribirte!
      </p>
    );
  }

  if (variant === 'dark') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="flex-1 px-5 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20"
        />
        <button type="submit" className="btn btn-gold btn-md" disabled={status === 'loading'}>
          {status === 'loading' ? 'Enviando...' : 'Suscribirse'}
        </button>
        {status === 'error' && (
          <p className="text-rose-300 text-sm mt-2">Hubo un error. Intenta de nuevo.</p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@correo.com"
        required
        className="flex-1 px-6 py-4 rounded-full border border-ivory-300 bg-white text-[15px] outline-none focus:border-plum-700 focus:ring-4 focus:ring-plum-700/10"
      />
      <button type="submit" className="btn btn-primary btn-md" disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando...' : 'Suscribirme'}
      </button>
      {status === 'error' && (
        <p className="text-rose-500 text-sm mt-2">Hubo un error. Intenta de nuevo.</p>
      )}
    </form>
  );
}
