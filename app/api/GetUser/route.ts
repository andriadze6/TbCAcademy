import { createClient } from '../../lib/supaBase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const supabase = await createClient();
    const { data: user, error } = await supabase.auth.getUser();

    return NextResponse.json( user );
}
