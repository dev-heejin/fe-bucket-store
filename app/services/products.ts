import { GoodsResponseType } from '@/app/type';

export async function getProducts(searchParams?: {
  [key: string]: string
} | URLSearchParams): Promise<GoodsResponseType> {
  try {
    const params = new URLSearchParams(searchParams);
    const response = await fetch(`https://bucket-assignment-vercel.vercel.app/api?${params.toString()}`);
    const data = await response.json()
    return data.data;
  } catch (error: any) {
    throw new Error(error);
  }
}