import { createClient } from '../../lib/supaBase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const supabase = await createClient();
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    let { data: session, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Create HTTP-only cookies for access_token and refresh_token
    const response = NextResponse.json({ user: session.user });

    // response.cookies.set("sb-access-token", session.session.access_token, {
    //     httpOnly: true, // Prevents JavaScript access (secure)
    //     secure: process.env.NODE_ENV === "production", // Secure in production
    //     path: "/",
    //     maxAge: session.session.expires_in, // Set expiry time
    // });

    // response.cookies.set("sb-refresh-token", session.session.refresh_token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     path: "/",
    //     maxAge: 60 * 60 * 24 * 30, // 30 days expiry
    // });

    return response;
}
