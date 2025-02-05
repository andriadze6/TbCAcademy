import { createClient } from '../../../../utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const supabase = await createClient();
    let  user_ID = formData.get('userID') as string;
    let { data: DeliveryAddress, error } = await supabase
    .from('DeliveryAddress')
    .select("*")
    // Filters
    .eq('user_ID',  user_ID);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(DeliveryAddress);
}