'use client';
import { AddRoomType, AdminAgentRole } from '@/types';

import { useState, useTransition } from 'react';
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
import { addRoom } from '@/lib/actions/hotel.action';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import z from 'zod';

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
  role,
  roomsAssigned,
}: {
  hotelId: string;
  userName: string;
  role: AdminAgentRole;
  hotelTotalRooms: number;
  roomsAssigned: number;
}) => {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
  const onSubmit = async () => {
    const formData = getValues();
    startTransition(async () => {
      const response = await addRoom(formData, hotelId);
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
          `/onboard/${role.toLowerCase()}/hotel/${hotelId}/rooms/${
            response?.room?.id
          }/rates`,
        );
      }
    });
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
  // const isPending = formState.isSubmitting;

  const isLastStep = step === stepFields.length - 1;

  return (
    <section className="flex flex-col md:flex-row md:min-h-screen">
      <HotelCreationSteps current={4} role={role} hotelId={hotelId} />
      <Form {...form}>
        <form
          className="flex-1 my-5 px-5 w-full max-w-3xl mx-auto space-y-4"
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
