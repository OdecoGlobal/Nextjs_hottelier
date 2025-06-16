export const dynamic = 'force-dynamic';
import MainAmenitiesForm from '@/components/shared/hotel/amenities';

const OwnersAmenitiesPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  return <MainAmenitiesForm hotelId={hotelId} />;
};
export default OwnersAmenitiesPage;
