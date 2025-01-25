import { createClient } from '../../lib/supaBase/server';
import { NextResponse } from 'next/server';

export  async function POST(request) {
    debugger
    const supabase = await createClient();
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    let { data:user1, error: userError, } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      const { data: { user } } = await supabase.auth.getUser()
    if (userError) {
        return NextResponse.json({ error: userError.message }, { status: 500 });
    }
    return NextResponse.json(user1);
}