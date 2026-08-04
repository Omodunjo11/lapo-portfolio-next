import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isWarRoomProtected = createRouteMatcher([
  "/war-room(.*)",
  "/hub(.*)",
]);

const isPublicWarRoom = createRouteMatcher([
  "/war-room/sign-in(.*)",
  "/war-room/unauthorized",
]);

const clerkReady =
  Boolean(process.env.CLERK_SECRET_KEY) &&
  Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
  !String(process.env.CLERK_SECRET_KEY).includes("placeholder") &&
  !String(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY).includes("placeholder");

const handler = clerkMiddleware(async (auth, req) => {
  if (isWarRoomProtected(req) && !isPublicWarRoom(req)) {
    await auth.protect({
      unauthenticatedUrl: new URL("/war-room/sign-in", req.url).toString(),
    });
  }
});

export default function middleware(
  ...args: Parameters<typeof handler>
) {
  if (!clerkReady) {
    return NextResponse.next();
  }
  return handler(...args);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for Clerk's auto-proxy path
    "/__clerk/:path*",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
