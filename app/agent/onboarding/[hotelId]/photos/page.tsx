export const dynamic = 'force-dynamic';
import { requireAgent } from '@/auth-guard';
import UploadHotelPhotoForm from '@/components/shared/hotel/photos';
import { redirect } from 'next/navigation';

const AddPhotosPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const agent = await requireAgent();
  if (!agent) redirect('/unauthorized');
  const { hotelId } = await params;
  return (
    <UploadHotelPhotoForm
      hotelId={hotelId}
      role={agent.user.role as 'AGENT'}
      userName={agent.user.userName}
    />
  );
};

export default AddPhotosPage;
