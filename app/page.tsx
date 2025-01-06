import {
  CategoryFilterBar,
  FilterBottom,
  FloatingFilterButton,
  FloatingTopButton,
  ProductList,
  ProductListClient,
} from '@/app/components';
import { getProducts } from '@/app/services/products';


export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string  }>;
}) {
  const sp = await searchParams

  const params = { ...sp, order_type: sp.order_type || 'newest' };

  const data = await getProducts(params);

  if(!data) {
    return null
  }

  return (
    <main className="w-full sm:m-[10px]">
      <CategoryFilterBar />
      <ProductList />
      <ProductListClient productData={data} />
      <FloatingTopButton />
      <FloatingFilterButton />
      <FilterBottom />
    </main>
  );
}
