import { NextResponse, type NextRequest } from "next/server";

const authCookie = "sos_demo_user";
const publicRoutes = new Set(["/", "/auth/login", "/auth/register"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.has(pathname);
  const isAuthenticated = Boolean(request.cookies.get(authCookie)?.value);

  if (isPublicRoute || isAuthenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"]
};
