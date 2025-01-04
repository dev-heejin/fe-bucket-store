import {CategoryFilterBar, Goods} from "@/app/components";
import React from "react";
import {notFound} from "next/navigation";
import GoodsClient from "@/app/components/GoodsClient/GoodsClient";


async function getGoods() {
    const response = await fetch(' https://bucket-assignment-vercel.vercel.app/api?length=12&type=newest&category=25&page=1')
    if(!response.ok) {
        return notFound()
    }
    const data = await response.json()
    console.log('===DATA ===', data)
    return data.data
}


export default async function Page({}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const data = await getGoods()

    console.log('=== PAGE ===', data)

    return <main className="w-full flex-1">
        <CategoryFilterBar/>
        <Goods/>
        <GoodsClient productData={data}/>
    </main>
}
