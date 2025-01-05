import { create } from 'zustand';
import { GoodsResponseType } from '@/app/type';
import { deleteItemHeart, postItemHeart } from '@/app/data';

interface ProductState {
  products: GoodsResponseType | null;
  setProducts: (state: GoodsResponseType) => void;
  resetProducts: () => void;
  setFavorite: (code: string) => void;
  deleteFavorite: (code: string) => void;
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
  setFavorite: async (code: string) => {
    try {
      const { updatedCode } = await postItemHeart(code);

      set((state) => {
        const { products } = state;

        if (!products) return state;

        const updatedBody = products.body.map((product) =>
          product.code === updatedCode
            ? { ...product, isFavorite: true }
            : product
        );

        return {
          products: {
            ...products,
            body: updatedBody,
          },
        };
      });
    } catch (error) {
      console.error("Post Heart Error:", error);
    }
  },
  deleteFavorite: async (code: string) => {
    try {
      const { deletedCode } = await deleteItemHeart(code);

      set((state) => {
        const { products } = state;

        if (!products) return state;

        const updatedBody = products.body.map((product) =>
          product.code === deletedCode
            ? { ...product, isFavorite: false }
            : product
        );

        return {
          products: {
            ...products,
            body: updatedBody,
          },
        };
      });
    } catch (error) {
      console.error("Delete Heart Error:", error);
    }
  },
}));

export default useProductsStore;
