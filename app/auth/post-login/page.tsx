'use client';

export const dynamic = 'force-dynamic';

import { Suspense, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/**
 * Post-login dispatcher.
 *
 * NextAuth's `callbackUrl` is decided before we know the user's role, so
 * Credentials and Google sign-ins both land here. Once the session
 * hydrates we route admins to /admin and everyone else to /cuenta (or
 * the original `returnTo` if one was passed in).
 */
function Dispatcher() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (status === 'loading') return;
    const returnTo = params.get('returnTo');
    if (status === 'authenticated') {
      const role = (session?.user as any)?.role;
      if (role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace(returnTo || '/cuenta');
      }
    } else {
      router.replace('/auth/login');
    }
  }, [status, session, router, params]);

  return null;
}

export default function PostLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-100">
      <Loader2 size={40} className="text-plum-700 animate-spin" />
      <Suspense fallback={null}>
        <Dispatcher />
      </Suspense>
    </div>
  );
}
