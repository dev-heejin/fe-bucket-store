'use client';

import { GoodsResponseType } from '@/app/type';
import { useEffect } from 'react';
import useProductsStore from '@/app/stores/productsState';

export default function GoodsClient({
  productData,
}: {
  productData: GoodsResponseType;
}) {
  
  const setValue = useProductsStore((state) => state.setProducts)
  const resetValue = useProductsStore((state) => state.resetProducts)

  useEffect(() => {
    resetValue()
    setValue(productData);
  }, [productData]);

  return null;
}
