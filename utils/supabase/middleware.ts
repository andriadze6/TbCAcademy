import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware';

// Custom function to detect locale
function getLocale(request: NextRequest): string {
  const locale = request.cookies.get('NEXT_LOCALE')?.value; // Check locale cookie set by next-intl
  if (locale) return locale;

  // Default to the first segment of the pathname (e.g., '/en' or '/ka')
  const pathnameLocale = request.nextUrl.pathname.split('/')[1];
  if (pathnameLocale && ['en', 'ka'].includes(pathnameLocale)) return pathnameLocale;

  return 'en'; // Default locale
}
  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'ka'],
    defaultLocale: 'en'
  });
export async function updateSession(request: NextRequest) {
  let supabaseResponse = handleI18nRouting(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and supabase.auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check the locale from the request
  const locale = getLocale(request);
  const role = user?.user_metadata?.role || 'guest';

  // Redirect to the login page if the user is not authenticated and tries to access the AdminPanel
  if (!user && role !== 'admin' && request.nextUrl.pathname.endsWith(`/AdminPanel`) ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/Login`; // Redirect to localized Login page
    return NextResponse.redirect(url);
  }

  // Redirect the root path `/` to the localized homepage
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`; // Redirect to localized homepage
    return NextResponse.redirect(url);
  }

  // If the user is authenticated and tries to access the Login page, prevent navigation
  if (user && request.nextUrl.pathname.endsWith(`/Login`)) {
    return NextResponse.redirect(new URL(request.headers.get("referer") || `/${locale}`, request.url));
  }

  if (!user &&  request.nextUrl.pathname.endsWith(`/MyAccount`) ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/Login`; // Redirect to localized Login page
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
