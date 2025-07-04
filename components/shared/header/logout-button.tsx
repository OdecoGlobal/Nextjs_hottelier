'use client';

import { Button } from '@/components/ui/button';
import { logOut } from '@/lib/actions/auth.actions';
import { useUserStore } from '@/stores/use-user-store';
import { Loader, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

const LogoutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { clearUser } = useUserStore.getState();
  const handleLogout = async () => {
    startTransition(async () => {
      await logOut();
      clearUser();
    });

    router.refresh();
  };
  return (
    <Button
      type="button"
      variant="ghost"
      disabled={isPending}
      onClick={handleLogout}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <LogOutIcon /> Log Out
        </>
      )}
    </Button>
  );
};

export default LogoutButton;
