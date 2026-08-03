import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isWarRoom = createRouteMatcher(["/war-room(.*)"]);

const clerkReady =
  Boolean(process.env.CLERK_SECRET_KEY) &&
  Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
  !String(process.env.CLERK_SECRET_KEY).includes("placeholder") &&
  !String(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY).includes("placeholder");

const clerkHandler = clerkMiddleware(async (auth, req) => {
  // Only protect war-room when Clerk is configured
  if (
    isWarRoom(req) &&
    !req.nextUrl.pathname.startsWith("/war-room/sign-in") &&
    !req.nextUrl.pathname.startsWith("/war-room/unauthorized")
  ) {
    await auth.protect({
      unauthenticatedUrl: new URL("/war-room/sign-in", req.url).toString(),
    });
  }
});

export default function middleware(
  ...args: Parameters<typeof clerkHandler>
) {
  if (!clerkReady) {
    return NextResponse.next();
  }
  return clerkHandler(...args);
}

export const config = {
  matcher: [
    // Narrow matcher: skip static assets. War-room auth only needs app routes.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
