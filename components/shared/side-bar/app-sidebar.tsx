import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import MainSidebarNav, { SidebarNavType } from './main-nav';
import { NavUser } from './nav-menu';
import { APP_LOGO } from '@/lib/constants';

const AppSidebar = ({ items }: { items: SidebarNavType[] }) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Avatar>
          <AvatarImage src={APP_LOGO} />
          <AvatarFallback>FL</AvatarFallback>
        </Avatar>
      </SidebarHeader>
      <SidebarContent>
        <MainSidebarNav items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
