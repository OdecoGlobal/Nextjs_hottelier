"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "@/lib/actions/auth.actions";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logOut();
    router.refresh();
  };
  return (
    <Button
      className="w-full py-4 px-2 h-4 justify-start"
      variant="ghost"
      onClick={handleLogout}
    >
      <LogOutIcon /> Log Out
    </Button>
  );
};

export default LogoutButton;
