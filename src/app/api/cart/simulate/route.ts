import { getFailRate, setFailRate } from '@/services/mocks/cart.mock';
import { NextResponse } from 'next/server';

export async function POST() {
  const next = getFailRate() > 0 ? 0 : 0.5;
  return NextResponse.json({ failRate: setFailRate(next) });
}
