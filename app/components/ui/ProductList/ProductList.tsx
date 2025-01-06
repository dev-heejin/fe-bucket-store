'use client';
import { useEffect, useRef, useState } from 'react';
import { useFloatingButtonStore, useProductsStore } from '@/app/stores';
import { getProductList } from '@/app/data';
import { ProductListHeader, Product, InfiniteScroll } from '@/app/components';

export default function ProductList() {
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const pageRef = useRef<number>(1);

  const isOpen = useFloatingButtonStore((set) => set.isOpen);
  const productList = useProductsStore((state) => state.productList);
  const setProductList = useProductsStore((state) => state.setProductList);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (productList) {
      setHasNextPage(
        productList.meta.pageInfo.page < productList.meta.pageInfo.pages,
      );
    }
  }, [productList]);

  const nextPageHandler = () => {
    pageRef.current += 1;
    getProductList({ page: pageRef.current, order_type: 'newest' }).then((response) => {
      if (!response) return;
      setProductList(response);
      const isNextPageAvailable = pageRef.current < response.meta.pageInfo.pages;
      setHasNextPage(isNextPageAvailable);
    });
  };

  if (!productList) return null;

  return (
    <>
      <ProductListHeader />
      <InfiniteScroll hasNextPage={hasNextPage} nextPageHandler={nextPageHandler}>
        <div className='grid w-full min-w-full grid-cols-2 gap-y-10 lg:pr-4 lg:grid-cols-4 md:grid-cols-2'>
          {productList.body.map((x) => (
            <div key={`${x.code}`} className='flex items-center justify-center'>
              <Product product={x} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
