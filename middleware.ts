import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { getUuid } from "./lib";
import { getLocale, locales } from "./lib/i18n";

export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe',
    '/api/v1/getUserInfo', '/en', '/zh'],

  afterAuth(auth, req, evt) {

    const { pathname } = req.nextUrl;
    
    const uuid = getUuid()
    console.log(uuid + 'reqname为' + pathname)

    if (pathname === "/favicon.ico" || pathname.startsWith("/api/")) {
      return;
    }
    if (pathname.includes("sign-in") || pathname.includes("sign-up") ) {
      return;
    }

    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    console.log(uuid + 'pathnameHasLocale为' + pathnameHasLocale)
    if (pathnameHasLocale) return;

    const locale = getLocale({
      "accept-language": req.headers.get("accept-language"),
    });

    console.log(uuid + 'nextReq为' + `/${locale}${pathname}`)
    
    req.nextUrl.pathname = `/${locale}${pathname}`;

    return Response.redirect(req.nextUrl);
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)", "/en"],
};