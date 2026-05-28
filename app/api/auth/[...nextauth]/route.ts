// Force Node runtime — bcryptjs + Drizzle require it. Vercel sometimes
// infers Edge for catch-all auth routes, which silently breaks
// Credentials.authorize().
export const runtime = 'nodejs';

import { handlers } from '@/lib/auth';
export const { GET, POST } = handlers;
