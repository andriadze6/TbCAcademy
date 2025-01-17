import { createClient } from '../../lib/supaBase/server'
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import {GlobalProductInfoType, productColorsType, productStockType, ImagesType} from '../../Type/type'

/**
 * POST method to handle adding a product
 * @param {Request} req
 * @returns {Response}
 */

export async function POST(request: NextRequest) {
    try{
        const supabase = await createClient();
        const body = await request.json();
        const id = body.id;


        const {data: productColorsResult, error: productColorsError} = await supabase
        .from('productColors').select('*')
        .eq('productColorID', id);

        const [GlobalProductInfoResult,productStockResult, imagesResult] = await Promise.all([
            supabase
            .from('GlobalProductInfo')
            .select('*')
            .eq('product_id', productColorsResult[0].product_id),
            supabase
                .from('productStock')
                .select("*")
                .eq('product_id', productColorsResult[0].product_id),
            supabase
                .from('Images')
                .select('imageURL, productColorID, isPrimary')
                .eq("product_id", productColorsResult[0].product_id)
        ]);

        if (GlobalProductInfoResult.error) {
            return NextResponse.json({ error: GlobalProductInfoResult.error.message }, { status: 500 });
        }
        if (productColorsError) {
            return NextResponse.json({ error: productColorsError.message }, { status: 500 });
        }

        if (productStockResult.error) {
            return NextResponse.json({ error: productStockResult.error.message }, { status: 500 });
        }

        if (imagesResult.error) {
            return NextResponse.json({ error: imagesResult.error.message }, { status: 500 });
        }

        const globalProductInfo = GlobalProductInfoResult.data as GlobalProductInfoType[];
        const productColors = productColorsResult as productColorsType[];
        const productStock = {}
        productStockResult.data.map((element) => {
            let product_ColorID = element.product_ColorID;
            let currentSize = element.size;
            let sizeObject = {}
            sizeObject[currentSize] = {
                price_lari: element.price_lari,
                count: element.count,
                price_usd: element.price_usd,
                stripe_ProductID: element.stripe_ProductID,
                productStockID: element.productStockID
            }
            productStock[product_ColorID] = {
                ...productStock[product_ColorID],
                ...sizeObject
            }
        })
        // const productStock = productStockResult.data as productStockType[];

        const images = imagesResult.data as ImagesType[];

        return NextResponse.json({globalProductInfo,productColors,productStock,images});
    }
    catch(error){
        console.log(error)
    }
}