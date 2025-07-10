import { cookies } from 'next/headers';
import { Session } from './types';
import { verifyTokenForEdge } from './lib/auth/verify';
import { prisma } from './db/prisma';

export async function auth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt')?.value;
    if (!token) throw new Error('unauthenticated');
    const decoded = await verifyTokenForEdge(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) throw new Error('invalid');
    return { user, token } as Session;
  } catch {
    return null;
  }
}
