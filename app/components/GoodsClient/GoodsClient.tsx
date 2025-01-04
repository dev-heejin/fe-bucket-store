'use client';

import {GoodsResponseType} from "@/app/type";
import {useEffect} from "react";
import {useProductStore} from "@/app/_stores/productsState";

export default function GoodsClient({productData}: { productData: GoodsResponseType }) {

    // Zustand 상태 업데이트
    const {setProducts} = useProductStore();

    useEffect(() => {
        setProducts(productData); // 상품 데이터를 전역 상태에 저장
    }, []);

    return null
}