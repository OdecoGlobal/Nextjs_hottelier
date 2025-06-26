import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: `Onboarding | %s  `,
    default: 'Onboarding',
  },
};
export default function AgentOnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="min-h-screen">{children}</main>;
}
