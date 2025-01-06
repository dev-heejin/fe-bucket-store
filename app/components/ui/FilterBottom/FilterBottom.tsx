'use client';

import { Close, Refresh } from '@mui/icons-material';
import { Button, Chip } from '@mui/material';
import { FILTER } from '@/app/constants/Filter.constant';
import { useFloatingButtonStore } from '@/app/stores';

export default function FilterBottom() {

  const isOpen = useFloatingButtonStore((set) => set.isOpen);
  const setIsOpen = useFloatingButtonStore((set) => set.setIsOpen);

  if (!isOpen) return null;

  return (
    <>
      <div className='w-full h-full bg-black fixed top-0 z-[50] opacity-70' onClick={() => setIsOpen()} />
      <div className='w-full flex flex-col gap-[20px] p-[30px_10px] bg-white fixed bottom-0 rounded-t-2xl z-[100]'>
        <div className='flex justify-between items-center px-[20px]'>
          <span className='text-md font-bold'>FILTER</span>
          <Close color='inherit' onClick={() => setIsOpen()} />
        </div>
        <div className='w-full flex gap-1 overflow-auto'>
          {FILTER.map((x) => (
            <Chip
              label={x}
              key={x}
              size='medium'
              variant='outlined'
              sx={{
                color: 'black',
                background: 'white',
              }}
            />
          ))}
        </div>
        <div className='w-full flex px-[20px] pt-[200px]'>
          <Refresh color='inherit' sx={{ border: '1px solid black', borderRadius: '100%', padding: '4px', fontSize: 40 }}/>
          <Button variant='contained' sx={{background: 'black', color: 'white', width: '100%', borderRadius: '50px', paddingY:1 }}>적용</Button>
        </div>
      </div>
    </>
  );
}