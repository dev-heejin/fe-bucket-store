'use client'

import {CATEGORY} from "@/app/constants/Category.constant";
import {useRouter, useSearchParams} from "next/navigation";

export default function Navigation() {

    const router = useRouter()
    const searchParams = useSearchParams()

    const selectCheckHandler = (value: string) => {
        return searchParams.get('tab') === value
    }

    const categoryChangeHandler = (value: string) => {
        const currentParams = new URLSearchParams(searchParams)
        currentParams.set('tab', value)
        router.replace(`?${currentParams}`)
    }


    const categoryResetHandler = () => {
        const currentParams = new URLSearchParams(searchParams)
        currentParams.delete('tab')
        router.replace(`?${currentParams}`)
    }

    return <nav
        className="hidden lg:flex lg:flex-col lg:gap-[100px] sticky top-[240px] left-0 w-[250px] bg-gray-200 h-[calc(100vh-90px)] p-4 z-40">
        <ul className="space-y-2">
            <li
                className={`${!searchParams.get('tab') && 'font-bold underline'} text-2xl cursor-pointer`}
                onClick={categoryResetHandler}>
                전체
            </li>
            {CATEGORY.map((item) => (
                <li key={item.value}
                    onClick={() => categoryChangeHandler(item.value)}
                    className={`${selectCheckHandler(item.value) && 'font-bold underline'} text-2xl cursor-pointer`}>
                    {item.label}
                </li>
            ))}
        </ul>
        <ul className="space-y-2">
            {['메뉴1', '메뉴2', '메뉴3', '메뉴4'].map((item) => (
                <li key={item} className="font-bold text-lg">
                    {item}
                </li>
            ))}
        </ul>
    </nav>
}