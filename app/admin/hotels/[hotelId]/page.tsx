import AdminHotelDetailsComponent from '@/components/shared/admin/hotels/admin-hotel-details';
import { getServerOnboardHotelById } from '@/lib/actions/hotel.action';
import { notFound } from 'next/navigation';

const AdminHotelDetailsPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  const hotel = await getServerOnboardHotelById(hotelId);
  if (!hotel) {
    notFound();
  }

  return <AdminHotelDetailsComponent hotelId={hotelId} />;
};
export default AdminHotelDetailsPage;
