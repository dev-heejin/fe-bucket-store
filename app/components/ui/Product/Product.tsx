'use client';
import Image from 'next/image';
import { GoodsItemType } from '@/app/type';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useProductsStore } from '@/app/stores';

const iconStyle = { paddingRight: 1, cursor: 'pointer', position: 'absolute', top: 3, right: 2, fontSize: 32, fill: '#c2c5c9' };

export default function Product({ product }: { product: GoodsItemType }) {

  const setFavorite = useProductsStore((state) => state.setFavorite);
  const deleteFavorite = useProductsStore((state) => state.deleteFavorite);

  const favoriteHandler = () => {
    try {
      product.isFavorite ? deleteFavorite(product.code) : setFavorite(product.code);
    } catch (e) {
      console.error('Failed to toggle favorite', e);
    }
  };

  return (
    <div className='w-full flex flex-col items-start justify-start gap-3 h-full'>
      <div className='relative bg-[#f4f4f4]'>
      <div
        onClick={favoriteHandler}
        className='cursor-pointer inline-block p-0'
      >
        {product.isFavorite ? (
          <Favorite sx={iconStyle} />
        ) : (
          <FavoriteBorder sx={iconStyle} />
        )}
      </div>
        <div className='aspect-[3/4] flex justify-center items-center'>
        <Image
          src={product.url}
          alt='product_image'
          width={512}
          height={512}
          className='object-contain object-center w-full h-full'
        />
        </div>
      </div>
      <div className='flex flex-col justify-start items-start gap-[4px]'>
        <span className='text-xs font-bold'>{product.brandName}</span>
        <span className='text-xs'>{product.name}</span>
        <span className='text-xs text-gray-500 [&_b]:font-bold [&_b]:text-black'>
          <b>{product.price.maxDiscountPrice.toLocaleString()}</b> {product.price.real.toLocaleString()}
        </span>
        {product.badges && (
          <span className='text-gray-500 bg-gray-200 text-xs p-[2px_4px]'>
            {product.badges.recommend[0].name}
          </span>
        )}
      </div>
    </div>
  );
}
