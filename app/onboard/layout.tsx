import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: `Onboarding | %s  `,
    default: APP_NAME,
  },
  description: 'Build an amazing experience with us',
};
export default function MainOnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </section>
  );
}
