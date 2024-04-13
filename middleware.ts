import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { getUuid } from "./lib";
import { getLocale, locales } from "./lib/i18n";

// export default function middleware(req: NextRequest) {
  
// }

export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks/clerk',
    '/api/v1/getUserInfo'],

  afterAuth(auth, req, evt) {
    return;

    // const { pathname } = req.nextUrl;
    // if (pathname === "/favicon.ico" || pathname.startsWith("/api/")) {
    //   return;
    // }
    // if (pathname.includes("sign-in") || pathname.includes("sign-up") ) {
    //   return;
    // }

    // const pathnameHasLocale = locales.some(
    //   (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    // );
    // if (pathnameHasLocale) {
    //   return ;
    // }

  //   const locale = getLocale({
  //     "accept-language": req.headers.get("accept-language"),
  //   });
  //   req.nextUrl.pathname = `/${locale}${pathname}`;

    // return Response.redirect(req.nextUrl);
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};