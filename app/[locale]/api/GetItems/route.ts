import { createClient } from '../../../../utils/supabase/server';
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { ItemListType, productStockType,globalInfoType, ImagesType } from "@/Type/type";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const  wishList = await request.json() as ItemListType[];
    const supabase = await createClient();

    const productIDs = Array.from(new Set(wishList.map(item => item.product_ID)));
    const colorIDs = Array.from(new Set(wishList.map(item => item.color_ID).filter((id): id is string => id !== null)));
    const productStockIDs = Array.from(new Set(wishList.map(item => item.productStockID).filter((id): id is string => id !== null)));

    try {
        // მონაცემების ერთიანად წამოღება
        const [globalProductInfo, images, productColors, productStock] = await Promise.all([
            supabase.from('GlobalProductInfo')
                .select('description_en, description_ge, details_en, details_ge, gender, title_en, title_ge, product_id')
                .in('product_id', productIDs),
            supabase.from('Images')
                .select('productColorID, isPrimary')
                .in("productColorID", colorIDs),
                supabase.from('productColors')
                .select('productColorID, color_en, color_ge')
                .in('product_id', productIDs),

            productStockIDs.length ?
                supabase.from('productStock')
                    .select("productStockID, product_ColorID, size, price_lari, price_usd, count")
                    .in('productStockID', productStockIDs)
                : { data: [] as productStockType[], error: null }
        ]);

        if (globalProductInfo.error) throw new Error(globalProductInfo.error.message);
        if (images.error) throw new Error(images.error.message);
        if (productStock.error) throw new Error(productStock.error.message);
        if (productColors.error) throw new Error(productColors.error.message);

        // მონაცემების `map`-ში გადაყვანა სწრაფი წვდომისთვის
        const productMap = new Map(globalProductInfo.data.map(item => [item.product_id, item]));
        const imagesMap = new Map(images.data.map(img => [img.productColorID, img]));
        const colorsMap = new Map(productColors.data.map(color => [color.productColorID, color]));
        const stockMap = new Map(
            (productStock.data || []).map(stock => [stock.productStockID, stock] as [string, productStockType])
        );
        // საბოლოო შედეგის ფორმატირება
        const results = wishList.map(({id, product_ID, color_ID, productStockID, amount }) => ({
            id: id,
            colors: color_ID ? colorsMap.get(color_ID) || null : null,
            product: productMap.get(product_ID) || null,
            productStock: productStockID ? stockMap.get(productStockID) || null : null,
            images: color_ID ? imagesMap.get(color_ID) || null : null,
            amount: amount
        }));

        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
