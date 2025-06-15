const OwnersAmenitiesPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  return <>{hotelId}</>;
};
export default OwnersAmenitiesPage;
