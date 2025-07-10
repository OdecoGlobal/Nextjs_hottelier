import { requireAdminOrAgent } from '@/auth-guard';
import OnboardingReviewComponent from '@/components/shared/hotel/review';
import { getServerOnboardHotelById } from '@/lib/actions/hotel.action';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Review and submit',
};

const OnboardingReviewPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  await requireAdminOrAgent();
  const hotel = await getServerOnboardHotelById(hotelId);
  if (!hotel) notFound();
  return (
    <>
      <OnboardingReviewComponent hotelId={hotelId} />
    </>
  );
};
export default OnboardingReviewPage;
