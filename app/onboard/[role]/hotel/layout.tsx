import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: `Onboarding | %s  `,
    default: 'Onboarding',
  },
  description: 'Build an amazing experience with us',
};
export default function AgentOnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="min-h-screen">{children}</main>;
}
