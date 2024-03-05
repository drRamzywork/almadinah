import { NextResponse } from "next/server";

export function middleware(request) {
  let response = NextResponse.next();

  // Try to get the locale from the cookie first
  const cookieLocale = request.cookies.get("NEXT_LOCALE");
  if (cookieLocale) {
    response = NextResponse.rewrite(
      `/${cookieLocale}${request.nextUrl.pathname}`
    );
  } else {
    // If not found in cookies, check for a saved value in the session
    // Note: Actual session handling for locale needs to be implemented based on your session management solution
    // This is a placeholder to indicate where to insert such logic
    // const sessionLocale = getSessionLocaleSomehow();
    // if (sessionLocale) {
    //   response = NextResponse.rewrite(`/${sessionLocale}${request.nextUrl.pathname}`);
    // }
  }

  return response;
}
