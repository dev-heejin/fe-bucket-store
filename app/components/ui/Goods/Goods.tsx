'use client';
import { GoodsItem } from '@/app/components';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useProductsStore from '@/app/stores/productsState';
import { MenuItem, Select } from '@mui/material';
import { ORDER_TYPE, OrderType } from '@/app/type';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { getItems } from '@/app/data';


export default function Goods() {
  const router = useRouter();

  const searchParams = useSearchParams()

  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [type, setType] = useState<OrderType>(searchParams.get('order_type') as OrderType ?? 'newest');

  const pageRef = useRef<number>(1);
  const bottomRef = useRef<HTMLDivElement | null>(null);


  const products = useProductsStore((state) => state.products)
  const setProducts = useProductsStore((state) => state.setProducts)


  useEffect(() => {
    if (products) {
      setHasNextPage(
        products.meta.pageInfo.page < products.meta.pageInfo.pages,
      );
    }
  }, [products]); // products가 업데이트될 때마다 실행

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const io = new IntersectionObserver((entries, _observer) => {
      if (entries[0].isIntersecting) {
        // 페이지 증가 및 데이터 호출을 한 번만 진행하도록 설정
        if (hasNextPage) {
          pageRef.current += 1; // 페이지 번호 증가
          getItems({page: pageRef.current, order_type: 'newest'}).then((response) => {
            console.log('여기에요',response)
            if (!response) return;

            setProducts(response); // 상품 목록 업데이트
            // 다음 페이지가 있는지 확인하고 hasNextPage 상태 업데이트
            const isNextPageAvailable =
              pageRef.current < response.meta.pageInfo.pages;
            setHasNextPage(isNextPageAvailable);
          });
        }
      }
    });

    io.observe(bottomRef.current);

    return () => {
      io.disconnect();
    };
  }, [hasNextPage]); // hasNextPage 상태가 true일 때만 페이지 증가 및 데이터 호출

  const handleTypeChange = (event: SelectChangeEvent<OrderType>) => {
    setType(event.target.value as OrderType);
    pageRef.current = 1
    router.replace(`?order_type=${event.target.value}`);
  };

  if (!products) return null;

  return (
    <>
      <div className="w-full flex justify-between items-center py-[10px]">
        <span className="font-bold text-sm">
          {products.meta.pageInfo.total} 개
        </span>
        <Select
          displayEmpty
          value={type}
          onChange={handleTypeChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }
            return ORDER_TYPE.find((x) => x.type === selected)!.label;
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
        >
          {ORDER_TYPE.map((name) => (
            <MenuItem key={name.label} value={name.type}>
              {name.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="grid w-full min-w-full grid-cols-2 gap-5 lg:pr-4 lg:grid-cols-4 md:grid-cols-2">
        {products.body.map((x, idx) => (
          <div key={`${x.code}+${idx}`} className={'flex '}>
            <GoodsItem item={x} />
          </div>
        ))}
      </div>
      <div
        ref={bottomRef}
        style={{ width: '100%', height: 30, background: 'black' }}
      ></div>
    </>
  );
}
