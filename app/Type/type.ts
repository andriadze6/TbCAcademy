
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
export type Refund = {

    user_id: string | null;     // მომხმარებლის ID (UUID), შეიძლება იყოს null
    session_id: string;         // Stripe Checkout Session ID
    payment_intent?: string;    // Payment Intent ID (nullable)
    refund_id?: string;         // Stripe-ის Refund ID (nullable)
    customer_email: string;     // მომხმარებლის Email
    refunded_amount: number;    // დაბრუნებული თანხა (DECIMAL)
    currency: string;           // ვალუტა (USD, EUR, GEL და ა.შ.)
    status: 'pending' | 'processed' | 'failed'; // Refund-ის სტატუსი
    reason?: string;            // დაბრუნების მიზეზი (nullable)
    product?: string;           // რომელი პროდუქტი დაბრუნდა (nullable)
    created_at: string;         // როდის მოითხოვა მომხმარებელმა (TIMESTAMP)
    processed_at?: string | null; // როდის შესრულდა Refund (nullable)
  };
  export type ErrorLog = {
    id: number;
    user_id?: string | null;   // მომხმარებლის UUID (NULL თუ არ არის მომხმარებელთან დაკავშირებული)
    session_id?: string | null; // Stripe-ის სესიის ID (NULL თუ არაა გადახდასთან დაკავშირებული)
    error_message: string;      // შეცდომის ტექსტი
    stack_trace?: string | null;// Stack Trace (თუ არის ხელმისაწვდომი)
    function_name?: string | null; // რომელი ფუნქციიდან წარმოიშვა
    file_name?: string | null;  // რომელ ფაილში მოხდა შეცდომა
    line_number?: number | null;// რომელი ხაზიდან წამოვიდა შეცდომა
    status: 'unresolved' | 'resolved' | 'ignored'; // შეცდომის სტატუსი
    created_at: string;         // როდის მოხდა შეცდომა
    resolved_at?: string | null;// როდის გამოსწორდა (NULL თუ ჯერ არ გამოსწორებულა)
  };
  
