import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server'


export async function POST(request:NextRequest){
    const data = await request.json();
    const supabase = await createClient();
    const { data:result, error } = await supabase
    .from('DeliveryAddress')
    .update({ first_Name: data.first_Name,
        last_Name:data.last_Name,
        phone:data.phone,
        city:data.city,
        region:data.region,
        street_Address:data.street_Address,
        apartment_Number:data.apartment_Number,
        zip_Code:data.zip_Code
     })
    .eq('id', data.id)
    .select()
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const response = NextResponse.json({ result });

    return response;
}