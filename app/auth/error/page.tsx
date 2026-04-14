import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 to-rose-100 px-6 pt-24 pb-16">
      <div className="card-soft p-10 w-full max-w-md text-center">
        <h1 className="font-display text-3xl text-charcoal-900 mb-4">Error de autenticacion</h1>
        <p className="text-charcoal-500 mb-8">
          Hubo un problema al iniciar sesion. Por favor intenta de nuevo.
        </p>
        <Link href="/auth/login" className="btn btn-primary btn-lg">
          Volver al login
        </Link>
      </div>
    </section>
  );
}
