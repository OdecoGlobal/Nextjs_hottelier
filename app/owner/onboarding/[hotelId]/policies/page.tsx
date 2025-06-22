export const dynamic = 'force-dynamic';
import { requireOwner } from '@/auth-guard';
import MainPolicyForm from '@/components/shared/hotel/policies';
import { getHotelById } from '@/lib/actions/hotel.action';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Polices',
};
const OwnerPoliciesOnboardingPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const owner = await requireOwner();
  const { hotelId } = await params;
  const { hotel } = await getHotelById(hotelId);
  if (!hotel) notFound();

  return (
    <MainPolicyForm
      hotelId={hotelId}
      role={owner.user.role as 'OWNER'}
      data={hotel.policies}
    />
  );
};

export default OwnerPoliciesOnboardingPage;
