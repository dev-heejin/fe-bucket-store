export type SelectOption = { label: string, value: string }


export type GoodsItemType = {
    code: string,
    name: string,
    statusCode: string,
    brandName: string,
    brandId: number,
    price: {
        tag: number,
        real: number,
        discountRate: number,
        maxDiscountPrice: number,
        maxDiscountRate: number
    },
    url: string,
    isFavorite: false,
    isSoldOut: false,
    deliveryFeeCode: string,
    badges?: {
        custom: [],
        attribute: [],
        recommend: {
            goodsCode: string,
            id: 4,
            type: string,
            name: string,
            inOrder: number,
            isAuto: boolean
        }[]
    }
}

export type GoodsResponseType = {
    meta: {
        checkSum: null,
        pageInfo: {
            page: number,
            size: number,
            total: number,
            pages: number
        }
    },
    body: GoodsItemType[]
}
