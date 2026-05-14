'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function ForgotPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'No se pudo enviar el enlace');
      }
    } catch {
      setError('Error de red. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-plum-800 to-plum-700 px-6 pt-24 pb-16">
      <div className="card-soft p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-charcoal-900 mb-2">Recuperar contraseña</h1>
          <p className="text-charcoal-500 text-sm">
            Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="bg-sage-500/15 text-sage-500 text-sm px-4 py-3 rounded-xl">
              Si tu email esta registrado, recibiras un enlace en los proximos minutos.
              Revisa tambien tu carpeta de spam.
            </div>
            <Link href="/auth/login" className="btn btn-outline btn-md">
              Volver a iniciar sesion
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}
            <div>
              <label className="field-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-input"
                placeholder="tu@correo.com"
                required
                autoFocus
              />
            </div>
            <button type="submit" disabled={submitting} className="btn btn-primary btn-lg w-full">
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" /> Enviando...
                </span>
              ) : (
                'Enviar enlace'
              )}
            </button>
            <p className="text-center text-sm text-charcoal-500 mt-2">
              <Link href="/auth/login" className="text-plum-700 hover:underline">
                Volver a iniciar sesion
              </Link>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
