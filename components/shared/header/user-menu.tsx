import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Hotel, LayoutDashboard, LogIn, Plus, UserCircle } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from './logout-button';
import { ModeToggle } from '../mode-toogle';
import { getCurrentUser } from '@/auth-guard';

const UserButton = async () => {
  const user = await getCurrentUser();

  const firstInitial = user.userName.charAt(0).toUpperCase() ?? 'O';

  return (
    <nav className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar>
            <AvatarImage src="/" />
            <AvatarFallback>{firstInitial}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.userName}
              </p>
              <p className="text-sm text-muted-foreground leading-none">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <ModeToggle />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {user && (
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/#user/profile" className="w-full flex-start gap-2">
                  <UserCircle /> User Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/#user/bookings"
                  className="w-full flex-start gap-2"
                >
                  <Hotel />
                  Bookings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/onboard" className="w-full flex-start gap-2">
                  <Plus />
                  List Your Hotel
                </Link>
              </DropdownMenuItem>

              {user.role === 'ADMIN' && (
                <DropdownMenuItem>
                  <Link href="/admin" className="w-full flex-start gap-2">
                    <LayoutDashboard /> Dashboard
                  </Link>
                </DropdownMenuItem>
              )}

              {user.role === 'AGENT' && (
                <DropdownMenuItem>
                  <Link href="/agent" className="w-full flex-start gap-2">
                    <LayoutDashboard /> Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {user ? (
              <LogoutButton />
            ) : (
              <Link href="/login">
                <LogIn /> Login
              </Link>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default UserButton;
