import { requireAdminOrAgent } from '@/auth-guard';
import ShowRooms from '@/components/shared/rooms';
import { getServerOnboardHotelById } from '@/lib/actions/hotel.action';
import { AdminAgentRole } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'All Rooms',
};

const RatesAndAvailability = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  const session = await requireAdminOrAgent();
  const hotel = await getServerOnboardHotelById(hotelId);
  if (!hotel) {
    notFound();
  }
  const { rooms } = hotel;
  return (
    <ShowRooms
      role={session.user.role as AdminAgentRole}
      rooms={rooms}
      hotelId={hotelId}
    />
  );
};
export default RatesAndAvailability;
