export type SelectOption = { label: string; value: string };

export type GoodsItemType = {
  code: string;
  name: string;
  statusCode: string;
  brandName: string;
  brandId: number;
  price: {
    tag: number;
    real: number;
    discountRate: number;
    maxDiscountPrice: number;
    maxDiscountRate: number;
  };
  url: string;
  isFavorite: boolean;
  isSoldOut: boolean;
  deliveryFeeCode: string;
  badges?: {
    custom: [];
    attribute: [];
    recommend: {
      goodsCode: string;
      id: 4;
      type: string;
      name: string;
      inOrder: number;
      isAuto: boolean;
    }[];
  };
};

export type GoodsResponseType = {
  meta: {
    checkSum: null;
    pageInfo: {
      page: number;
      size: number;
      total: number;
      pages: number;
    };
  };
  body: GoodsItemType[];
};

export type OrderType =
  | 'newest'
  | 'low_price'
  | 'high_price'
  | 'high_discount_rate'
  | 'best';

export const ORDER_TYPE_OPTIONS: SelectOption[] = [
  { value: 'newest', label: '최신순' },
  { value: 'low_price', label: '낮은 가격순' },
  { value: 'high_price', label: '높은 가격 순' },
  { value: 'high_discount_rate', label: '할인율 높은순' },
  { value: 'best', label: '판매 인기순' },
] as const;

export interface DeleteItemHeartResponse {
  deletedCode: string;
}

export interface postItemHeartResponse {
  updatedCode: string;
}
