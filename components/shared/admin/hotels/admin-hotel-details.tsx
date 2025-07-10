'use client';
import LoadingComponent from '@/components/loading-state';
import { useOnboardHotelById } from '@/hooks/use-onboard-hotels';

import AdminOnboardBasicInfo from './details/basic-info';
import AdminReviewPolicies from './details/admin-review-policies';
import TanStackErrorComponent from '../../tan-error';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AdminReviewAmenities from './details/admin-hotel-amenities-review';
const steps = ['basic', 'policies', 'amenities', 'photos', 'rooms'];

const AdminHotelDetailsComponent = ({ hotelId }: { hotelId: string }) => {
  const { data, isPending, error, refetch } = useOnboardHotelById({ hotelId });
  const [current, setCurrent] = useState('basic');
  const currentIndex = steps.findIndex(step => step === current);

  const goToNext = () => {
    if (currentIndex < steps.length - 1) {
      setCurrent(steps[currentIndex + 1]);
    }
  };
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrent(steps[currentIndex - 1]);
    }
  };

  return (
    <main className="space-y-6">
      <header className="bg-linear-(--gradient-200) p-6 rounded-xl">
        <h3 className="text-2xl md:text-3xl font-bold text-brand-secondary">
          Hotel Review
        </h3>
        <p className="text-slate-50 text-base">Review Details</p>
      </header>
      <Tabs value={current} onValueChange={setCurrent}>
        <TabsList>
          {steps.map(step => (
            <TabsTrigger key={step} value={step} className="capitalize">
              {step}
            </TabsTrigger>
          ))}
        </TabsList>
        {isPending && <LoadingComponent />}
        {error && <TanStackErrorComponent onRetry={() => refetch()} />}
        {!isPending && !error && data && (
          <>
            <TabsContent value="basic">
              <AdminOnboardBasicInfo />
            </TabsContent>
            <TabsContent value="policies">
              <AdminReviewPolicies />
            </TabsContent>
            <TabsContent value="amenities">
              <AdminReviewAmenities />
            </TabsContent>
          </>
        )}
      </Tabs>

      <div className="flex-between">
        <Button
          type="button"
          onClick={goToPrevious}
          variant="outline"
          disabled={currentIndex === 0}
          className="btn-brand"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={goToNext}
          variant="outline"
          disabled={currentIndex === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </main>
  );
};

export default AdminHotelDetailsComponent;
