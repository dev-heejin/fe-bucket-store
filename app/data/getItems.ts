import { OrderType } from '@/app/type';
import { notFound } from 'next/navigation';

export default async function getItems({page, order_type}:{page: number, order_type: OrderType}) {
  const params = new URLSearchParams({
    order_type, page: page.toString()
  })
  const response = await fetch(`/api/items?${params}`)
  if (!response.ok) {
    return notFound()
  }
  const data = await response.json()
  return data
}