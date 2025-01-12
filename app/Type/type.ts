
export type globalInfoType = {
    title_en: string;
    title_ge: string;
    description_ge: string;
    description_en: string;
    gender: string;
    tag: string[];
    category: string;
    selectedCategory: string;
};
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
