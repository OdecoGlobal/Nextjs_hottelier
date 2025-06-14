'use client';

import { useState, useTransition } from 'react';
import { z } from 'zod';
import HotelBasicInfoStepOne from './basic-info-step-one';
import HotelBasicInfoStepTwo from './basic-info-step-two';
import HotelBasicInfoStepThree from './basic-info-step-three';
import { useToast } from '@/hooks/use-toast';
import { createNewHotel } from '@/lib/actions/hotel.action';
import { useRouter } from 'next/navigation';
import HotelCreationSteps from '../creation-steps';
import { AdminOwnerRole, HotelBasicInfoData } from '@/types';
import { hotelBasicInfoSchema } from '@/lib/schemas/validator';
import {
  hotelBasicInfoStepThreeSchema,
  hotelBasicInfoStepOneSchema,
  hotelBasicInfoStepTwoSchema,
} from '@/lib/schemas/grouped-validators';

const MainBasicInfoPage = ({ role }: { role: AdminOwnerRole }) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [formData, setFormData] = useState<
    z.infer<typeof hotelBasicInfoSchema>
  >({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    lng: 0,
    lat: 0,
    hotelType: 'HOTEL',
    roomUnitTotal: 1,
    acceptedCurrency: 'NGN',
  });

  const handleNext = <T extends z.ZodTypeAny>(
    data: Partial<HotelBasicInfoData>,
    schema: T,
    nextStep: number
  ) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error(result.error.format());
      return;
    }
    setFormData(prev => ({ ...prev, ...data }));
    setStep(nextStep);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    const result = hotelBasicInfoStepThreeSchema.safeParse(formData);
    if (!result.success) return;
    startTransition(async () => {
      const response = await createNewHotel(formData);
      if (!response?.success) {
        toast({
          title: 'Error',
          variant: 'destructive',
          description: response.message,
        });
      } else {
        toast({
          title: 'Success',
          description: response.message,
          variant: 'default',
        });
        router.replace(
          `/${role.toLowerCase()}/onboarding/${response.hotel?.id}/policies`
        );
      }
    });
  };

  return (
    <section className="flex flex-col md:flex-row space-y-3  min-h-screen">
      <HotelCreationSteps current={0} />

      <div className="flex-1 flex flex-col justify-center space-y-7  ">
        <section className="w-full max-w-sm md:max-w-md self-center">
          {step === 1 && (
            <HotelBasicInfoStepOne
              defaultValues={formData}
              onNext={data => handleNext(data, hotelBasicInfoStepOneSchema, 2)}
            />
          )}

          {step === 2 && (
            <HotelBasicInfoStepTwo
              defaultValues={formData}
              onNext={data => handleNext(data, hotelBasicInfoStepTwoSchema, 3)}
              onPrevious={handleBack}
            />
          )}

          {step === 3 && (
            <HotelBasicInfoStepThree
              lat={formData.lat}
              lng={formData.lng}
              onPrevious={handleBack}
              onSubmit={handleSubmit}
              isPending={isPending}
              onSelect={(lat, lng) =>
                setFormData(prev => ({ ...prev, lat, lng }))
              }
            />
          )}
        </section>
      </div>
    </section>
  );
};

export default MainBasicInfoPage;
