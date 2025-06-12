import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: `Onboarding | %s  `,
    default: 'Onboarding',
  },
};
export default function OwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="border border-purple-400 min-h-screen">{children}</main>
  );
}
