import { createClient } from '../../../../utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const supabase = await createClient();
    let { data: Trending, error:TrendingError } = await supabase
    .from('Trending')
    .select('*')

    if (TrendingError) {
        return NextResponse.json({ error: TrendingError.message }, { status: 500 });
    }
    for (let i = 0; i < Trending.length; i++) {
        const [GlobalProductInfoResult, productColorsResult,productStockResult, imagesResult] = await Promise.all([
            supabase
            .from('GlobalProductInfo')
            .select('*')
            .eq('product_ID', Trending[i].product_ID),
            supabase.from('productColors')
            .select('*')
            .eq('product_ID', Trending[i].product_ID),
            supabase
                .from('productStock')
                .select("*")
                .eq('product_ID', Trending[i].product_ID),
            supabase
                .from('Images')
                .select('imageURL, product_ColorID, isPrimary')
                .eq("product_ID", Trending[i].product_ID)
        ]);

        if (GlobalProductInfoResult.error) {
            return NextResponse.json({ error: GlobalProductInfoResult.error.message }, { status: 500 });
        }
        if (productColorsResult.error) {
            return NextResponse.json({ error: productColorsResult.error.message }, { status: 500 });
        }
        if (productStockResult.error) {
            return NextResponse.json({ error: productStockResult.error.message }, { status: 500 });
        }
        if (imagesResult.error) {
            return NextResponse.json({ error: imagesResult.error.message }, { status: 500 });
        }
        return NextResponse.json({GlobalProductInfoResult,productColorsResult,productStockResult,imagesResult});
    }
}