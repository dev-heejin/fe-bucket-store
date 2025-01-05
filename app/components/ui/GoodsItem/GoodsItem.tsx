'use client';
import Image from 'next/image';
import { GoodsItemType } from '@/app/type';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import useProductsStore from '@/app/stores/productsState';

export default function GoodsItem({ item }: { item: GoodsItemType }) {

  const setFavorite = useProductsStore((state) => state.setFavorite);
  const deleteFavorite = useProductsStore((state) => state.deleteFavorite);

  const favoriteHandler = () => {
    try {
      item.isFavorite ? deleteFavorite(item.code) : setFavorite(item.code);
    } catch (e) {
      console.error('Failed to toggle favorite', e);
    }
  };


  return (
    <div className="w-full flex flex-col items-start justify-start gap-3">
      <div
        className={'flex flex-col items-end gap-2 w-full h-full bg-gray-200'}
      > {
        item.isFavorite ?
          <Favorite sx={{ paddingRight: 1, cursor: 'pointer' }} fontSize="large" color="action"
                    onClick={favoriteHandler} /> :
          <FavoriteBorder sx={{ paddingRight: 1, cursor: 'pointer' }} fontSize="large" onClick={favoriteHandler} />
      }
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
