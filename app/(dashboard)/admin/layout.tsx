import { Metadata } from 'next';

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
  return <main className="wrapper">{children}</main>;
}
