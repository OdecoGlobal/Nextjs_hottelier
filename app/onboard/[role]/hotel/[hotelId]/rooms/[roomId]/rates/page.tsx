import { requireAdminOrAgent } from '@/auth-guard';
import AvailabilityRoomSetter from '@/components/shared/hotel/availability/checker';
import { getRoomById } from '@/lib/actions/room.actions';
import { AdminAgentRole } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Update room rates',
};
const RoomRatesPage = async ({
  params,
}: {
  params: Promise<{ role: AdminAgentRole; roomId: string; hotelId: string }>;
}) => {
  const { roomId, hotelId, role } = await params;
  const session = await requireAdminOrAgent(role);
  const { room } = await getRoomById(hotelId, roomId);
  console.log(room);
  if (!room) {
    notFound();
  }
  return (
    <>
      <AvailabilityRoomSetter
        room={room}
        hotelId={hotelId}
        roomId={roomId}
        role={session.user.role as 'AGENT'}
      />
    </>
  );
};
export default RoomRatesPage;
