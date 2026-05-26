import { API_DELAY_MS_MAX, API_DELAY_MS_MIN } from '@/constants/cart.constants';
import { shouldFail, updateItemQuantity } from '@/services/mocks/cart.mock';
import { randomPatchDelay, sleep } from '@/utils/sleep';
import { NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;

  let body: { quantity?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const quantity = body.quantity;
  if (
    typeof quantity !== 'number' ||
    !Number.isFinite(quantity) ||
    quantity < 0
  ) {
    return NextResponse.json(
      { error: 'quantity must be a non-negative number' },
      { status: 400 }
    );
  }

  await sleep(randomPatchDelay(API_DELAY_MS_MIN, API_DELAY_MS_MAX));

  if (shouldFail()) {
    return NextResponse.json(
      { error: 'Network error: could not update quantity' },
      { status: 500 }
    );
  }

  const cart = updateItemQuantity(id, quantity);
  if (!cart) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json(cart);
}
