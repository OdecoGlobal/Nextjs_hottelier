export const dynamic = 'force-dynamic';
import HotelListingComponents from '@/components/shared/admin/hotels/hotel-list';
import { getOnboardHotels } from '@/lib/actions/hotel.action';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Hotels',
};

const AdminHotelPage = async () => {
  const { data } = await getOnboardHotels();
  return <HotelListingComponents hotels={data} />;
};

export default AdminHotelPage;
