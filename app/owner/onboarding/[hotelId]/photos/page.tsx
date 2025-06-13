import UploadHotelPhotoForm from '@/components/shared/hotel/photos';

const AddPhotosPage = async ({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) => {
  const { hotelId } = await params;
  return <UploadHotelPhotoForm hotelId={hotelId} />;
};

export default AddPhotosPage;
