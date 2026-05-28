import NextAuth, { CredentialsSignin } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';
import { authConfig } from './auth.config';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Raw SQL client — bypasses Drizzle's column mapping entirely for the
// credentials lookup. Drizzle's snake_case→camelCase translation was
// dropping the hashed_password field somewhere in the Vercel bundle.
const rawSql = neon(process.env.DATABASE_URL!);

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
          // RAW SQL v3 (probe: rawsqlv3) — pin a marker so we can verify
          // this exact code is what's deployed.
          const rows = (await rawSql`
            SELECT id, name, email, image, hashed_password
            FROM users
            WHERE email = ${email}
          `) as Array<Record<string, unknown>>;

          const user = rows[0];
          if (!user) throw new NoUserError();

          // Inspect every possible key spelling
          const possibleKeys = ['hashed_password', 'hashedPassword', 'hashedpassword'];
          let hash: string | null = null;
          let foundKey = 'none';
          for (const k of possibleKeys) {
            if (typeof user[k] === 'string' && (user[k] as string).length > 0) {
              hash = user[k] as string;
              foundKey = k;
              break;
            }
          }
          if (!hash) {
            // Identify WHICH row Vercel sees (id + updated_at) so we can tell
            // if Vercel is on a different DB branch / replica than local.
            const id = String(user['id'] ?? 'noid');
            const updatedRow = (await rawSql`
              SELECT id, updated_at, length(hashed_password) AS hash_len
              FROM users WHERE id = ${id}
            `) as Array<{ id: string; updated_at: string | null; hash_len: number | null }>;
            const r = updatedRow[0];
            const u = r?.updated_at ? String(r.updated_at).slice(0, 19).replace(/[^0-9]/g, '') : 'noup';
            const hl = r?.hash_len ?? 'null';
            const error = new NoHashError();
            error.code = `v5_id${id.slice(0, 12)}_u${u.slice(0, 14)}_hl${hl}`;
            throw error;
          }

          const ok = await bcrypt.compare(password, hash);
          if (!ok) throw new BadPasswordError();

          return {
            id: user.id as string,
            name: (user.name as string) ?? null,
            email: user.email as string,
            image: (user.image as string) ?? null,
          };
        } catch (err) {
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
