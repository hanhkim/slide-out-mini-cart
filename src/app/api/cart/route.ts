import { getCart } from '@/services/mocks/cart.mock';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(getCart());
}
