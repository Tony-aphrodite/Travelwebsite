import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-safe NextAuth config — no DB queries, no bcrypt, no providers
 * with heavy dependencies. This is what middleware imports.
 *
 * The full config (with Credentials provider that uses bcrypt + DB,
 * Google provider, DrizzleAdapter) lives in lib/auth.ts and is only
 * imported by Node-runtime route handlers.
 */
export const authConfig: NextAuthConfig = {
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  // Providers are added in the full auth.ts — must be empty here so
  // middleware doesn't try to import bcrypt or the Drizzle adapter on Edge.
  providers: [],
  callbacks: {
    // Session shape used by both edge (middleware) and node (API) — pulls
    // the id and role from the JWT, which was already populated when the
    // user signed in via the full config.
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
  },
};
