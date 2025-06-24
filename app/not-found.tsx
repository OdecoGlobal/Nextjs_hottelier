import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Compass, Home } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="flex flex-col items-center max-w-md w-full">
        <div className="flex items-center gap-3 mb-8">
          <Image
            src="/images/logo.svg"
            width={40}
            height={40}
            alt="logo"
            priority={true}
            className="h-10 w-10"
          />
          <h1 className="text-xl font-semibold">{APP_NAME}</h1>
        </div>

        <div className="w-full p-8 rounded-xl border bg-card text-card-foreground shadow-sm text-center space-y-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <Compass className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Page Not Found
            </h2>
            <p className="text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or may have
              been moved.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/support">Get Help</Link>
            </Button>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Error 404 · {new Date().getFullYear()} {APP_NAME}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
