'use client';
import { verifyUser } from '@/lib/actions/auth.actions';
import { useUserStore } from '@/stores/use-user-store';
import { useEffect } from 'react';

const UserHydrator = () => {
  const { setUser, clearUser, setLoading } = useUserStore();
  useEffect(() => {
    let isMounted = true;
    const hydrateUser = async () => {
      try {
        setLoading(true);
        const res = await verifyUser();
        if (!isMounted) return;
        if (res) setUser(res);
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
