import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
// import { defaultLocale, getLocale, locales } from "./lib/i18n";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "zh"],

  defaultLocale: "en",
});

export default authMiddleware({


  publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe', '/api/v1/getImages', '/api/v1/getImageDetailed',
    '/api/v1/getUserInfo'],

  afterAuth(auth, req, evt) {
    const { pathname } = req.nextUrl;
    // 路由请求可以通过，类似/en
    if (!pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    if (!auth.userId && !auth.isPublicRoute) {
      if (auth.isApiRoute) {
        return NextResponse.json(
          { code: -2, message: "no auth" },
          { status: 401 }
        );
      } else {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)", "/"],
};