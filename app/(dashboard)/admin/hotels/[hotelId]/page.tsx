import AdminHotelDetailsComponent from '@/components/shared/admin/hotels/admin-hotel-details';

const AdminHotelDetailsPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;

  return <AdminHotelDetailsComponent hotelId={hotelId} />;
};
export default AdminHotelDetailsPage;
