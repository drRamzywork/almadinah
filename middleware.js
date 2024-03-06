// middleware.js (using JavaScript)
import { NextResponse } from "next/server";

export function middleware(request) {
  const defaultLocale = "ar"; // Your default locale
  const localeCookie = request.cookies.get("NEXT_LOCALE"); // Assuming the cookie name is 'NEXT_LOCALE'

  if (localeCookie) {
    const url = request.nextUrl.clone();
    if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/api")) {
      // Don't redirect API requests and Next.js specific paths
      return;
    }

    if (!url.pathname.startsWith(`/${localeCookie}`)) {
      // Redirect to the locale specified in the cookie if it's not already in the path
      url.pathname = `/${localeCookie}${url.pathname}`;
      return NextResponse.redirect(url);
    }
  } else {
    // If there's no cookie, you might decide to do nothing, redirect to the default locale, or handle it in another way
    // This is optional and depends on your application's requirements
  }
}

export const config = {
  matcher: "*", // Adjust this matcher to specify paths the middleware should apply to
};
