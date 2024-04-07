import { authMiddleware } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { defaultLocale, getLocale, locales } from "./lib/i18n";
 
export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe', '/api/v1/insertImage', '/api/v1/getImages'],
  ignoredRoutes: ['/api/v1/insertImage', '/api/v1/getImages']
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   if (pathname === "/favicon.ico" || pathname.startsWith("/api/")) {
//     return;
//   }

//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );

//   if (pathnameHasLocale) return;

//   const locale = getLocale({
//     "accept-language": request.headers.get("accept-language"),
//   });

//   request.nextUrl.pathname = `/${locale}${pathname}`;

//   return Response.redirect(request.nextUrl);
// }