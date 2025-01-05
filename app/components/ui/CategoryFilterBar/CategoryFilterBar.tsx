'use client';

import { Chip } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORY } from '@/app/constants/Category.constant';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode, Pagination } from 'swiper/modules';

export default function CategoryFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectCheckHandler = (value: string) => {
    return searchParams.get('tab') === value;
  };

  const categoryChangeHandler = (value: string) => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('tab', value);
    router.replace(`?${currentParams}`);
  };

  return (
    <div className="w-full bg-white shadow-md sticky top-0 z-50 py-[10px] lg:static lg:shadow-none">
      <Swiper
        slidesPerView={'auto'}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
      >
        <div className="duration-0 transform delay-0">
          {CATEGORY.map((x) => (
            <SwiperSlide key={x.value} style={{ width: 'auto !important' }}>
              <Chip
                label={x.label}
                skipFocusWhenDisabled
                clickable
                sx={{
                  fontSize: 13,
                  padding: '6px_15px',
                  borderColor: `${x.value !== '25' && 'black'}`,
                  backgroundColor: `${x.value === '25' && 'black'}`,
                  color: `${x.value === '25' ? 'white' : 'black'}`,
                  marginRight: 1,
                }}
                // onClick={() => categoryChangeHandler(x.value)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
