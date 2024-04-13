import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { getUuid } from "./lib";
import { getLocale, locales } from "./lib/i18n";

export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe',
    '/api/v1/getUserInfo'],

  afterAuth(auth, req, evt) {

    const { pathname } = req.nextUrl;
    console.log('aa', pathname)
    if (pathname === "/favicon.ico" || pathname.startsWith("/api/")) {
      return;
    }
    if (pathname.includes("sign-in") || pathname.includes("sign-up") ) {
      return;
    }

    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/test/${locale}/`) || pathname === `/test/${locale}`
    );
    console.log('pathnameHasLocale', pathnameHasLocale)
    if (pathnameHasLocale) return;

    const locale = getLocale({
      "accept-language": req.headers.get("accept-language"),
    });
    console.log('hhh')
    req.nextUrl.pathname = `/test/${locale}${pathname}`;

    return Response.redirect(req.nextUrl);
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};