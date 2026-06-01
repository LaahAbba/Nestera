import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
 
// This function can be marked `async` if using `fetch` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Define the locales that are supported
  const locales = ["en", "es"];
  
  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;
  
  // Redirect if there's no locale
  const locale = request.headers.get("accept-language")?.split(",")[0] || "en";
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl);
}
 
export const config = {
  matcher: [
    // Match all pathnames except for:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|ico)$).*)",
  ],
};