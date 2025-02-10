import { createClient } from '../../../../utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userID } = body;
        const supabase = await createClient();
        let { data: DeliveryAddress, error } = await supabase
        .from('DeliveryAddress')
        .select("*")
        // Filters
        .eq('user_ID',  userID);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(DeliveryAddress);
    } catch (error) {
        console.log(error);
    }
}