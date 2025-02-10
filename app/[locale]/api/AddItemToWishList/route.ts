import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server'

export async function POST(request:NextRequest){
    const formData = await request.formData();
    const user_ID = formData.get("user_ID") as string;
    const product_ID = formData.get('product_ID') as string;
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('WishList')
    .insert([
      { user_ID: user_ID, product_ID: product_ID },
    ])
    .select()
  
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const response = NextResponse.json("Address was deleted");

    return response;
}