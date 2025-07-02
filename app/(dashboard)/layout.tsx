import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: ` | %s  `,
    default: 'Dasboard',
  },
};
export default function MainDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="wrapper">{children}</main>;
}
