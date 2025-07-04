import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: ` Dashboard | %s  `,
    default: 'Dasboard',
  },
};
export default function MainDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
