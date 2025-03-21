import { createClient } from '../../../../utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export  async function POST(request:NextRequest) {
    const url = new URL(request.url);
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { data, error:userError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
    if (userError) {
        return NextResponse.json({ error: userError.message }, { status: 500 });
    }
    return NextResponse.redirect(url.origin,{
        status: 301
    });
}