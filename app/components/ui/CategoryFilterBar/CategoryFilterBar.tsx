'use client';

import { Chip } from '@mui/material';
import { CATEGORY } from '@/app/constants/Category.constant';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode, Pagination } from 'swiper/modules';

export default function CategoryFilterBar() {
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
                  border: `${x.value !== '25' && '1px solid black'}`,
                  backgroundColor: `${x.value === '25' ? 'black' : 'white'}`,
                  color: `${x.value === '25' ? 'white' : 'black'}`,
                  marginRight: 1,
                }}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
