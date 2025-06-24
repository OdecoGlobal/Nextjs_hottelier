import { requireOwner } from '@/auth-guard';
import AvailabilityRoomSetter from '@/components/shared/hotel/availability/checker';
import { getRoomById } from '@/lib/actions/room.actions';
import { notFound } from 'next/navigation';

const RoomRatesPage = async ({
  params,
}: {
  params: Promise<{ roomId: string; hotelId: string }>;
}) => {
  const { roomId, hotelId } = await params;
  const owner = await requireOwner();
  const { room } = await getRoomById(hotelId, roomId);
  if (!room) {
    notFound();
  }
  return (
    <>
      <AvailabilityRoomSetter
        room={room}
        hotelId={hotelId}
        roomId={roomId}
        role={owner.user.role as 'OWNER'}
      />
    </>
  );
};
export default RoomRatesPage;
