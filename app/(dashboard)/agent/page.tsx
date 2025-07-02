export const dynamic = 'force-dynamic';
import { requireAgent } from '@/auth-guard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { redirect } from 'next/navigation';

const AgentsHomePage = async () => {
  const session = await requireAgent();
  if (!session) redirect('/unauthorized');
  return (
    <div>
      <Button>
        <Plus className="flex gap-2 items-center" />
        <Link href="/agent/onboarding">Create New Hotel</Link>
      </Button>
    </div>
  );
};

export default AgentsHomePage;
