import { API_DELAY_MS_MAX, API_DELAY_MS_MIN } from '@/constants/cart.constants';
import { addItemByProductId, shouldFail } from '@/services/mocks/cart.mock';
import { randomPatchDelay, sleep } from '@/utils/sleep';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let body: { productId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.productId || typeof body.productId !== 'string') {
    return NextResponse.json(
      { error: 'productId is required' },
      { status: 400 }
    );
  }

  await sleep(randomPatchDelay(API_DELAY_MS_MIN, API_DELAY_MS_MAX));

  if (shouldFail()) {
    return NextResponse.json(
      { error: 'Network error: could not add item' },
      { status: 500 }
    );
  }

  const cart = addItemByProductId(body.productId);
  if (!cart) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(cart);
}
