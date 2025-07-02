export const dynamic = 'force-dynamic';
import HotelListingComponents from '@/components/shared/admin/hotels/hotel-list';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Hotels',
};

const AdminHotelPage = async () => {
  return <HotelListingComponents />;
};

export default AdminHotelPage;
