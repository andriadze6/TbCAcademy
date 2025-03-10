import { createClient } from '../../../../utils/supabase/server';
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { ItemListType, productStockType,globalInfoType, ImagesType } from "@/Type/type";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const list = await request.json() as ItemListType[];
    const supabase = await createClient();

    const productIDs = Array.from(new Set(list.map(item => item.product_ID)));
    const colorIDs = Array.from(new Set(list.map(item => item.product_ColorID ).filter((id): id is string => id !== null)));
    const productStockIDs = Array.from(new Set(list.map(item => item.product_StockID).filter((id): id is string => id !== null)));

    try {
        // მონაცემების ერთიანად წამოღება
        const [globalProductInfo, images, productColors, productStock] = await Promise.all([
            supabase.from('GlobalProductInfo')
                .select('product_ID, description_en, description_ge, details_en, details_ge, gender, title_en, title_ge')
                .in('product_ID', productIDs),
            supabase.from('Images')
                .select('product_ColorID,isPrimary')
                .in("product_ColorID", colorIDs),
                supabase.from('productColors')
                .select('product_ColorID, color_en, color_ge')
                .in('product_ID', productIDs),

            productStockIDs.length ?
                supabase.from('productStock')
                    .select("product_StockID, product_ColorID, size, stripe_ProductID,price_lari, price_usd, count")
                    .in('product_StockID', productStockIDs)
                : { data: [] as productStockType[], error: null }
        ]);

        if (globalProductInfo.error) throw new Error(globalProductInfo.error.message);
        if (images.error) throw new Error(images.error.message);
        if (productStock.error) throw new Error(productStock.error.message);
        if (productColors.error) throw new Error(productColors.error.message);

        // მონაცემების `map`-ში გადაყვანა სწრაფი წვდომისთვის
        const productMap = new Map(globalProductInfo.data.map(item => [item.product_ID, item]));
        const imagesMap = new Map(images.data.map(img => [img.product_ColorID, img]));
        const colorsMap = new Map(productColors.data.map(color => [color.product_ColorID, color]));
        const stockMap = new Map(
            (productStock.data || []).map(stock => [stock.product_StockID, stock] as [string, productStockType])
        );
        // საბოლოო შედეგის ფორმატირება
        const results = list.map(({id, product_ID, product_ColorID , product_StockID, amount }) => ({
            id: id,
            ...colorsMap.get(product_ColorID ),
            ...productMap.get(product_ID),
            ...stockMap.get(product_StockID),
            ...imagesMap.get(product_ColorID ),
            amount: amount
        }));
        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
