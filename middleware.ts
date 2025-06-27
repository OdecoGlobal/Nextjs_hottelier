import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenForEdge } from './lib/auth/verify';
import { cookies } from 'next/headers';
import { getClientIp } from './utils/get-client-ip';
import { rateLimit } from './lib/rate-limit';

// Modify to the current paths
const protectedPaths = [
  /\/payment-method/,
  /\/profile/,
  /\/user\/(.*)/,
  /\/admin/,
  /\/agent\/(.*)/,
];

const adminPaths = [/\/admin/];
const agentPaths = [/\/agent/];
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 100;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = protectedPaths.some(path => path.test(pathname));

  if (pathname.startsWith('/api')) {
    const ip = getClientIp(req);
    try {
      await rateLimit(ip, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS);
    } catch {
      return NextResponse.json(
        { message: 'Rate limit exceeded' },
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': `${Math.floor(RATE_LIMIT_WINDOW_MS / 1000)}`,
          },
        },
      );
    }
  }

  if (!isProtected) {
    return NextResponse.next();
  }

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
  if (agentPaths.some(path => path.test(pathname))) {
    if (decoded.role !== 'AGENT') {
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
