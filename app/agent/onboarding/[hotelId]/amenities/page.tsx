export const dynamic = 'force-dynamic';
import { requireAgent } from '@/auth-guard';
import MainAmenitiesForm from '@/components/shared/hotel/amenities';
import { getHotelById } from '@/lib/actions/hotel.action';
import { notFound } from 'next/navigation';

const AgentAmenitiesPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  const agent = await requireAgent();
  const { hotel } = await getHotelById(hotelId);
  if (!hotel) notFound();

  return (
    <MainAmenitiesForm
      hotelId={hotelId}
      role={agent.user.role as 'AGENT'}
      hotelAmenities={hotel.amenities}
    />
  );
};
export default AgentAmenitiesPage;
