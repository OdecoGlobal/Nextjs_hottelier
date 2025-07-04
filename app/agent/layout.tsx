import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: `Agent | %s  `,
    default: 'Home',
  },
};
export default function MainAgentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
