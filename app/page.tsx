import { CategoryFilterBar, Goods, GoodsClient } from '@/app/components';
import { getProducts } from '@/app/services/products';
import FloatingFilterButton from './components/ui/FloatingFilterButton/FloatingFilterButton';
import FilterBottom from './components/ui/FilterBottom/FilterBottom';
import FloatingTopButton from './components/ui/FloatingTopButton/FloatingTopButton';


export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string  }>;
}) {
  const sp = await searchParams
  const data = await getProducts({...sp});

  if(!data) {
    return null
  }

  return (
    <main className="w-full sm:m-[10px]">
      <CategoryFilterBar />
      <Goods />
      <GoodsClient productData={data} />
      <FloatingTopButton />
      <FloatingFilterButton />
      <FilterBottom />
    </main>
  );
}
