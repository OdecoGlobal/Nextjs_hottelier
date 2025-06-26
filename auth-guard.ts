import { auth } from '@/auth';
import { Session, User } from '@/types';
import { redirect } from 'next/navigation';

export async function requireAuth(): Promise<Session> {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  return session;
}

export async function requireAdmin(): Promise<Session> {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  if (session.user.role !== 'ADMIN') {
    redirect('/unauthorized');
  }
  return session as Session & { user: { role: 'ADMIN' } };
}

export async function requireAgent(): Promise<Session> {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  if (session.user.role !== 'AGENT') {
    redirect('/unauthorized');
  }
  return session as Session & { user: { role: 'AGENT' } };
}

export async function hasRole(role: User['role']): Promise<boolean> {
  const session = await auth();
  return session?.user?.role === role;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await auth();
  return !!session;
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await auth();
  return session?.user || null;
}
