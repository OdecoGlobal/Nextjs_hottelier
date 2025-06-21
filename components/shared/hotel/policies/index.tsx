'use client';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import HotelCreationSteps from '../creation-steps';
import { AdminOwnerRole, HotelPolicyType } from '@/types';
import StepOnePolicy from './step-one-policy';
import StepThreePolicy from './step-three-policy';
import StepTwoPolicy from './step-two-policies';
import {
  getHotelPolicies,
  updateHotelPolicies,
} from '@/lib/actions/hotel.action';
import { hotelPolicySchema } from '@/lib/schemas/grouped-validators';
import { useForm } from 'react-hook-form';
import { defaultPolicies } from '@/lib/constants/hotel-default-values';
import { zodResolver } from '@hookform/resolvers/zod';

const MainPolicyForm = ({
  hotelId,
  role,
}: {
  hotelId: string;
  role: AdminOwnerRole;
}) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<HotelPolicyType>({
    resolver: zodResolver(hotelPolicySchema),
    defaultValues: defaultPolicies,
    shouldUnregister: false,
  });

  useEffect(() => {
    const getPolicies = async () => {
      const { data } = await getHotelPolicies(hotelId);
      if (data) {
        form.reset(data);
        form.trigger();
      }
      console.log(data);
    };
    getPolicies();
  }, [hotelId, form]);

  const handleNext = async (nextStep: number) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    setStep(nextStep);
  };

  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
    const formData = form.getValues();
    console.log(formData);

    startTransition(async () => {
      const response = await updateHotelPolicies(formData, hotelId);
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
          `/${role.toLowerCase()}/onboarding/${hotelId}/amenities`
        );
      }
    });
  };

  return (
    <section className="flex flex-col md:flex-row md:min-h-screen">
      <HotelCreationSteps current={1} />

      <div className="flex-1 my-5 px-5 w-full max-w-3xl mx-auto">
        {step === 1 && (
          <StepOnePolicy form={form} onNext={() => handleNext(2)} />
        )}

        {step === 2 && (
          <StepTwoPolicy
            onNext={() => handleNext(3)}
            onPrevious={handlePrevious}
            form={form}
          />
        )}
        {step === 3 && (
          <StepThreePolicy
            isPending={isPending}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            form={form}
          />
        )}
      </div>
    </section>
  );
};

export default MainPolicyForm;
