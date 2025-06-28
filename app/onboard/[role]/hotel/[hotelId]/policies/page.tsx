export const dynamic = 'force-dynamic';
import { requireAdminOrAgent } from '@/auth-guard';
import MainPolicyForm from '@/components/shared/hotel/policies';
import { getHotelById } from '@/lib/actions/hotel.action';
import { AdminAgentRole } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Polices',
};
const AgentPoliciesOnboardingPage = async ({
  params,
}: {
  params: Promise<{ role: AdminAgentRole; hotelId: string }>;
}) => {
  const { hotelId, role } = await params;
  const session = await requireAdminOrAgent(role);
  const { hotel } = await getHotelById(hotelId);
  if (!hotel) notFound();

  return (
    <MainPolicyForm
      hotelId={hotelId}
      role={session.user.role as 'AGENT'}
      data={hotel.policies}
    />
  );
};

export default AgentPoliciesOnboardingPage;
