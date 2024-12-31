'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {GNB_CATEGORY, GNB_MENU} from './Header.constant';
import {Search} from "@mui/icons-material";

export default function Header() {
    return <header className='w-full flex flex-col'>
        {/*웹 화면에서만 노출되는 검정색 배경*/}
        <div
            className='w-full p-[24px] hidden lg:fixed lg:top-0 lg:left-0 lg:flex lg:bg-black lg:gap-[16px] lg:justify-start lg:items-center'>
            <h1 className='font-bold text-4xl text-white'>BUCKET</h1>
            <div className='flex gap-4 text-md font-bold text-white [&_*:first-of-type]:text-red-500'>{
                GNB_CATEGORY.map(x => <span key={x}>{x}</span>)
            } | {
                GNB_MENU.map(x => <span key={x}>{x}</span>)
            }</div>
        </div>
        {/*모바일 화면에서도 노출되는 타이틀 영역*/}
        <div className='w-full bg-white p-[20px] flex justify-between items-center lg:mt-[80px] lg:p-[40px]'>
            <div className='flex justify-start items-center gap-[12px]'>
                <ArrowBackIcon className={'lg:!hidden'} sx={{color: 'gray', fontSize: 24}}/>
                <h4 className='text-xl lg:text-7xl lg:font-bold'>티셔츠</h4>
            </div>
            <div className='flex gap-[16px] justify-start items-center'>
                <Search className={'lg:!hidden'} sx={{color: 'gray', fontSize: 24}}/>
                <LocalMallIcon className={'lg:!hidden'} sx={{color: 'gray', fontSize: 24}}/>
            </div>
        </div>
    </header>
}