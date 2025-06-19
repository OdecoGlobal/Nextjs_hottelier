export const dynamic = 'force-dynamic';

import { requireOwner } from '@/auth-guard';
import AddRoomComponent from '@/components/shared/hotel/rooms';
import { redirect } from 'next/navigation';

const RoomsAndRatePage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const owner = await requireOwner();
  if (!owner) redirect('/unauthorized');
  const { hotelId } = await params;
  return <AddRoomComponent hotelId={hotelId} userName={owner.user.userName} />;
};
export default RoomsAndRatePage;
