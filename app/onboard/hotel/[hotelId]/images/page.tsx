export const dynamic = 'force-dynamic';
import { requireAdminOrAgent } from '@/auth-guard';
import UploadHotelPhotoForm from '@/components/shared/hotel/photos';
import { getServerOnboardHotelById } from '@/lib/actions/hotel.action';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Hotel Images',
};

const AddPhotosPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  const session = await requireAdminOrAgent();
  const hotel = await getServerOnboardHotelById(hotelId);
  if (!hotel) notFound();
  return (
    <UploadHotelPhotoForm hotelId={hotelId} userName={session.user.userName} />
  );
};

export default AddPhotosPage;
