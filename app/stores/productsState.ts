import { create } from 'zustand';
import { GoodsResponseType } from '@/app/type';
import { deleteProductFavorite, postProductFavorite } from '@/app/data';

interface ProductState {
  productList: GoodsResponseType | null;
  setProductList: (state: GoodsResponseType) => void;
  resetProductList: () => void;
  setFavorite: (code: string) => void;
  deleteFavorite: (code: string) => void;
};


const useProductsStore = create<ProductState>((set) => ({
  productList: null,
  setProductList: (newProducts) =>
    set((state) => {
      const { productList } = state;
      if (productList) {
        const updatedProducts = {
          meta: productList.meta,
          body: [...productList.body, ...newProducts.body],
        };
        return { productList: updatedProducts };
      } else {
        return { productList: newProducts };
      }
    }),
  resetProductList: () => set(() => ({ productList: null })),
  setFavorite: async (code: string) => {
    try {
      const { updatedCode } = await postProductFavorite(code);

      set((state) => {
        const { productList } = state;

        if (!productList) return state;

        const updatedBody = productList.body.map((product) =>
          product.code === updatedCode
            ? { ...product, isFavorite: true }
            : product
        );

        return {
          productList: {
            ...productList,
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
      const { deletedCode } = await deleteProductFavorite(code);

      set((state) => {
        const { productList } = state;

        if (!productList) return state;

        const updatedBody = productList.body.map((product) =>
          product.code === deletedCode
            ? { ...product, isFavorite: false }
            : product
        );

        return {
          productList: {
            ...productList,
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
