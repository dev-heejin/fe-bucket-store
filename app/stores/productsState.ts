import { create } from 'zustand';
import { GoodsResponseType } from '@/app/type';

interface ProductState {
  products: GoodsResponseType | null;
  setProducts: (state: GoodsResponseType) => void;
  resetProducts: () => void;
};


const useProductsStore = create<ProductState>((set) => ({
  products: null,
  setProducts: (newProducts) =>
    set((state) => {
      const { products } = state;
      if (products) {
        const updatedProducts = {
          meta: products.meta,
          body: [...products.body, ...newProducts.body],
        };
        return { products: updatedProducts };
      } else {
        return { products: newProducts };
      }
    }),
  resetProducts: () => set(() => ({ products: null })),
}));


export default useProductsStore;
