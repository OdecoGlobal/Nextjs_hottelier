'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(
  () => import('@/components/shared/maps/leaflet-map'),
  { ssr: false }
);

const HotelBasicInfoStepThree = ({
  lat,
  lng,
  onPrevious,
  onSelect,
  onSubmit,
  isPending,
}: {
  lat: number | null;
  lng: number | null;
  isPending: boolean;
  onPrevious: () => void;
  onSelect: (lat: number, lng: number) => void;
  onSubmit: () => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <p className="text-muted-foreground font-semibold">Step 3 of 3</p>
        <h1 className="text-xl md:text-2xl font-bold">
          Pick a location on the map
        </h1>
      </CardHeader>
      <CardContent>
        <LeafletMap onSelect={onSelect} />
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
