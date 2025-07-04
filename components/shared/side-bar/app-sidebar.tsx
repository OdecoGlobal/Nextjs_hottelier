import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import MainSidebarNav from './main-nav';
import { Home } from 'lucide-react';
import { NavUser } from './nav-menu';
import { APP_LOGO } from '@/lib/constants';
import { ModeToggle } from '../header/mode-toggle';
const AdminItems = [
  {
    url: '/admin',
    icon: Home,
    title: 'Home',
  },
];

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Avatar>
          <AvatarImage src={APP_LOGO} />
          <AvatarFallback>FL</AvatarFallback>
        </Avatar>
      </SidebarHeader>
      <SidebarContent>
        <MainSidebarNav items={AdminItems} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
