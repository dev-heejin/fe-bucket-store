import { NextResponse } from 'next/server';
import { getProducts } from '@/app/services/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    const response = await getProducts(searchParams);
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(e)
  }
}