export { auth as middleware } from '@/lib/auth';

export const config = {
  matcher: ['/cuenta/:path*', '/carrito/:path*', '/admin/:path*', '/checkout/:path*'],
};
