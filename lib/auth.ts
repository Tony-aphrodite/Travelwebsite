import NextAuth, { CredentialsSignin } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Diagnostic error codes — each step throws its own subclass so the
// resulting ?code= query parameter on the redirect tells us exactly
// where authorize() bailed. (Can't read Vercel function logs.)
class NoCredsError extends CredentialsSignin { code = 'no_creds'; }
class NoUserError extends CredentialsSignin { code = 'no_user'; }
class NoHashError extends CredentialsSignin { code = 'no_hash'; }
class BadPasswordError extends CredentialsSignin { code = 'bad_password'; }
class DbExceptionError extends CredentialsSignin {
  code = 'db_exception';
  constructor(msg: string) { super(); this.code = `db_exc_${msg.slice(0, 40)}`; }
}

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
        if (!credentials?.email || !credentials?.password) {
          throw new NoCredsError();
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        try {
          // Explicit field selection — on Vercel, Drizzle's snake_case→camelCase
          // column mapping was returning the row WITHOUT hashedPassword for some
          // reason (the issue surfaced as ?code=no_hash). Naming each field by
          // the schema reference forces the mapping.
          const rows = await db
            .select({
              id: schema.users.id,
              name: schema.users.name,
              email: schema.users.email,
              image: schema.users.image,
              hashedPassword: schema.users.hashedPassword,
            })
            .from(schema.users)
            .where(eq(schema.users.email, email));
          const user = rows[0];
          if (!user) throw new NoUserError();

          // Belt-and-suspenders: accept the snake_case field too if for some
          // reason camelCase isn't populated by the driver.
          const hash =
            user.hashedPassword ?? (user as Record<string, unknown>).hashed_password;
          if (!hash || typeof hash !== 'string') throw new NoHashError();

          const ok = await bcrypt.compare(password, hash);
          if (!ok) throw new BadPasswordError();

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (err) {
          // Re-throw our own diagnostic errors as-is; wrap anything else
          if (err instanceof CredentialsSignin) throw err;
          throw new DbExceptionError(String((err as Error)?.message || err));
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
