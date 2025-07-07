export const dynamic = 'force-dynamic';
import { requireAdminOrAgent } from '@/auth-guard';
import MainBasicInfoPage from '@/components/shared/hotel/basic-info';
import { getServerOnboardHotelById } from '@/lib/actions/hotel.action';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Update Basic Info',
};
const BasicInfoUpdatePage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  await requireAdminOrAgent();
  const hotel = await getServerOnboardHotelById(hotelId);
  if (!hotel) notFound();
  const { basicInfo } = hotel;
  return <MainBasicInfoPage hotelId={hotelId} basicInfo={basicInfo} />;
};

export default BasicInfoUpdatePage;
