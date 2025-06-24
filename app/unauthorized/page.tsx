import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';
import { Lock, Home, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Unauthorized Access',
};

const Unauthorized = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center px-4">
      <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-full mb-6">
        <Lock className="h-12 w-12 text-red-600 dark:text-red-400" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-3">
        Access Restricted
      </h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        You don&apos;t have permission to view this page. Please contact your
        administrator if you believe this is an error.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </Button>
        <Button asChild>
          <Link href="/contact">
            <Mail className="mr-2 h-4 w-4" />
            Contact Support
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
