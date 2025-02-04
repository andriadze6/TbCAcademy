import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server';
import { createClient } from '../../../utils/supabase/server'

export async function POST(request) {
    const supabase = await createClient();
    const { email, password } = await request.json(); // Parse JSON body

    let { data: session, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Create HTTP-only cookies for access_token and refresh_token
    const response = NextResponse.json({ user: session.user });

    return response;
}
