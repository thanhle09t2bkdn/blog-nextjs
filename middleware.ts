/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { pathnameUrl } from "./constants/pathname";
// import { getCurrentUserServer } from "./lib/servers/user.actions";
// import { Role } from "./types";

export async function middleware(request: NextRequest) {
  // const path = request.nextUrl.pathname;

  // const user = await getCurrentUserServer();
  // if (path.includes("/manage") && user?.role !== Role.Admin) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
