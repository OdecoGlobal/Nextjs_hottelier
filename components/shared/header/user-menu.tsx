import { auth } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Hotel, LayoutDashboard, UserCircle, UserIcon } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from './logout-button';

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button asChild>
        <Link href="/login">
          <UserIcon /> Login
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user.userName.charAt(0).toUpperCase() ?? 'O';

  return (
    <nav className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar>
            <AvatarImage src="/" />
            <AvatarFallback>{firstInitial}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.userName}
              </p>
              <p className="text-sm text-muted-foreground leading-none">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <Link href="/user/profile" className="w-full flex-start gap-2">
              <UserCircle /> User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/user/bookings" className="w-full flex-start gap-2">
              <Hotel />
              Bookings
            </Link>
          </DropdownMenuItem>

          {session.user.role === 'ADMIN' && (
            <DropdownMenuItem>
              <Link href="/admin" className="w-full flex-start gap-2">
                <LayoutDashboard /> Dashboard
              </Link>
            </DropdownMenuItem>
          )}

          {session.user.role === 'OWNER' && (
            <DropdownMenuItem>
              <Link href="/owner" className="w-full flex-start gap-2">
                <LayoutDashboard /> Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default UserButton;
