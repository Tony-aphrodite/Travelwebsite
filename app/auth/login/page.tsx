'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Email o contraseña incorrectos');
      setLoading(false);
    } else {
      window.location.href = '/cuenta';
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 to-rose-100 px-6 pt-24 pb-16">
      <div className="card-soft p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-charcoal-900 mb-2">Bienvenida de nuevo</h1>
          <p className="text-charcoal-500 text-sm">Inicia sesion en tu cuenta Aurelia</p>
        </div>

        <button
          onClick={() => signIn('google', { callbackUrl: '/cuenta' })}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-ivory-300 rounded-full bg-white text-sm font-semibold text-charcoal-700 hover:bg-ivory-50 transition-colors mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar con Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-ivory-300" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-white text-charcoal-500">o con email</span>
          </div>
        </div>

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
            />
          </div>
          <div>
            <label className="field-label">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-input"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg w-full"
          >
            {loading ? 'Iniciando...' : 'Iniciar sesion'}
          </button>
        </form>

        <p className="text-center text-sm text-charcoal-500 mt-6">
          ¿No tienes cuenta?{' '}
          <Link href="/auth/registro" className="text-plum-700 font-semibold hover:underline">
            Registrate gratis
          </Link>
        </p>
      </div>
    </section>
  );
}
