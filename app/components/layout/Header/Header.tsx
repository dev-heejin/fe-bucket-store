'use client';

import { GNB_CATEGORY, GNB_MENU } from './Header.constant';
import { ArrowBack, LocalMall } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
  return (
    <header className="w-full flex flex-col z-50">
      {/* 검정 배경 영역 고정 */}
      <div className="w-full p-[24px] hidden lg:fixed lg:top-0 lg:left-0 lg:flex lg:bg-black lg:gap-[16px] lg:justify-start lg:items-center z-50">
        <h1 className="font-bold text-4xl text-white">BUCKET</h1>
        <div className="flex gap-4 text-md font-bold text-white [&_*:first-of-type]:text-red-500">
          {GNB_CATEGORY.map((x) => (
            <span key={x}>{x}</span>
          ))}{' '}
          |{' '}
          {GNB_MENU.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>
      {/* '티셔츠' 텍스트는 기본적으로 노출되고, 스크롤 시에만 가려짐 */}
      <div className="w-full p-[20px] flex justify-between items-center lg:mt-[80px] lg:p-[40px_20px] relative z-10">
        <div className="flex justify-start items-center gap-[12px]">
          <ArrowBack
            className={'lg:!hidden'}
            sx={{ color: 'gray', fontSize: 24 }}
          />
          <h4 className="text-xl lg:text-7xl lg:font-bold">티셔츠</h4>
        </div>
        <div className="flex gap-[16px] justify-end items-center">
          <SearchIcon
            className={'lg:!hidden'}
            sx={{ color: 'gray', fontSize: 24 }}
          />
          <LocalMall
            className={'lg:!hidden'}
            sx={{ color: 'gray', fontSize: 24 }}
          />
        </div>
      </div>
    </header>
  );
}
