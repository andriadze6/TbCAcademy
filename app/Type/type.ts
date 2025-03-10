
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
    isPrimary: string
}

export type GlobalProductInfoType = {
    title_en: string;
    title_ge: string;
    description_ge: string;
    description_en: string;
    gender: string;
    tag: string[];
}


export type DeliveryAddressType = {
  id: string;
  user_ID: string;
  first_Name: string;
  last_Name: string;
  phone: string;
  city: string;
  region: string;
  street_Address: string;
  apartment_Number: string;
  zip_Code: string;
  default: boolean
};
export type ItemListType = {
    id:string;
    user_ID:string;
    product_ID:string;
    color_ID:string;
    productStockID:string;
    amount:number;
}

export type OrderType = {
    user_id:string;
    session_id:string;
    product:string;
    amount_money:number;
    quantity:number;
    currency:string;
    pay_status:string;
    delivery_address:string;
    delivery_status:string;
    up_date:string;
}