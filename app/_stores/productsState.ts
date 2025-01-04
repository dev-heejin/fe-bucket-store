import {create} from "zustand";
import {GoodsResponseType} from "@/app/type";

type ProductState = {
    products: GoodsResponseType | null; // 상품 목록
    setProducts: (products: GoodsResponseType) => void; // 상품 목록 설정 함수
};export const useProductStore = create<ProductState>((set) => ({
    products: null, // 초기 상태
    setProducts: (newProducts) => set((state) => {
        if (state.products) {
            // 기존 상품 목록에 새로운 상품 목록의 body를 추가하고, meta는 새로운 값으로 업데이트
            const updatedProducts = {
                meta: newProducts.meta, // 새로운 meta 값으로 업데이트
                body: [...state.products.body, ...newProducts.body] // 기존 body에 새로운 body 추가
            };
            return { products: updatedProducts };
        } else {
            // 처음 상태일 때는 그냥 새로운 값으로 설정
            return { products: newProducts };
        }
    }),
}));
