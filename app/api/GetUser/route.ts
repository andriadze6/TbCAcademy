import { createClient } from '../../lib/supaBase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const supabase = await createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    return NextResponse.json( user );
}
