export const dynamic = 'force-dynamic';
import { requireOwner } from '@/auth-guard';
import MainPolicyForm from '@/components/shared/hotel/policies';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Polices',
};
const OwnerPoliciesOnboardingPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const owner = await requireOwner();
  if (!owner) redirect('/unauthorized');
  const { hotelId } = await params;
  return <MainPolicyForm hotelId={hotelId} role={owner.user.role as 'OWNER'} />;
};

export default OwnerPoliciesOnboardingPage;
