import { cookies } from 'next/headers';
import { Session } from './types';
import { verifyTokenForEdge } from './lib/auth/verify';
import { prisma } from './db/prisma';

async function getAuthData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt')?.value;
    if (!token) throw new Error('Not authenticated');
    const decoded = await verifyTokenForEdge(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) throw new Error('Invalid token');
    return { user, token } as Session;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function auth(): Promise<Session | null> {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(getAuthData());
    }, 0)
  );
}

/*

export async function auth(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt')?.value;
    if (!token) throw new Error('Not authenticated');
    const decoded = await verifyTokenForEdge(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) throw new Error('Invalid token');
    return { user, token };
  } catch (error) {
    console.log(error);
    return null;
  }
}


import { API_URL } from './lib/constants';
import { formatApiError } from './lib/errors';
export async function auth(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get('jwt')?.value;
    if (!token) {
      return null;
    }
    const response = await fetch(`${API_URL}auth/verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    if (!response.ok) return null;

    const data: ApiSessionResponse = await response.json();
    const { user } = data.data;

    return {
      user,
      token,
    };
  } catch (error) {
    console.error('Auth verification failed:', error);
    return null;
  }
}*/
