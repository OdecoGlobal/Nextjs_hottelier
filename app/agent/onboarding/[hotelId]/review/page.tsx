import { requireAdminOrAgent } from '@/auth-guard';
import OnboardingReviewComponent from '@/components/shared/hotel/review';
import { getHotelById } from '@/lib/actions/hotel.action';
import { AdminAgentRole } from '@/types';
import { notFound } from 'next/navigation';

const OnboardingReviewPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const role = await requireAdminOrAgent();
  const { hotelId } = await params;
  const { hotel } = await getHotelById(hotelId);
  if (!hotel) notFound();
  return (
    <>
      <OnboardingReviewComponent
        hotel={hotel}
        role={role.user.role as AdminAgentRole}
      />
    </>
  );
};
export default OnboardingReviewPage;
