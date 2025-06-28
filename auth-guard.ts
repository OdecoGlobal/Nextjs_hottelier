import { auth } from '@/auth';
import { AdminAgentRole, Session, User } from '@/types';
import { notFound, redirect } from 'next/navigation';

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
export async function requireAdminOrAgent(param: string): Promise<Session> {
  const role = param.toUpperCase() as AdminAgentRole;
  const validRoles: AdminAgentRole[] = ['ADMIN', 'AGENT'];
  if (!validRoles.includes(role)) {
    notFound();
  }
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  if (session.user.role !== 'ADMIN' && session.user.role !== 'AGENT') {
    redirect('/unauthorized');
  }
  return session;
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
