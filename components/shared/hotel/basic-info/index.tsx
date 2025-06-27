'use client';
import { useState, useTransition } from 'react';
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
import { AdminAgentRole, HotelBasicInfoType } from '@/types';
import { hotelBasicInfoSchema } from '@/lib/schemas/validator';
import { defaultBasicInfo } from '@/lib/constants/hotel-default-values';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import SubmitFormButton from '@/components/submit-form-button';
import { pickKeys } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const stepOneSchema = hotelBasicInfoSchema.pick({
  name: true,
  hotelType: true,
  roomUnitTotal: true,
  acceptedCurrency: true,
});

const stepTwoSchema = hotelBasicInfoSchema.pick({
  address: true,
  city: true,
  country: true,
  zipCode: true,
  state: true,
});

const stepThreeSchema = hotelBasicInfoSchema.pick({
  lat: true,
  lng: true,
});

const MainBasicInfoPage = ({
  role,
  hotelId,
  basicData,
  isUpdate = false,
}: {
  role: AdminAgentRole;
  hotelId?: string;
  basicData?: HotelBasicInfoType;
  isUpdate?: boolean;
}) => {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const stepFields = [
    pickKeys(stepOneSchema),
    pickKeys(stepTwoSchema),
    pickKeys(stepThreeSchema),
  ];

  const form = useForm<HotelBasicInfoType>({
    resolver: zodResolver(hotelBasicInfoSchema),
    defaultValues: isUpdate && basicData ? basicData : defaultBasicInfo,
  });

  const handleSubmit = async (formData: HotelBasicInfoType) => {
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
  const handleNext = async () => {
    const isValid = await form.trigger(stepFields[step], { shouldFocus: true });
    if (!isValid) return;
    if (step < stepFields.length - 1) {
      setStep(prev => prev + 1);
    } else {
      await handleSubmit(form.getValues());
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(prevStep => prevStep - 1);
  };

  const isLastStep = step === stepFields.length - 1;
  const lat = form.watch('lat');
  const lng = form.watch('lng');
  return (
    <section className="flex flex-col md:flex-row space-y-3 min-h-screen mb-7">
      <HotelCreationSteps current={0} />

      <main className="px-5 flex-1 flex flex-col mx-auto justify-center items-center ">
        <Card className="w-full md:max-w-4xl ">
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={e => {
                  e.preventDefault();
                  handleNext();
                }}
              >
                {step === 0 && <HotelBasicInfoStepOne form={form} />}

                {step === 1 && <HotelBasicInfoStepTwo form={form} />}

                {step === 2 && <HotelBasicInfoStepThree form={form} />}
                <SubmitFormButton
                  action={isLastStep ? 'Submit' : 'Next'}
                  isPending={isPending}
                  disabled={isLastStep && (!lat || !lng)}
                  showPrevious={step > 0}
                  showSteps
                  onPrevious={handleBack}
                  currentStep={step + 1}
                  totalSteps={stepFields.length}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </section>
  );
};

export default MainBasicInfoPage;
