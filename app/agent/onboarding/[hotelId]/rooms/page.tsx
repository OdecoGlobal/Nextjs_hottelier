export const dynamic = 'force-dynamic';

import { requireAgent } from '@/auth-guard';
import AddRoomComponent from '@/components/shared/hotel/rooms';
import { getHotelById } from '@/lib/actions/hotel.action';
import { notFound } from 'next/navigation';

const RoomsAndRatePage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const agent = await requireAgent();
  const { hotelId } = await params;
  const { hotel } = await getHotelById(hotelId);
  if (!hotel) notFound();
  const { rooms, basicInfo } = hotel;
  const roomAssigned = rooms.reduce((sum, room) => sum + room.totalRooms, 0);
  return (
    <AddRoomComponent
      hotelId={hotelId}
      userName={agent.user.userName}
      role={agent.user.role as 'AGENT'}
      hotelTotalRooms={basicInfo.roomUnitTotal}
      roomsAssigned={roomAssigned}
    />
  );
};
export default RoomsAndRatePage;
