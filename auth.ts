import { cookies } from 'next/headers';
import { ApiSessionResponse, Session } from './types';

import { API_URL } from './lib/constants';

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
}

// export async function auth() {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get('jwt')?.value;
//     if (!token) throw new Error('Not authenticated');
//     const decoded = await verifyToken(token, process.env.JWT_SECRET!);
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.id },
//     });
//     if (!user) throw new Error('Invalid token');
//     return { success: true, session: { user, token } };
//   } catch (error) {
//     console.log(error);
//     return { success: false, session: null, error: formatApiError(error) };
//   }
// }
