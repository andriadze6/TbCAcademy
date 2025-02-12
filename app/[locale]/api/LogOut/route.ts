import { createClient } from '../../lib/supaBase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const supabase = await createClient();

    // Logout from Supabase (invalidate session)
    await supabase.auth.signOut();

    // Clear authentication cookies
    const response = NextResponse.json({ message: "Logged out successfully" });

    return response;
}
