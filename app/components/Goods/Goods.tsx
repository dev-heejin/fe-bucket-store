'use client'
import {GoodsItem} from "@/app/components";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {notFound} from "next/navigation";
import {useProductStore} from "@/app/_stores/productsState";

async function getItems(page: number) {
    const response = await fetch(`/api/items?page=${page}`)
    if (!response.ok) {
        return notFound()
    }
    const data = await response.json()
    return data.data
}


export default function Goods() {
    const [hasNextPage, setHasNextPage] = useState<boolean>(false)

    const pageRef = useRef<number>(1)
    const bottomRef = useRef<HTMLDivElement | null>(null)

    const {products, setProducts} = useProductStore();


    useEffect(() => {
        if (products) {
            setHasNextPage(products.meta.pageInfo.page < products.meta.pageInfo.pages);
        }
    }, [products]); // products가 업데이트될 때마다 실행

    useEffect(() => {
        if (!bottomRef.current || !hasNextPage) return;

        const io = new IntersectionObserver((entries, _observer) => {
            if (entries[0].isIntersecting) {
                // 페이지 증가 및 데이터 호출을 한 번만 진행하도록 설정
                if (hasNextPage) {
                    pageRef.current += 1; // 페이지 번호 증가
                    getItems(pageRef.current).then((response) => {
                        if (!response) return;

                        setProducts(response); // 상품 목록 업데이트
                        // 다음 페이지가 있는지 확인하고 hasNextPage 상태 업데이트
                        const isNextPageAvailable = pageRef.current < response.meta.pageInfo.pages;
                        setHasNextPage(isNextPageAvailable);

                    });
                }
            }
        });

        io.observe(bottomRef.current);

        return () => {
            io.disconnect();
        };
    }, [hasNextPage]); // hasNextPage 상태가 true일 때만 페이지 증가 및 데이터 호출

    if (!products) return null

    return <>
        <div className='grid w-full min-w-full grid-cols-2 gap-5 lg:pr-4 lg:grid-cols-4 md:grid-cols-2'>
            {
                products.body.map((x, idx) => <div key={`${x.code}+${idx}`} className={'flex '}>
                    <GoodsItem item={x}/>
                </div>)
            }
        </div>
        <div ref={bottomRef} style={{width: "100%", height: 30, background: 'black'}}></div>
    </>
}