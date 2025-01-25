import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'




// Custom function to detect locale
function getLocale(request: NextRequest): string {
  const locale = request.cookies.get('NEXT_LOCALE')?.value; // Check locale cookie set by next-intl
  if (locale) return locale;

  // Default to the first segment of the pathname (e.g., '/en' or '/fr')
  const pathnameLocale = request.nextUrl.pathname.split('/')[1];
  if (pathnameLocale && ['en', 'ka'].includes(pathnameLocale)) return pathnameLocale;

  return 'en'; // Default locale
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

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

  // const role = user.user_metadata?.role || 'guest'
  // if (
  //   !user && role !== 'admin' &&
  //   request.nextUrl.pathname.startsWith(`/${locale}/Login`) && 
  //   request.nextUrl.pathname.startsWith(`/${locale}/auth`)
  // ) {
  //   // no user, respond by redirecting the user to the language-specific login page
  //   const url = request.nextUrl.clone();
  //   url.pathname = `/${locale}/Login`; // Redirect to localized Login page
  //   return NextResponse.redirect(url);
  // }

  return supabaseResponse;
}
