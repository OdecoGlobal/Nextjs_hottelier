import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-[calc(100vh-200px)]">
      <Loader2 className="h-12 w-12 animate-spin mb-4" />
      <p className="text-muted-foreground">Loading content...</p>
    </div>
  );
}
