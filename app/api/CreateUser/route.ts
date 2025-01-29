import { createClient } from '../../lib/supaBase/server';
import { createRouteHandlerClient } from '@supabase/ssr'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export  async function POST(request:NextRequest) {
    const url = new URL(request.url);
    const cookieStore  = cookies() ;
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    // const supabase = await createClient();

    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    let { data: users, error: userError } = await supabase.auth.signUp({
        email: email,
        password: password,
        option: {
            emailRedirectTo: url.origin
        }
      })
    if (userError) {
        return NextResponse.json({ error: userError.message }, { status: 500 });
    }
    return NextResponse.redirect(url.origin,{
        status: 301
    });
}