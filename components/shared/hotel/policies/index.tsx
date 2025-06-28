'use client';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import HotelCreationSteps from '../creation-steps';
import { AdminAgentRole, HotelPolicyType } from '@/types';
import StepOnePolicy from './step-one-policy';
import StepThreePolicy from './step-three-policy';
import StepTwoPolicy from './step-two-policies';
import { updateHotelPolicies } from '@/lib/actions/hotel.action';
import { hotelPolicySchema } from '@/lib/schemas/grouped-validators';
import { Control, useForm, UseFormWatch } from 'react-hook-form';
import { defaultPolicies } from '@/lib/constants/hotel-default-values';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { baseHotelPolicySchema } from '@/lib/schemas/validator';
import { pickKeys } from '@/lib/utils';
import SubmitFormButton from '@/components/submit-form-button';

export type HotelPolicyProp = {
  control: Control<HotelPolicyType>;
  watch: UseFormWatch<HotelPolicyType>;
};
export type HotelPolicyControl = {
  control: Control<HotelPolicyType>;
};

const stepOneSchema = baseHotelPolicySchema.pick({
  paymentMethods: true,
  isDepositRequired: true,
  depositAmount: true,
  cancellationFeeType: true,
  cancellationPolicy: true,
  isTaxIncludedInRoomRates: true,
  smokingPolicy: true,
  additionalPolicy: true,
  hasAdditionalPolicy: true,
});

const stepTwoSchema = baseHotelPolicySchema.pick({
  isFrontDesk: true,
  isFrontDeskEveryDay: true,
  isFrontDeskOpen24Hours: true,
  frontDeskScheduleStartDay: true,
  frontDeskScheduleEndDay: true,
  frontDeskStartTime: true,
  frontDeskEndTime: true,
  isSelfCheckIn: true,
  selfCheckInType: true,
  checkInStartTime: true,
  checkInEndTime: true,
  isOpen24Hours: true,
  isLateCheckIn: true,
  lateCheckInType: true,
  lateCheckInStartTime: true,
  lateCheckInEndTime: true,
  surchargeType: true,
  surchargeAmount: true,
  isAdvancedNoticeCheckIn: true,
  advanceNoticeCheckInTime: true,
  checkOutTime: true,
  minCheckInAgeAllowed: true,
});

const stepThreeSchema = baseHotelPolicySchema.pick({
  isPetAllowed: true,
  isPetSurcharged: true,
  petSurchargeAmount: true,
  petSurchargeType: true,
  petSurchargeDuration: true,
  isMaxFeePerStay: true,
  maxFeePerStayAmount: true,
  isPetFeeVaried: true,
  allowedPetType: true,
  isPetRestricted: true,
  petRestrictionType: true,
  isMaxWeightPerPet: true,
  petMaxWeight: true,
  isPetDeposit: true,
  petDepositType: true,
  petDepositAmount: true,
  isPetCleaningFee: true,
  petCleaningFee: true,
  petFriendlyFeatures: true,
});

const stepFields = [
  pickKeys(stepOneSchema),
  pickKeys(stepTwoSchema),
  pickKeys(stepThreeSchema),
];

const MainPolicyForm = ({
  hotelId,
  role,
  data,
}: {
  hotelId: string;
  role: AdminAgentRole;
  data: HotelPolicyType;
}) => {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<HotelPolicyType>({
    resolver: zodResolver(hotelPolicySchema),
    defaultValues: data ?? defaultPolicies,
    shouldUnregister: false,
  });

  const handleSubmit = async () => {
    const formData = form.getValues();

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
          `/onboard/${role.toLowerCase()}/hotel/${hotelId}/amenities`,
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
      await handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (step > 0) setStep(prevStep => prevStep - 1);
  };

  const isLastStep = step === stepFields.length - 1;
  return (
    <section className="flex flex-col md:flex-row md:min-h-screen">
      <HotelCreationSteps current={1} role={role} hotelId={hotelId} />

      <Form {...form}>
        <form
          className="flex-1 my-5 px-5 w-full max-w-3xl mx-auto space-y-4"
          onSubmit={e => {
            e.preventDefault();
            handleNext();
          }}
        >
          {step === 0 && <StepOnePolicy form={form} />}

          {step === 1 && <StepTwoPolicy form={form} />}
          {step === 2 && <StepThreePolicy form={form} />}

          <SubmitFormButton
            action={isLastStep ? 'Submit' : 'Next'}
            isPending={isPending}
            showPrevious={step > 0}
            showSteps
            onPrevious={handlePrevious}
            currentStep={step + 1}
            totalSteps={stepFields.length}
          />
        </form>
      </Form>
    </section>
  );
};

export default MainPolicyForm;
