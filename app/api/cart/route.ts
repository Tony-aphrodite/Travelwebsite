import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getCartItems, addCartItem, removeCartItem } from '@/lib/db/queries';
import { addToCartSchema } from '@/lib/validators';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const items = await getCartItems(session.user.id);
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = addToCartSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const item = await addCartItem({
    userId: session.user.id,
    ...parsed.data,
  });

  return NextResponse.json(item[0], { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  }

  await removeCartItem(Number(id), session.user.id);
  return NextResponse.json({ ok: true });
}
