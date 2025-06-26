export const dynamic = 'force-dynamic';
import { requireAgent } from '@/auth-guard';
import MainPolicyForm from '@/components/shared/hotel/policies';
import { getHotelById } from '@/lib/actions/hotel.action';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Polices',
};
const AgentPoliciesOnboardingPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const agent = await requireAgent();
  const { hotelId } = await params;
  const { hotel } = await getHotelById(hotelId);
  if (!hotel) notFound();

  return (
    <MainPolicyForm
      hotelId={hotelId}
      role={agent.user.role as 'AGENT'}
      data={hotel.policies}
    />
  );
};

export default AgentPoliciesOnboardingPage;
