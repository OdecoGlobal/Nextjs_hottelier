import { requireAgent } from '@/auth-guard';
import AvailabilityRoomSetter from '@/components/shared/hotel/availability/checker';
import { getRoomById } from '@/lib/actions/room.actions';
import { notFound } from 'next/navigation';

const RoomRatesPage = async ({
  params,
}: {
  params: Promise<{ roomId: string; hotelId: string }>;
}) => {
  const { roomId, hotelId } = await params;
  const agent = await requireAgent();
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
        role={agent.user.role as 'AGENT'}
      />
    </>
  );
};
export default RoomRatesPage;
