import { createClient } from '../../../../utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const supabase = await createClient();

    const user_ID= formData.get('userID') as string;
    const first_Name = formData.get('first_Name') as string;
    const last_Name = formData.get('last_Name') as string;
    const phone = formData.get('phone') as string;
    const city = formData.get('city') as string;
    const region = formData.get('region') as string;
    const street_Address = formData.get('street_Address') as string;
    const apartment_Number = formData.get('apartment_Number') as string;
    const zip_Code = formData.get('zip_Code') as string;


    const { data, error } = await supabase
    .from('DeliveryAddress')
    .insert([
      { user_ID: user_ID,
        first_Name: first_Name,
        last_Name: last_Name,
        phone: phone,
        city: city,
        region: region,
        street_Address: street_Address,
        apartment_Number: apartment_Number,
        zip_Code: zip_Code
    },
    ])
    .select()
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}