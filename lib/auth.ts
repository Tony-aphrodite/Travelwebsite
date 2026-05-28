import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: 'email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        // TEMP DIAGNOSTIC LOGS — remove after credentials issue is resolved.
        console.log('[authorize] called with keys:', Object.keys(credentials || {}));
        console.log('[authorize] email type:', typeof credentials?.email, 'length:', String(credentials?.email || '').length);
        console.log('[authorize] password type:', typeof credentials?.password, 'length:', String(credentials?.password || '').length);

        if (!credentials?.email || !credentials?.password) {
          console.log('[authorize] returning null: missing credentials');
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);
        console.log('[authorize] normalized email:', JSON.stringify(email));

        try {
          const rows = await db.select().from(schema.users).where(eq(schema.users.email, email));
          console.log('[authorize] db rows:', rows.length);
          const user = rows[0];
          if (!user) {
            console.log('[authorize] returning null: no user row');
            return null;
          }
          console.log('[authorize] user:', { id: user.id, role: user.role, hasHash: !!user.hashedPassword, hashLen: user.hashedPassword?.length });
          if (!user.hashedPassword) {
            console.log('[authorize] returning null: no hashed password');
            return null;
          }

          const ok = await bcrypt.compare(password, user.hashedPassword);
          console.log('[authorize] bcrypt.compare =>', ok);
          if (!ok) {
            console.log('[authorize] returning null: bcrypt failed');
            return null;
          }

          console.log('[authorize] success, returning user');
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (err) {
          console.log('[authorize] EXCEPTION:', err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const rows = await db
          .select({ role: schema.users.role })
          .from(schema.users)
          .where(eq(schema.users.id, user.id!));
        token.role = rows[0]?.role ?? 'user';
      }
      return token;
    },
  },
});
