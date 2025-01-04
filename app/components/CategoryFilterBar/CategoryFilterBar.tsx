'use client'

import {Chip} from "@mui/material";
import {useRouter, useSearchParams} from "next/navigation";
import {CATEGORY} from "@/app/constants/Category.constant";

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {FreeMode, Pagination} from "swiper/modules";

export default function CategoryFilterBar() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const selectCheckHandler = (value: string) => {
        return searchParams.get('tab') === value
    }

    const categoryChangeHandler = (value: string) => {
        const currentParams = new URLSearchParams(searchParams)
        currentParams.set('tab', value)
        router.replace(`?${currentParams}`)
    }

    const categoryResetHandler = () => {
        const currentParams = new URLSearchParams(searchParams)
        currentParams.delete('tab')
        router.replace(`?${currentParams}`)
    }

    return <div
        className="w-full bg-white shadow-md sticky top-0 z-50 py-[10px] lg:static lg:shadow-none "
    >
        <Swiper
            slidesPerView={'auto'}
            freeMode={true}
            pagination={{
                clickable: true,
            }}
            modules={[FreeMode, Pagination]}
        >
            <div className="duration-0 transform delay-0">
                <SwiperSlide style={{width: 'auto !important'}}>
                    <Chip label={'전체'}
                          skipFocusWhenDisabled
                          clickable
                          sx={{
                              fontSize: 13,
                              padding: '6px_15px',
                              borderColor: `${!searchParams.get('tab') && 'black'}`,
                              backgroundColor: `${!searchParams.get('tab') && 'black'}`,
                              color: `${!searchParams.get('tab') ? 'white' : 'black'}`,
                              marginRight: 1,
                              zIndex:10
                          }}
                          onClick={categoryResetHandler}
                    />
                </SwiperSlide>
                {
                    CATEGORY.map(x => <SwiperSlide key={x.value} style={{width: 'auto !important'}}><Chip
                        label={x.label}
                        skipFocusWhenDisabled
                        clickable
                        sx={{
                            fontSize: 13,
                            padding: '6px_15px',
                            borderColor: `${!selectCheckHandler(x.value) && 'black'}`,
                            backgroundColor: `${selectCheckHandler(x.value) && 'black'}`,
                            color: `${selectCheckHandler(x.value) ? 'white' : 'black'}`,
                            marginRight: 1
                        }}
                        onClick={() => categoryChangeHandler(x.value)}
                    /></SwiperSlide>)
                }
            </div>
        </Swiper>

    </div>
}