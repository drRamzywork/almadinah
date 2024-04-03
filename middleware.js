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
      url.pathname = `/${localeCookie}${url.pathname}`;
      return NextResponse.redirect(url);
    }
  } else {

    // 
  }
}

export const config = {
  matcher: "*"
};
