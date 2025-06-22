export const dynamic = 'force-dynamic';
import { requireOwner } from '@/auth-guard';
import MainBasicInfoPage from '@/components/shared/hotel/basic-info';
import { getHotelById } from '@/lib/actions/hotel.action';
import { notFound } from 'next/navigation';
const BasicInfoUpdatePage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const owner = await requireOwner();
  const { hotelId } = await params;
  const { hotel } = await getHotelById(hotelId);
  if (!hotel) notFound();
  return (
    <MainBasicInfoPage
      role={owner.user.role as 'OWNER'}
      isUpdate={true}
      hotelId={hotelId}
      basicData={hotel.basicInfo}
    />
  );
};

export default BasicInfoUpdatePage;
