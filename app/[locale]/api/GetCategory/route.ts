import { createClient } from '../../../../utils/supabase/server';
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

/**
 * POST method to handle adding a product
 * @param {Request} req
 * @returns {Response}
 */
export async function POST(request: NextRequest) {
    try{
        const supabase = await createClient();
        const formData = await request.formData();
        const gender = formData.get('gender') as string;
        const { data, error } = await supabase.from('category').select('*').eq('gender', gender);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data);
    }
    catch(error){
        console.log(error)
    }
}