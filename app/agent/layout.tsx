import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: `Onboarding | %s  `,
    default: 'Onboarding',
  },
};
export default function MainAgentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
