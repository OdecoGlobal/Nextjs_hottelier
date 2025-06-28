export const dynamic = 'force-dynamic';
import { requireAdminOrAgent } from '@/auth-guard';
import MainBasicInfoPage from '@/components/shared/hotel/basic-info';
import { getHotelById } from '@/lib/actions/hotel.action';
import { AdminAgentRole } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Update Basic Info',
};
const BasicInfoUpdatePage = async ({
  params,
}: {
  params: Promise<{ role: AdminAgentRole; hotelId: string }>;
}) => {
  const { hotelId, role } = await params;
  const session = await requireAdminOrAgent(role);
  const { hotel } = await getHotelById(hotelId);
  if (!hotel) notFound();
  return (
    <MainBasicInfoPage
      role={session.user.role as AdminAgentRole}
      isUpdate={true}
      hotelId={hotelId}
      basicData={hotel.basicInfo}
    />
  );
};

export default BasicInfoUpdatePage;
