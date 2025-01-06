'use client';

import { useEffect } from 'react';
import { useProductsStore } from '@/app/stores';
import { GoodsResponseType } from '@/app/type';

export default function ProductListClient({
  productData,
}: {
  productData: GoodsResponseType;
}) {
  
  const setValue = useProductsStore((state) => state.setProductList)
  const resetValue = useProductsStore((state) => state.resetProductList)

  useEffect(() => {
    resetValue()
    setValue(productData);
  }, [productData]);

  return null;
}
