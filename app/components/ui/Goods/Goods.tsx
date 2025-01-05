'use client';
import { GoodsItem } from '@/app/components';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useProductsStore from '@/app/stores/productsState';
import { MenuItem, Select } from '@mui/material';
import { ORDER_TYPE, OrderType } from '@/app/type';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { getItems } from '@/app/data';
import useFloatingButtonStore from '@/app/stores/floatingButtonState';
import { CurrencyExchange, SwapVert } from '@mui/icons-material';


export default function Goods() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [type, setType] = useState<OrderType>(searchParams.get('order_type') as OrderType ?? 'newest');

  const pageRef = useRef<number>(1);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);

  const isOpen = useFloatingButtonStore((set) => set.isOpen);

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
          getItems({ page: pageRef.current, order_type: 'newest' }).then((response) => {
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
    pageRef.current = 1;
    router.replace(`?order_type=${event.target.value}`);
  };

  if (!products) return null;

  return (
    <>
      <div className="w-full flex justify-between items-center p-[10px]">
        <span className="font-bold text-sm">
          {products.meta.pageInfo.total} 개
        </span>
        <Select
          size="small"
          displayEmpty
          value={type}
          onChange={handleTypeChange}
          IconComponent={SwapVert} // 여기에서 아이콘을 변경
          renderValue={(selected) => {
            return ORDER_TYPE.find((x) => x.type === selected)!.label;
          }}
          sx={{
            fontSize: '0.875rem',  // 폰트 크기 줄이기
            height: '32px',        // 높이 줄이기
            minWidth: '120px',     // 최소 너비 줄이기
            padding: '4px_6px',    // 패딩 조정
            borderRadius: '20px',
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5,
                width: 150,
              },
            },
          }}
        >
          {ORDER_TYPE.map((name) => (
            <MenuItem key={name.label} value={name.type} sx={{
              fontSize: '0.75rem',  // MenuItem의 폰트 크기 작게
              // padding: '4px_8px',   // MenuItem의 패딩 작게
            }}>
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
        style={{ width: '100%', height: 30 }}
      ></div>
    </>
  );
}
