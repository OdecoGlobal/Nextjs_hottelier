export const dynamic = 'force-dynamic';

import { requireAdminOrAgent } from '@/auth-guard';
import AddRoomComponent from '@/components/shared/hotel/rooms';
import { getHotelById } from '@/lib/actions/hotel.action';
import { AdminAgentRole } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Rooms',
};

const RoomsAndRatePage = async ({
  params,
}: {
  params: Promise<{ role: AdminAgentRole; hotelId: string }>;
}) => {
  const { hotelId, role } = await params;
  const session = await requireAdminOrAgent(role);
  const { hotel } = await getHotelById(hotelId);
  if (!hotel) notFound();
  const { rooms, basicInfo } = hotel;
  const roomAssigned = rooms.reduce((sum, room) => sum + room.totalRooms, 0);
  return (
    <AddRoomComponent
      hotelId={hotelId}
      userName={session.user.userName}
      role={session.user.role as AdminAgentRole}
      hotelTotalRooms={basicInfo.roomUnitTotal}
      roomsAssigned={roomAssigned}
    />
  );
};
export default RoomsAndRatePage;
