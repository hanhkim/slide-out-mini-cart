import { getProductById } from '@/services/mocks/products.mock';
import { NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ productId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { productId } = await context.params;
  const product = getProductById(productId);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
