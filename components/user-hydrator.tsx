'use client';
// import { verifyUser } from '@/lib/actions/auth.actions';
import { API_CACHE_TIMEOUT } from '@/lib/constants';
import { fetchClient } from '@/lib/fetch/client';
import { useUserStore } from '@/stores/use-user-store';
import { User } from '@/types';
import { useEffect } from 'react';

const UserHydrator = () => {
  const { setUser, clearUser, setLoading } = useUserStore();
  useEffect(() => {
    let isMounted = true;
    const hydrateUser = async () => {
      try {
        console.log();
        setLoading(true);
        const res = await fetchClient.get('auth/verify', {
          cache: 'force-cache',
          next: {
            revalidate: API_CACHE_TIMEOUT,
            tags: ['verify-user'],
          },
        });
        const { user }: { user: User } = res.data;

        if (!isMounted) return;
        if (res) setUser(user);
      } catch {
        if (isMounted) clearUser();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    hydrateUser();

    return () => {
      isMounted = false;
    };
  }, [clearUser, setUser, setLoading]);
  return null;
};

export default UserHydrator;
