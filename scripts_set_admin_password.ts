import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import bcrypt from 'bcryptjs';

config({ path: '.env.local' });

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Usage: npx tsx scripts_set_admin_password.ts <email> <password>');
  console.error('Example: npx tsx scripts_set_admin_password.ts admin@aureliaviajes.com MyChosenPassword123!');
  process.exit(1);
}
if (password.length < 8) {
  console.error('Password must be at least 8 characters.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL!);

(async () => {
  // First check the user exists and is an admin
  const existing = await sql`SELECT id, email, role FROM users WHERE email = ${email}`;
  if (existing.length === 0) {
    console.error(`No user found with email ${email}.`);
    console.error('Tip: have the user sign up first at /auth/registro, then run this script to promote them to admin and set the password.');
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  const result = await sql`
    UPDATE users
    SET hashed_password = ${hash},
        role = 'admin',
        updated_at = NOW()
    WHERE email = ${email}
    RETURNING id, email, role
  `;
  console.log('--- Admin credentials set ---');
  console.log('Email:    ', email);
  console.log('Password: ', password);
  console.log('Role:     ', result[0].role);
  console.log('Login URL:', 'https://travelwebsite-eight-zeta.vercel.app/auth/login');
  console.log('Admin URL:', 'https://travelwebsite-eight-zeta.vercel.app/admin');
})();
