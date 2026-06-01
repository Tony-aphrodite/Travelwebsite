import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

// Vercel serverless functions cap request bodies at ~4.5MB by default; we
// reject anything above 4MB to leave headroom for multipart encoding.
const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'admin') return null;
  return session;
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Vercel Blob no está configurado. Falta BLOB_READ_WRITE_TOKEN.' },
      { status: 500 },
    );
  }

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 });
  }

  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: 'Formato no permitido. Usa JPG, PNG, WebP, GIF o AVIF.' },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `La imagen supera el máximo de ${MAX_BYTES / 1024 / 1024} MB` },
      { status: 400 },
    );
  }

  const ext = (file.name.split('.').pop() || file.type.split('/')[1] || 'jpg').toLowerCase();
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  const folder = String(form.get('folder') || 'uploads').replace(/[^a-z0-9_-]/gi, '');
  const filename = `${folder}/${stamp}-${rand}.${ext}`;

  const blob = await put(filename, file, {
    access: 'public',
    contentType: file.type,
    addRandomSuffix: false,
  });

  return NextResponse.json({ url: blob.url, size: file.size, type: file.type });
}
