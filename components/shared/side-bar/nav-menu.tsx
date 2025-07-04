'use client';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Hotel,
  Loader,
  LogIn,
} from 'lucide-react';

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
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useUserStore } from '@/stores/use-user-store';
import Link from 'next/link';
import LogoutButton from '../header/logout-button';
import { SidebarModeToggle } from './sidebar-mode-toogle';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, loading } = useUserStore();
  const userLoaded = !loading && !!user;
  const image =
    userLoaded && user.image ? user?.image : 'https://github.com/shadcn.png';
  const email = userLoaded ? user.email : '';
  const userName = userLoaded ? user.userName : 'user';
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={image} alt={userName} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userName}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={image} alt={userName} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userName}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <SidebarModeToggle />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {userLoaded ? (
                <>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="#/user/account">
                      <BadgeCheck />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="#/user/bookings">
                      <Hotel />
                      Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <Loader className="w-4 h-4 animate-spin" />
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              {userLoaded ? (
                <LogoutButton />
              ) : loading ? (
                <DropdownMenuItem>
                  <Loader className="w-4 h-4 animate-spin" />
                </DropdownMenuItem>
              ) : (
                <Link href="/login">
                  <LogIn /> Login
                </Link>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
