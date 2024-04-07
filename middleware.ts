import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe', '/api/v1/insertImage', '/api/v1/getImages'],
  ignoredRoutes: ['/api/v1/insertImage', '/api/v1/getImages']
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};