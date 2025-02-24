import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server'

export async function POST(request:NextRequest){
    const { ID } = await request.json();
    const supabase = await createClient();
    const { error } = await supabase
    .from('Cart')
    .delete()
    .eq('id',ID)
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const response = NextResponse.json(true);

    return response;
}