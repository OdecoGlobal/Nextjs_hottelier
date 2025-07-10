'use client';
import { AddRoomType } from '@/types';
import { useState } from 'react';
import HotelCreationSteps from '../creation-steps';
import StepOneRoom from './step-one-room';
import {
  StepFiveAddRoomSchema,
  StepFourAddRoomSchema,
  StepOneAddRoomSchema,
  StepThreeAddRoomSchema,
  StepTwoAddRoomSchema,
} from '@/lib/schemas/grouped-validators';
import { Control, useForm, UseFormWatch } from 'react-hook-form';
import StepTwoAddRoom from './step-two-room';
import AddRooomImages from './step-four-room';
import StepThreeAddRoom from './step-three-room';
import StepFiveAddRoom from './step-five-room';
import { defaultRooomValues } from '@/lib/constants/hotel-default-values';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { completeRoomSchema } from '@/lib/schemas/validator';
import SubmitFormButton from '@/components/submit-form-button';
import { pickKeys } from '@/lib/utils';

import z from 'zod';
import {
  useAddNewRooms,
  useOnboardHotelById,
} from '@/hooks/use-onboard-hotels';
import LoadingComponent from '@/components/loading-state';

const stepFields = [
  pickKeys(StepOneAddRoomSchema),
  pickKeys(StepTwoAddRoomSchema),
  pickKeys(StepThreeAddRoomSchema),
  pickKeys(StepFourAddRoomSchema),
  pickKeys(StepFiveAddRoomSchema),
];
export type AddRoomProp = {
  control: Control<AddRoomType>;
  watch: UseFormWatch<AddRoomType>;
};
export type AddRoomControl = {
  control: Control<AddRoomType>;
};

const AddRoomComponent = ({
  hotelTotalRooms,
  hotelId,
  userName,
  roomsAssigned,
}: {
  hotelId: string;
  userName: string;
  hotelTotalRooms: number;
  roomsAssigned: number;
}) => {
  const [step, setStep] = useState(0);
  const { data, isPending: dataLoading } = useOnboardHotelById({ hotelId });
  const { isPending, mutateAsync } = useAddNewRooms();

  const [isUploading, setIsUploading] = useState(false);

  const remainingRooms = hotelTotalRooms - roomsAssigned;

  const maxRoomSchema = completeRoomSchema.extend({
    totalRooms: z.coerce
      .number()
      .min(1, 'Rooms cannot be less than one')
      .max(hotelTotalRooms, `Only ${remainingRooms} room(s) left to allocate`),
  });

  const form = useForm<AddRoomType>({
    resolver: zodResolver(maxRoomSchema),
    defaultValues: defaultRooomValues,
    shouldUnregister: false,
  });

  const { getValues } = form;

  if (dataLoading || !data) {
    return <LoadingComponent />;
  }
  const onSubmit = async () => {
    const data = getValues();
    await mutateAsync({ data, hotelId });
  };

  const handleNext = async () => {
    const isValid = await form.trigger(stepFields[step]);
    if (!isValid) return;
    if (step < stepFields.length - 1) {
      setStep(prev => prev + 1);
    } else {
      await onSubmit();
    }
  };

  const handlePrevious = () => {
    if (step > 0) setStep(prevStep => prevStep - 1);
  };

  const isLastStep = step === stepFields.length - 1;
  const { status, completionSteps } = data! ?? {};
  // console.log(completionSteps);

  return (
    <section className="flex flex-col md:flex-row md:min-h-screen">
      <HotelCreationSteps
        current={5}
        hotelId={hotelId}
        completedSteps={completionSteps}
        status={status}
      />
      <Form {...form}>
        {/* <div style={{ display: step === 1 ? 'block' : 'none' }}><StepOne /></div> */}
        <form
          className="flex-1 wrapper space-y-4"
          onSubmit={e => {
            e.preventDefault();
            handleNext();
          }}
        >
          {step === 0 && <StepOneRoom form={form} />}
          {step === 1 && <StepTwoAddRoom form={form} />}
          {step === 2 && <StepThreeAddRoom form={form} />}
          {step === 3 && (
            <AddRooomImages
              form={form}
              hotelId={hotelId}
              userName={userName}
              setIsUploading={setIsUploading}
            />
          )}

          {step === 4 && <StepFiveAddRoom form={form} />}

          <SubmitFormButton
            action={isLastStep ? 'Submit' : 'Next'}
            isPending={isPending}
            showPrevious={step > 0}
            showSteps
            onPrevious={handlePrevious}
            currentStep={step + 1}
            totalSteps={stepFields.length}
            disabled={isUploading}
          />
        </form>
      </Form>
    </section>
  );
};

export default AddRoomComponent;
