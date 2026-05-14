'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function ResetForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Token invalido o expirado');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        setDone(true);
        setTimeout(() => router.push('/auth/login'), 2500);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'No se pudo restablecer la contraseña');
      }
    } catch {
      setError('Error de red. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
          El enlace no es valido. Solicita uno nuevo desde &quot;Recuperar contraseña&quot;.
        </div>
        <Link href="/auth/forgot" className="btn btn-primary btn-md">
          Solicitar nuevo enlace
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-sage-500/15 text-sage-500 text-sm px-4 py-3 rounded-xl">
          Tu contraseña fue actualizada. Redirigiendo al inicio de sesion...
        </div>
        <Link href="/auth/login" className="btn btn-outline btn-md">
          Ir al login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>}
      <div>
        <label className="field-label">Nueva contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field-input"
          placeholder="••••••••"
          required
          minLength={6}
          autoFocus
        />
      </div>
      <div>
        <label className="field-label">Confirmar contraseña</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="field-input"
          placeholder="••••••••"
          required
          minLength={6}
        />
      </div>
      <button type="submit" disabled={submitting} className="btn btn-primary btn-lg w-full">
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Guardando...
          </span>
        ) : (
          'Guardar nueva contraseña'
        )}
      </button>
    </form>
  );
}

export default function ResetPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-plum-800 to-plum-700 px-6 pt-24 pb-16">
      <div className="card-soft p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-charcoal-900 mb-2">Nueva contraseña</h1>
          <p className="text-charcoal-500 text-sm">
            Elige una contraseña segura. Usaras esta nueva contraseña en tu proximo inicio de sesion.
          </p>
        </div>
        <Suspense fallback={<Loader2 size={20} className="animate-spin mx-auto" />}>
          <ResetForm />
        </Suspense>
      </div>
    </section>
  );
}
