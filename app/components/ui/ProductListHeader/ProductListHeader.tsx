'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MenuItem, Select } from '@mui/material';
import { SwapVert } from '@mui/icons-material';
import { ORDER_TYPE_OPTIONS, OrderType } from '@/app/type';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { useProductsStore } from '@/app/stores';

const selectStyle = {
  fontSize: '0.875rem',
  height: '32px',
  minWidth: '120px',
  padding: '4px_6px',
  borderRadius: '20px',
};

const selectMenuStyle = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5,
      width: 150,
    },
  },
};

export default function ProductListHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const products = useProductsStore((state) => state.productList);

  const [type, setType] = useState<OrderType>(searchParams.get('order_type') as OrderType ?? 'newest');
  const handleTypeChange = (event: SelectChangeEvent<OrderType>) => {
    setType(event.target.value as OrderType);
    router.replace(`?order_type=${event.target.value}`);
  };

  if (!products) return null;

  return (
    <div className='w-full flex justify-between items-center p-[10px]'>
      <span className='font-bold text-sm'>{products.meta.pageInfo.total} 개</span>
      <Select
        size='small'
        value={type}
        onChange={handleTypeChange}
        IconComponent={SwapVert}
        renderValue={(selected) => {
          return ORDER_TYPE_OPTIONS.find((x) => x.value === selected)!.label;
        }}
        sx={selectStyle}
        MenuProps={selectMenuStyle}
      >
        {ORDER_TYPE_OPTIONS.map(({label, value}) => (
          <MenuItem key={label} value={value} sx={{ fontSize: '0.75rem' }}>{label}</MenuItem>
        ))}
      </Select>
    </div>
  );
}