import { requireAdminOrAgent } from '@/auth-guard';
import AvailabilityRoomSetter from '@/components/shared/hotel/availability/checker';
import { getRoomById } from '@/lib/actions/room.actions';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Update room rates',
};
const RoomRatesPage = async ({
  params,
}: {
  params: Promise<{ roomId: string; hotelId: string }>;
}) => {
  const { roomId, hotelId } = await params;
  await requireAdminOrAgent();
  const { room } = await getRoomById(hotelId, roomId);
  if (!room) {
    notFound();
  }
  return (
    <>
      <AvailabilityRoomSetter room={room} hotelId={hotelId} roomId={roomId} />
    </>
  );
};
export default RoomRatesPage;
