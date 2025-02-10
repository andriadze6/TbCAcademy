import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server'


export async function POST(request:NextRequest){
    const formData = await request.formData();
    const data = JSON.parse(formData.get('data') as string)
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

    // Create HTTP-only cookies for access_token and refresh_token
    const response = NextResponse.json({ result });

    return response;
}