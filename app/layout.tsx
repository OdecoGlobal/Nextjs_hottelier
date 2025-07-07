import type { Metadata } from 'next';
import { Roboto_Condensed, Roboto } from 'next/font/google';
import './globals.css';
import { Toaster as OToaster } from '@/components/ui/toaster';
import { Toaster } from '@/components/ui/sonner';
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from '@/lib/constants';
import { ThemeProvider } from '@/providers/theme-provider';
import TanstackProvider from '@/providers/tanstack-provider';
import UserHydrator from '@/components/user-hydrator';

const robotoSans = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin'],
});

const robotoMono = Roboto_Condensed({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function MainRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider>
            <UserHydrator />
            <Toaster
              richColors
              position="top-center"
              toastOptions={{
                classNames: {
                  // toast: baseStyle,
                  success: 'bg-green-100 text-green-900',
                  error: 'bg-red-100 text-red-900',
                  warning: 'bg-yellow-100 text-yellow-900',
                  info: 'bg-blue-100 text-blue-900',
                },
              }}
            />
            <OToaster />
            {children}
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
