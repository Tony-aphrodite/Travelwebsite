import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from '@/lib/auth.config';

// Middleware runs on Edge. Use the lightweight auth config (no DB queries,
// no bcrypt) — it only needs to read + verify the JWT session cookie.
// The full provider/adapter setup lives in lib/auth.ts and is only loaded
// by the Node-runtime API route handler.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const session = req.auth;
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!session?.user;
  const role = (session?.user as { role?: string } | undefined)?.role;
  const isAdmin = role === 'admin';

  // Admin area: must be both logged in AND have admin role. Non-admins
  // never reach the route — they're bounced to the home page before the
  // page component renders, so there's no chance of accidentally
  // surfacing admin UI to a non-admin (even momentarily).
  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      const url = new URL('/auth/login', req.nextUrl);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    return NextResponse.next();
  }

  // Other protected areas (cuenta, carrito, checkout, favoritos): just
  // require login. Role doesn't matter — these are per-user pages.
  if (!isLoggedIn) {
    const url = new URL('/auth/login', req.nextUrl);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/cuenta/:path*',
    '/carrito/:path*',
    '/admin/:path*',
    '/checkout/:path*',
    '/favoritos/:path*',
  ],
};
