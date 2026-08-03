import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isWarRoom = createRouteMatcher(["/war-room(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isWarRoom(req) && !req.nextUrl.pathname.startsWith("/war-room/sign-in")) {
    await auth.protect({
      unauthenticatedUrl: new URL("/war-room/sign-in", req.url).toString(),
    });
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
