import AddRoomComponent from '@/components/shared/hotel/rooms';

const RoomsAndRatePage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  return <AddRoomComponent hotelId={hotelId} />;
};
export default RoomsAndRatePage;
