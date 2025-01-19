
export type globalInfoType = {
    title_en: string;
    title_ge: string;
    description_ge: string;
    description_en: string;
    gender: string;
    tag: string[];
    details_ge:string[],
    details_en:string[],
    category: categoryType[];
    selectedCategory: string;
};

export type categoryType = {
    id: number;
    gender: string;
    label_en: string;
    label_ge: string;
}

export type catalogType = {
    color: string;
    color_ge: string;
    color_en: string;
    sizeObj: any;
    img: string[];
    base64Img: string[];
    imageUploaded: boolean;
};

export type sizeType = {
    count: number;
    price: number;
}

export type  productColorsType = {
    productColorID:string;
    product_id:string;
    color_en:string;
    color_ge:string;
    color_Code:string;
}

export type productStockType = {
    productStockID:string;
    size:string;
    price_lari:number;
    price_usd:number;
    count:number;
    stripe_ProductID:string;
}

export type ImagesType = {
    imageURL: string[];
    productColorID: string;
}

export type GlobalProductInfoType = {
    title_en: string;
    title_ge: string;
    description_ge: string;
    description_en: string;
    gender: string;
    tag: string[];
}
