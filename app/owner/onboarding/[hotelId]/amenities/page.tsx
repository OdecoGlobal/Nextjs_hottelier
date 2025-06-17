export const dynamic = 'force-dynamic';
import { requireOwner } from '@/auth-guard';
import MainAmenitiesForm from '@/components/shared/hotel/amenities';
import { redirect } from 'next/navigation';

const OwnersAmenitiesPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  const owner = await requireOwner();
  if (!owner) redirect('/unauthorized');
  return (
    <MainAmenitiesForm hotelId={hotelId} role={owner.user.role as 'OWNER'} />
  );
};
export default OwnersAmenitiesPage;
