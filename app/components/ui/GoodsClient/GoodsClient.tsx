'use client';

import { GoodsResponseType } from '@/app/type';
import { useEffect } from 'react';
import useProductsStore from '@/app/stores/productsState';

export default function GoodsClient({
  productData,
}: {
  productData: GoodsResponseType;
}) {


  const value = useProductsStore((state) => state.products)
  const setValue = useProductsStore((state) => state.setProducts)
  const resetValue = useProductsStore((state) => state.resetProducts)

  useEffect(() => {
    resetValue()
    setValue(productData); // 상품 데이터를 전역 상태에 저장
    // console.log('=== CLIENT COMPONENT ===', value)
  }, [productData]);

  useEffect(() => {
    console.log('=== CLIENT VALUE CHANGE ===', value)
  }, [value])

  return null;
}
