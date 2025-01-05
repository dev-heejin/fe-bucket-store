import { GoodsItemType } from '@/app/type';
import Image from 'next/image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
export default function GoodsItem({ item }: { item: GoodsItemType }) {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-3">
      <div
        className={'flex flex-col items-end gap-2 w-full h-full bg-gray-200'}
      >
        <FavoriteBorderIcon sx={{ paddingRight: 1 }} fontSize={'large'} />
        <Image
          src={item.url}
          alt="goods_image"
          width={200}
          height={400}
          className="w-full h-full object-none"
        />
      </div>
      <div className={'flex flex-col justify-start items-start gap-[2px]'}>
        <span className="text-md font-bold">{item.brandName}</span>
        <span className="text-sm">{item.name}</span>
        <span className="text-sm text-gray-500 [&_b]:font-bold [&_b]:text-black">
          <b>{item.price.real}</b> {item.price.tag}
        </span>
        {item.badges && (
          <span className="text-gray-500 bg-gray-200 text-xs p-[2px_4px]">
            {item.badges.recommend[0].name}
          </span>
        )}
      </div>
    </div>
  );
}
