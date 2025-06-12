'use client';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import HotelCreationSteps from '../creation-steps';
import z from 'zod';
import { AdminOwnerRole, HotelPolicyType, StepThreePolicyType } from '@/types';

import StepOnePolicy from './step-one-policy';
import StepThreePolicy from './step-three-policy';
import StepTwoPolicy from './step-two-policies';
import { updateHotelPolicies } from '@/lib/actions/hotel.action';
import { hotelPolicySchema } from '@/lib/schemas/validator';
import {
  hotelPolicyStepOneSchema,
  hotelPolicyStepThreeSchema,
  hotelPolicyStepTwoSchema,
} from '@/lib/schemas/grouped-validators';
import { Control, UseFormWatch } from 'react-hook-form';

export type StepThreePolicyProp = {
  control: Control<StepThreePolicyType>;
  watch: UseFormWatch<StepThreePolicyType>;
};

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

  const [formData, setFormData] = useState<z.infer<typeof hotelPolicySchema>>({
    paymentMethods: [],
    isDepositRequired: false,
    depositAmount: 0,
    isTaxIncludedInRoomRates: false,
    cancellationPolicy: 'FREE_CANCELLATION',
    smokingPolicy: 'NO_SMOKING',

    isFrontDesk: false,
    isFrontDeskEveryDay: true,
    isFrontDeskOpen24Hours: false,
    frontDeskScheduleStartDay: 'MONDAY',
    frontDeskScheduleEndDay: 'FRIDAY',
    frontDeskStartTime: '06:00',
    frontDeskEndTime: '06:00',
    isSelfCheckIn: false,
    selfCheckInType: 'ACCESS_CODE',

    checkInStartTime: '06:00',
    checkInEndTime: '06:00',
    isOpen24Hours: false,
    isLateCheckIn: false,
    lateCheckInType: 'FREE',

    surchargeType: 'AMOUNT',
    surchargeAmount: 0,
    lateCheckInStartTime: '06:00',
    lateCheckInEndTime: '06:00',
    isAdvancedNoticeCheckIn: false,
    advanceNoticeCheckInTime: '06:00',

    checkOutTime: '06:00',
    minCheckInAgeAllowed: 18,
    hasAdditionalPolicy: false,
    additionalPolicy: [],

    isPetAllowed: false,
    isPetSurcharged: false,
    petSurchargeAmount: 0,
    petSurchargeType: undefined,
    petSurchargeDuration: undefined,
    isMaxFeePerStay: false,
    isPetFeeVaried: false,
    maxFeePerStayAmount: 0,
    allowedPetType: undefined,
    isPetRestricted: false,
    petRestrictionType: [],
    isMaxWeightPerPet: false,
    petMaxWeight: 0,
    isPetDeposit: false,
    petDepositType: undefined,
    petDepositAmount: undefined,
    isPetCleaningFee: false,
    petCleaningFee: 0,
    petFriendlyFeatures: [],
  });

  const handleNext = <T extends z.ZodTypeAny>(
    data: Partial<HotelPolicyType>,
    schema: T,
    nextStep: number
  ) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error(result.error.format());
      return;
    }
    setFormData(prev => ({ ...prev, ...data }));
    console.log(result);
    setStep(nextStep);
    console.log(formData);
  };

  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = async (data: Partial<HotelPolicyType>) => {
    const updatedFormData = { ...formData, ...data };
    const result = hotelPolicyStepThreeSchema.safeParse(updatedFormData);
    if (!result.success) return;
    setFormData(updatedFormData);

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
      }
      router.push(`/${role.toLowerCase()}/onboarding/${hotelId}/amenities`);
    });

    console.log('Resuul', result);
    console.log(formData);
  };

  return (
    <section className="border">
      <h1 className="text-2xl md:text-4xl font-bold bg-card px-5 py-6 mb-2 md:mb-1">
        Basic Info
      </h1>
      <div className=" flex flex-col md:flex-row md:min-h-screen">
        <HotelCreationSteps current={1} />

        <div className=" flex-1 flex justify-center items-center py-10 px-5 w-full">
          {step === 1 && (
            <StepOnePolicy
              defaultValues={formData}
              onNext={data => handleNext(data, hotelPolicyStepOneSchema, 2)}
            />
          )}
          {step === 2 && (
            <StepTwoPolicy
              onNext={data => handleNext(data, hotelPolicyStepTwoSchema, 3)}
              onPrevious={handlePrevious}
              defaultValues={formData}
            />
          )}
          {step === 3 && (
            <StepThreePolicy
              isPending={isPending}
              onPrevious={handlePrevious}
              onSubmit={data => handleSubmit(data)}
              defaultValues={formData}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default MainPolicyForm;

/*
    ;*/
