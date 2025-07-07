export const dynamic = 'force-dynamic';
import { requireAdminOrAgent } from '@/auth-guard';
import MainPolicyForm from '@/components/shared/hotel/policies';
import { getServerOnboardHotelById } from '@/lib/actions/hotel.action';
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
  const { hotelId } = await params;
  await requireAdminOrAgent();
  const hotel = await getServerOnboardHotelById(hotelId);
  if (!hotel) notFound();

  return <MainPolicyForm hotelId={hotelId} policy={hotel.policies} />;
};

export default AgentPoliciesOnboardingPage;
