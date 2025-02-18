import { createClient } from '../../../../utils/supabase/server';
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { GlobalProductInfoType, productColorsType, productStockType, ImagesType, WishListType } from '../../../Type/type';

export async function POST(request: NextRequest) {
    const { wishList } = await request.json();
    const supabase = await createClient();

    const results = await Promise.all(
        wishList.map(async ({ product_ID, color_ID, productStockID }) => {
            try {
                const [GlobalProductInfoResult, imagesResult] = await Promise.all([
                    supabase
                        .from('GlobalProductInfo')
                        .select('product_id,title_en, title_ge')
                        .eq('product_id', product_ID),
                    supabase
                        .from('Images')
                        .select('isPrimary')
                        .eq("product_ColorID", color_ID)
                ]);

                if (GlobalProductInfoResult.error) throw new Error(GlobalProductInfoResult.error.message);
                if (imagesResult.error) throw new Error(imagesResult.error.message);

                let productStockResult = null;
                if (productStockID) {
                    productStockResult = await supabase
                        .from('productStock')
                        .select("product_ColorID, size, price_lari, price_usd, count")
                        .eq('productStockID', productStockID);

                    if (productStockResult.error) throw new Error(productStockResult.error.message);
                }

                return {
                    product: GlobalProductInfoResult.data,
                    productStock: productStockResult ? productStockResult.data : null,
                    images: imagesResult.data
                };
            } catch (error) {
                return { error: error.message };
            }
        })
    );

    return NextResponse.json(results);
}
