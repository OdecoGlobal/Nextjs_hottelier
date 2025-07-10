export const dynamic = 'force-dynamic';
import { requireAdminOrAgent } from '@/auth-guard';
import MainAmenitiesForm from '@/components/shared/hotel/amenities';
import { getServerOnboardHotelById } from '@/lib/actions/hotel.action';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Hotel Amenities',
};

const AgentAmenitiesPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  await requireAdminOrAgent();

  const hotel = await getServerOnboardHotelById(hotelId);
  if (!hotel) notFound();

  return (
    <MainAmenitiesForm hotelId={hotelId} hotelAmenities={hotel.amenities} />
  );
};
export default AgentAmenitiesPage;
