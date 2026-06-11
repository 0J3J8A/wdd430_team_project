// src/proxy.ts
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME        = 'hh_session';
const PROTECTED_ROUTES   = ['/seller', '/account'];
const SELLER_ONLY_ROUTES = ['/seller'];
const AUTH_ROUTES        = ['/login', '/register'];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;

  let user: { role?: string; exp?: number } | null = null;
  if (sessionCookie) {
    try {
      const parts = sessionCookie.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(
          atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
        );
        if (payload.exp && payload.exp > Date.now()) {
          user = payload;
        }
      }
    } catch {
      // invalid token
    }
  }

  const isLoggedIn = !!user;
  const isSeller   = user?.role === 'seller';

  if (isLoggedIn && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isLoggedIn && PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && !isSeller && SELLER_ONLY_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};