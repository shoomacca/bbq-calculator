import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Paths that do not require login
  const isPublicPath =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/uploads') ||
    pathname.includes('.') || // Matches files like favicon.ico, images, .apk
    pathname === '/favicon.ico' ||
    pathname === '/rough-cut-bbq-debug.apk';

  if (!token && !isPublicPath) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to calculator if logged-in user visits root page
  if (token && pathname === '/') {
    return NextResponse.redirect(new URL('/calculator', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all paths except static assets
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
