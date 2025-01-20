import Stripe from 'stripe';
import { createClient } from '../../lib/supaBase/server';
import { NextResponse } from 'next/server';

export  async function POST(request) {
    const supabase = await createClient();
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    let { data: users, error: userError } = await supabase.auth.signUp({
        email: email,
        password: password
      })
    if (userError) {
        return NextResponse.json({ error: userError.message }, { status: 500 });
    }
    return NextResponse.json(users);
}