import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { type NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Update Supabase session
  let res =   await updateSession(request);

  // Apply next-intl middleware and return response
  return res;
}

export const config = {
  matcher: [
    '/', 
    '/(ka|en)/:path*', 
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ],
};
