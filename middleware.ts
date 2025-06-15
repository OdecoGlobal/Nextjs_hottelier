import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenForEdge } from './lib/auth/verify';
import { cookies } from 'next/headers';

// Modify to the current paths
const protectedPaths = [
  /\/payment-method/,
  /\/profile/,
  /\/user\/(.*)/,
  /\/admin/,
  /\/owner\/(.*)/,
];

const adminPaths = [/\/admin/];
const ownerPaths = [/\/owner/];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = protectedPaths.some(path => path.test(pathname));

  if (!isProtected) {
    return NextResponse.next();
  }

  // const session = await auth();
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt')?.value;
  if (!token) throw new Error('User not authenticated');
  const decoded = await verifyTokenForEdge(token);

  if (!decoded) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (adminPaths.some(path => path.test(pathname))) {
    if (decoded.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }
  if (ownerPaths.some(path => path.test(pathname))) {
    if (decoded.role !== 'OWNER') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|signup|public).*)',
  ],
};
