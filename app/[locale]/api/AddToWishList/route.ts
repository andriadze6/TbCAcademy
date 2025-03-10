import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server'

export async function POST(request:NextRequest){

    const body = await request.json();
    const{ user_ID, product_ID, color_ID, productStockID, amount} = body;
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('WishList')
    .insert([
      { user_ID: user_ID, product_ID: product_ID, color_ID: color_ID, productStockID: productStockID, amount: amount},
    ])
    .select("id");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const response = NextResponse.json({id: data[0].id});

    return response;
}