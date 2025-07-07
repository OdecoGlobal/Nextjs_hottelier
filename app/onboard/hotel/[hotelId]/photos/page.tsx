export const dynamic = 'force-dynamic';
import { requireAdminOrAgent } from '@/auth-guard';
import UploadHotelPhotoForm from '@/components/shared/hotel/photos';
import { AdminAgentRole } from '@/types';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Hotel Images',
};

const AddPhotosPage = async ({
  params,
}: {
  params: Promise<{ role: AdminAgentRole; hotelId: string }>;
}) => {
  const { hotelId, role } = await params;
  const session = await requireAdminOrAgent(role);
  return (
    <UploadHotelPhotoForm
      hotelId={hotelId}
      role={session.user.role as AdminAgentRole}
      userName={session.user.userName}
    />
  );
};

export default AddPhotosPage;
