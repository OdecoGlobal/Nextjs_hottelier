import { requireAdminOrAgent } from '@/auth-guard';
import ShowRooms from '@/components/shared/rooms';
import { getHotelById } from '@/lib/actions/hotel.action';
import { AdminAgentRole } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'All Rooms',
};

const RatesAndAvailability = async ({
  params,
}: {
  params: Promise<{ role: AdminAgentRole; hotelId: string }>;
}) => {
  const { hotelId, role } = await params;
  const session = await requireAdminOrAgent(role);
  const { hotel } = await getHotelById(hotelId);
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
