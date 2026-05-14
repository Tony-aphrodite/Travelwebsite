import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getCartItems, addCartItem, removeCartItem, updateCartItemQuantity } from '@/lib/db/queries';
import { addToCartSchema } from '@/lib/validators';
import { z } from 'zod';

const updateQtySchema = z.object({
  id: z.number().int().positive(),
  quantity: z.number().int().min(1).max(99),
});

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

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = updateQtySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos invalidos' }, { status: 400 });
  }

  const updated = await updateCartItemQuantity(parsed.data.id, session.user.id, parsed.data.quantity);
  if (updated.length === 0) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  }
  return NextResponse.json(updated[0]);
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
