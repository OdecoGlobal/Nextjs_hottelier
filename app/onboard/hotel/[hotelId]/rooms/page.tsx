export const dynamic = 'force-dynamic';

import { requireAdminOrAgent } from '@/auth-guard';
import AddRoomComponent from '@/components/shared/hotel/rooms';
import MissingStepNotice from '@/components/shared/missing-info';
import { getServerOnboardHotelById } from '@/lib/actions/hotel.action';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Rooms',
};

const RoomsAndRatePage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  const session = await requireAdminOrAgent();
  const hotel = await getServerOnboardHotelById(hotelId);
  if (!hotel) notFound();
  const { rooms, basicInfo } = hotel;
  const { roomUnitTotal } = basicInfo;
  if (!basicInfo && !roomUnitTotal) {
    return (
      <MissingStepNotice
        step="basic info"
        message="You have not completed the basic info step. please complete it to continue with this steps"
      />
    );
  }
  const roomAssigned = rooms
    ? rooms.reduce((sum, room) => sum + room.totalRooms, 0)
    : 0;
  return (
    <AddRoomComponent
      hotelId={hotelId}
      userName={session.user.userName}
      hotelTotalRooms={roomUnitTotal}
      roomsAssigned={roomAssigned}
    />
  );
};
export default RoomsAndRatePage;
