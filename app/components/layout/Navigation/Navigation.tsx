'use client';

import { CATEGORY } from '@/app/constants/Category.constant';
import { useRouter, useSearchParams } from 'next/navigation';
import { FILTER } from '@/app/constants/Filter.constant';
import { KeyboardArrowDown, Refresh } from '@mui/icons-material';

export default function Navigation() {
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
    <nav
      className="hidden lg:flex lg:flex-col lg:gap-[100px] sticky top-[90px] left-0 w-[360px] bg-gray-200 h-[calc(100vh-90px)] p-4 z-40">
      <ul className="space-y-2">
        {CATEGORY.map((item) => (
          <li
            key={item.value}
            // onClick={() => categoryChangeHandler(item.value)}
            className={`${item.value === '25' && 'font-bold underline'} text-2xl cursor-pointer`}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <ul className="space-y-2 p-[5px]">
        <div className='w-full  p-[10px] flex justify-between bg-black text-white'>FILTER
          <Refresh color={'inherit'} />
        </div>
        {FILTER.map((item) => (
          <li key={item} className="font-bold text-sm p-[10px_2px] flex justify-between w-full ">
            {item}
            <KeyboardArrowDown color={'inherit'} fontSize={'small'} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
