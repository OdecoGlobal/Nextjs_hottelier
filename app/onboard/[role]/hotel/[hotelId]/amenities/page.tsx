export const dynamic = 'force-dynamic';
import { requireAdminOrAgent } from '@/auth-guard';
import MainAmenitiesForm from '@/components/shared/hotel/amenities';
import { getHotelById } from '@/lib/actions/hotel.action';
import { AdminAgentRole } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Hotel Amenities',
};

const AgentAmenitiesPage = async ({
  params,
}: {
  params: Promise<{ role: AdminAgentRole; hotelId: string }>;
}) => {
  const { hotelId, role } = await params;
  const session = await requireAdminOrAgent(role);

  const { hotel } = await getHotelById(hotelId);
  if (!hotel) notFound();

  return (
    <MainAmenitiesForm
      hotelId={hotelId}
      role={session.user.role as AdminAgentRole}
      hotelAmenities={hotel.amenities}
    />
  );
};
export default AgentAmenitiesPage;
