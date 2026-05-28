import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const email = process.argv[2] || 'admin@aureliaviajes.com';
const password = process.argv[3] || 'aurelia2026';

const sql = neon(process.env.DATABASE_URL!);

(async () => {
  console.log('Simulating NextAuth credentials authorize() with:');
  console.log('  email:    ', JSON.stringify(email));
  console.log('  password: ', JSON.stringify(password), `(length ${password.length})`);
  console.log();

  const norm = String(email).toLowerCase().trim();
  console.log('Normalized email:', JSON.stringify(norm));

  const rows = await sql`SELECT id, name, email, role, hashed_password FROM users WHERE email = ${norm}`;
  console.log('Rows matched:    ', rows.length);

  if (rows.length === 0) {
    console.log('❌ user-not-found — authorize() would return null');
    process.exit(1);
  }
  const u: any = rows[0];
  console.log('  id:           ', u.id);
  console.log('  name:         ', u.name);
  console.log('  role:         ', u.role);
  console.log('  hash length:  ', u.hashed_password?.length || 0);
  console.log('  hash prefix:  ', u.hashed_password?.slice(0, 7));

  if (!u.hashed_password) {
    console.log('❌ no-hashed-password — authorize() would return null');
    process.exit(1);
  }

  const ok = await bcrypt.compare(password, u.hashed_password);
  console.log('bcrypt.compare:  ', ok);

  if (ok) {
    console.log('✅ authorize() WOULD return user — DB + bcrypt OK');
  } else {
    console.log('❌ bcrypt-compare-failed — password does not match the hash in DB');
  }
})();
