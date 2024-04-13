import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe',
    '/api/v1/getUserInfo', '/en'],

  afterAuth(auth, req, evt) {
    const { pathname } = req.nextUrl;
    // 路由请求可以通过，类似/en
    if (!pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    // if (!auth.userId && !auth.isPublicRoute) {
    //   if (auth.isApiRoute) {
    //     return NextResponse.json(
    //       { code: -2, message: "no auth" },
    //       { status: 401 }
    //     );
    //   } else {
    //     return NextResponse.redirect(new URL("/sign-in", req.url));
    //   }
    // }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)", "/"],
};