'use client';
import { HotelBasicInfoType } from '@/types';
import dynamic from 'next/dynamic';
import { UseFormReturn } from 'react-hook-form';

const LeafletMap = dynamic(
  () => import('@/components/shared/maps/leaflet-map'),
  { ssr: false }
);

const HotelBasicInfoStepThree = ({
  form,
}: {
  form: UseFormReturn<HotelBasicInfoType>;
}) => {
  const { setValue } = form;

  const handleSelect = (lat: number, lng: number) => {
    setValue('lat', lat, { shouldValidate: true });
    setValue('lng', lng, { shouldValidate: true });
  };
  return (
    <>
      <p className="text-muted-foreground font-semibold">Step 3 of 3</p>
      <h1 className="text-xl md:text-2xl font-bold">
        Pick a location on the map
      </h1>

      <LeafletMap onSelect={handleSelect} />
    </>
  );
};

export default HotelBasicInfoStepThree;
