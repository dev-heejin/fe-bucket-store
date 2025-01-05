import { CategoryFilterBar, Goods, GoodsClient } from '@/app/components';
import { getProducts } from '@/app/services/products';


export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string  }>;
}) {
  const sp = await searchParams
  const data = await getProducts({...sp});

  console.log('=== PAGE_DATA ===', data)

  if(!data) {
    return null
  }

  return (
    <main className="w-full">
      <CategoryFilterBar />
      <Goods />
      <GoodsClient productData={data} />
    </main>
  );
}
