import { createClient } from '../../lib/supaBase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const supabase = await createClient();

    // Logout from Supabase (invalidate session)
    await supabase.auth.signOut();

    // Clear authentication cookies
    const response = NextResponse.json({ message: "Logged out successfully" });

    response.cookies.set("sb-access-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0, // Expire the cookie immediately
    });

    response.cookies.set("sb-refresh-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0, // Expire the cookie immediately
    });

    return response;
}
