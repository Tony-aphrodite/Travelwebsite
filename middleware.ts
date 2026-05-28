import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';

// Middleware runs on Edge. Use the lightweight auth config (no DB queries,
// no bcrypt) — it only needs to read + verify the JWT session cookie.
// The full provider/adapter setup lives in lib/auth.ts and is only loaded
// by the Node-runtime API route handler.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ['/cuenta/:path*', '/carrito/:path*', '/admin/:path*', '/checkout/:path*'],
};
