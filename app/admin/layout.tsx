import { DynamicBreadcrumb } from '@/app/dynamic-breadcrumb';
import AppSidebar from '@/components/shared/side-bar/app-sidebar';
import { SidebarNavType } from '@/components/shared/side-bar/main-nav';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Home } from 'lucide-react';
import { Metadata } from 'next';

const AdminItems: SidebarNavType[] = [
  {
    url: '/admin',
    icon: Home,
    title: 'Home',
  },
];

export const metadata: Metadata = {
  title: {
    template: ` Admin | %s  `,
    default: 'Admin',
  },
};
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar items={AdminItems} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumb />
          </div>
        </header>
        <main className="wrapper">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
