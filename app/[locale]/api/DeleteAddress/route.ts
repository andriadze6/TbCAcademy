import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server'

export async function POST(request:NextRequest){
    const formData = await request.formData();
    const addressId = formData.get('ID') as string
    const supabase = await createClient();
    const { error } = await supabase
    .from('DeliveryAddress')
    .delete()
    .eq('id',addressId)
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const response = NextResponse.json("Address was deleted");

    return response;
}