'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HotelBasicInfoType } from '@/types';
import { Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import { UseFormReturn } from 'react-hook-form';

const LeafletMap = dynamic(
  () => import('@/components/shared/maps/leaflet-map'),
  { ssr: false }
);

const HotelBasicInfoStepThree = ({
  form,
  onPrevious,
  onSubmit,
  isPending,
}: {
  form: UseFormReturn<HotelBasicInfoType>;
  isPending: boolean;
  onPrevious: () => void;
  onSubmit: () => void;
}) => {
  const { setValue, watch } = form;
  const lat = watch('lat');
  const lng = watch('lng');
  const handleSelect = (lat: number, lng: number) => {
    setValue('lat', lat, { shouldValidate: true });
    setValue('lng', lng, { shouldValidate: true });
  };
  return (
    <Card>
      <CardHeader>
        <p className="text-muted-foreground font-semibold">Step 3 of 3</p>
        <h1 className="text-xl md:text-2xl font-bold">
          Pick a location on the map
        </h1>
      </CardHeader>
      <CardContent>
        <LeafletMap onSelect={handleSelect} />
        <div className="flex gap-6 my-2 justify-between">
          <Button onClick={onPrevious}>Previous</Button>
          <Button onClick={onSubmit} disabled={!lat || !lng || isPending}>
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              ' Submit'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelBasicInfoStepThree;
