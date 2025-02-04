import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware';
export default createMiddleware(routing);
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ka|en)/:path*', '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',]
};
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}