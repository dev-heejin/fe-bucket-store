'use client';
import { FilterAltOutlined } from '@mui/icons-material';
import useFloatingButtonStore from '@/app/stores/floatingButtonState';

export default function FloatingFilterButton() {

  const isOpen = useFloatingButtonStore((set) => set.isOpen)
  const setIsOpen = useFloatingButtonStore((set) => set.setIsOpen)

  if(isOpen) return null

  return <div className="fixed bottom-[25px] w-full flex justify-center items-center lg:hidden" onClick={() => setIsOpen()}>
    <span
      className="p-[6px_30px] rounded-2xl bg-black text-white z-9999 text-sm flex justify-start items-center gap-2">
      <FilterAltOutlined color="inherit" fontSize={'inherit'} />
         <span className="flex items-start gap-1.5">
          필터
           {/* 붉은색 dot */}
           <span className="w-1 h-1 bg-red-500 rounded-full relative top-1"></span>
        </span>
    </span>
  </div>;
}