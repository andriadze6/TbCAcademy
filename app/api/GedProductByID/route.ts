import { createClient } from '../../lib/supaBase/server'
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { productDetailedType,GlobalProductInfoType, productColorsType, productStockType} from '../../Type/type'

/**
 * POST method to handle adding a product
 * @param {Request} req
 * @returns {Response}
 */

export async function POST(request: NextRequest) {
    try{
        let catalogArray = new Array<productDetailedType>();
        let globalInfo = {} as  GlobalProductInfoType;
        const supabase = await createClient();
        const formData = await request.formData();
        const id = formData.get('id') as string;
        const { data:GlobalProductInfo, error:globalInfoError } = await supabase.from('GlobalProductInfo').select('*').eq('product_id', id);
        if (globalInfoError) {
            return NextResponse.json({ error: globalInfoError.message }, { status: 500 });
        }
        globalInfo = GlobalProductInfo[0];

        let { data: productColors, error } = await supabase
        .from('productColors')
        .select('*')
        .eq('product_id', id);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        for (let i = 0; i < productColors.length; i++) {
            let  currentProductColor = productColors[i] as productColorsType;
            let { data: productStock, error:productStockError } = await supabase
                .from('productStock')
                .select("*")
                // Filters
                .eq('product_colorID', currentProductColor.productColorID);
            if (productStockError) {
                return NextResponse.json({ error: productStockError.message }, { status: 500 });
            }
            let currentSize = productStock as productStockType[];

            let { data: Images, error:imagesError } = await supabase
                .from('Images')
                .select('imageURL')
                .eq("productColorID", currentProductColor.productColorID);
            if (imagesError) {
                return NextResponse.json({ error: imagesError.message }, { status: 500 });
            }
            let currentImage = JSON.parse(JSON.stringify(Images)) as string[];
            catalogArray.push({
                productColors: currentProductColor,
                productStock: currentSize,
                Image: currentImage
            })
        }
        return NextResponse.json(catalogArray);
    }
    catch(error){
        console.log(error)
    }
}