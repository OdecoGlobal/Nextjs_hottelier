import { requireAgent } from '@/auth-guard';
import ShowRooms from '@/components/shared/rooms';
import { getHotelById } from '@/lib/actions/hotel.action';
import { notFound } from 'next/navigation';

const RatesAndAvailability = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  const agent = await requireAgent();
  const { hotel } = await getHotelById(hotelId);
  if (!hotel) {
    notFound();
  }
  const { rooms } = hotel;
  return (
    <ShowRooms
      role={agent.user.role as 'AGENT'}
      rooms={rooms}
      hotelId={hotelId}
    />
  );
};
export default RatesAndAvailability;
