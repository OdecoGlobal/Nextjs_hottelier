export const dynamic = 'force-dynamic';

import { requireAgent } from '@/auth-guard';
import AddRoomComponent from '@/components/shared/hotel/rooms';
import { redirect } from 'next/navigation';

const RoomsAndRatePage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const agent = await requireAgent();
  if (!agent) redirect('/unauthorized');
  const { hotelId } = await params;
  return (
    <AddRoomComponent
      hotelId={hotelId}
      userName={agent.user.userName}
      role={agent.user.role as 'AGENT'}
    />
  );
};
export default RoomsAndRatePage;
