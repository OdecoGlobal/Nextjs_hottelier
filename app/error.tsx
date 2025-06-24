'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center px-4">
      <div className="bg-amber-100 dark:bg-amber-900/30 p-6 rounded-full mb-6">
        <AlertTriangle className="h-12 w-12 text-amber-600 dark:text-amber-400" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-3">
        Something Went Wrong
      </h1>
      <p className="text-lg text-muted-foreground max-w-md mb-6">
        We encountered an unexpected error. Our team has been notified and
        we&apos;re working on a fix.
      </p>
      <div className="mb-8 p-4 bg-muted rounded-lg text-sm">
        <code className="text-destructive">{error.message}</code>
      </div>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button variant="outline" onClick={() => router.push('/')}>
          <Home className="mr-2 h-4 w-4" />
          Return Home
        </Button>
      </div>
    </div>
  );
}
