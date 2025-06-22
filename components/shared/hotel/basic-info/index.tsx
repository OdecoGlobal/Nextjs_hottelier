'use client';
import { useEffect, useState, useTransition } from 'react';
import HotelBasicInfoStepOne from './basic-info-step-one';
import HotelBasicInfoStepTwo from './basic-info-step-two';
import HotelBasicInfoStepThree from './basic-info-step-three';
import { useToast } from '@/hooks/use-toast';
import {
  createNewHotel,
  updateHotelBasicInfo,
} from '@/lib/actions/hotel.action';
import { useRouter } from 'next/navigation';
import HotelCreationSteps from '../creation-steps';
import { AdminOwnerRole, HotelBasicInfoType } from '@/types';
import { hotelBasicInfoSchema } from '@/lib/schemas/validator';
import { defaultBasicInfo } from '@/lib/constants/hotel-default-values';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const MainBasicInfoPage = ({
  role,
  hotelId,
  basicData,
  isUpdate = false,
}: {
  role: AdminOwnerRole;
  hotelId?: string;
  basicData?: HotelBasicInfoType | null;
  isUpdate?: boolean;
}) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<HotelBasicInfoType>({
    resolver: zodResolver(hotelBasicInfoSchema),
    defaultValues: defaultBasicInfo,
  });

  useEffect(() => {
    if (basicData) {
      form.reset(basicData);
    }
  }, [basicData, form]);

  const handleNext = async (nextStep: number) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    setStep(nextStep);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
    const formData = form.getValues();

    startTransition(async () => {
      const response = isUpdate
        ? await updateHotelBasicInfo(formData, hotelId!)
        : await createNewHotel(formData);
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
            <HotelBasicInfoStepOne form={form} onNext={() => handleNext(2)} />
          )}

          {step === 2 && (
            <HotelBasicInfoStepTwo
              form={form}
              onNext={() => handleNext(3)}
              onPrevious={handleBack}
            />
          )}

          {step === 3 && (
            <HotelBasicInfoStepThree
              form={form}
              onPrevious={handleBack}
              onSubmit={handleSubmit}
              isPending={isPending}
            />
          )}
        </section>
      </div>
    </section>
  );
};

export default MainBasicInfoPage;
