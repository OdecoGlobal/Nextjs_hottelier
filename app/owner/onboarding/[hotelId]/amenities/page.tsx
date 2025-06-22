export const dynamic = 'force-dynamic';
import { requireOwner } from '@/auth-guard';
import MainAmenitiesForm from '@/components/shared/hotel/amenities';
import { getHotelById } from '@/lib/actions/hotel.action';
import { notFound } from 'next/navigation';

const OwnersAmenitiesPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  const owner = await requireOwner();
  const { hotel } = await getHotelById(hotelId);
  if (!hotel) notFound();

  return (
    <MainAmenitiesForm
      hotelId={hotelId}
      role={owner.user.role as 'OWNER'}
      hotelAmenities={hotel.amenities}
    />
  );
};
export default OwnersAmenitiesPage;
