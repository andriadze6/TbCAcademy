import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { type NextRequest } from 'next/server'
import { updateSession } from './app/lib/supaBase/middleware';
export default createMiddleware(routing);
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};



// export async function middleware(request: NextRequest) {
//   return await updateSession(request)
// }

// export const config2 = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }