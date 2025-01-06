import { OrderType } from '@/app/type';

export default async function getProductList({ page, order_type }: { page: number, order_type: OrderType }) {
  const params = new URLSearchParams({
    order_type, page: page.toString(),
  });
  const response = await fetch(`/api/items?${params}`);

  if (!response.ok) {
    throw new Error('Failed to update favorite status');
  }

  return await response.json();
}