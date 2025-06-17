export const dynamic = 'force-dynamic';
import { requireOwner } from '@/auth-guard';
import UploadHotelPhotoForm from '@/components/shared/hotel/photos';
import { redirect } from 'next/navigation';

const AddPhotosPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const owner = await requireOwner();
  if (!owner) redirect('/unauthorized');
  const { hotelId } = await params;
  return (
    <UploadHotelPhotoForm
      hotelId={hotelId}
      role={owner.user.role as 'OWNER'}
      userName={owner.user.userName}
    />
  );
};

export default AddPhotosPage;
