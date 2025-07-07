import { requireAdminOrAgent } from '@/auth-guard';
import OnboardingReviewComponent from '@/components/shared/hotel/review';
import { getHotelById } from '@/lib/actions/hotel.action';
import { AdminAgentRole } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Review and submit',
};

const OnboardingReviewPage = async ({
  params,
}: {
  params: Promise<{ role: AdminAgentRole; hotelId: string }>;
}) => {
  const { hotelId, role } = await params;
  const session = await requireAdminOrAgent(role);
  const { hotel } = await getHotelById(hotelId);
  if (!hotel) notFound();
  return (
    <>
      <OnboardingReviewComponent
        hotel={hotel}
        role={session.user.role as AdminAgentRole}
      />
    </>
  );
};
export default OnboardingReviewPage;
