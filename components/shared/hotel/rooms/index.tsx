'use client';
import { AddRoomType, StepOneAddRoomType } from '@/types';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import z from 'zod';
import HotelCreationSteps from '../creation-steps';
import StepOneRoom from './step-one-room';
import {
  StepOneAddRoomSchema,
  StepTwoAddRoomSchema,
} from '@/lib/schemas/grouped-validators';
import { Control, UseFormWatch } from 'react-hook-form';
import StepTwoAddRoom from './step-two-room';

export type StepOneAddRoomProp = {
  control: Control<StepOneAddRoomType>;
  watch: UseFormWatch<StepOneAddRoomType>;
};

const AddRoomComponent = ({ hotelId }: { hotelId: string }) => {
  const [step, setStep] = useState(1);
  //   const { toast } = useToast();
  //   const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [formData, setFormData] = useState<AddRoomType>({
    name: '',
    roomType: 'SINGLE',
    roomImages: [],
    roomSize: 0,
    roomSizeUnit: 'SQUARE_FEET',
    totalRooms: 0,
    baseRate: 0,
    pricingModel: 'PER_DAY',
    maxOccupancy: 1,
    bedTotal: 1,
    bedType: 'BUNK',
    bathroomType: 'PRIVATE',
    bathroomNumber: 0,
    showerType: 'SHOWER',
    isTowelProvided: false,
    climateControl: [],
    isRoomView: false,
    isOutDoorSpace: false,
    peopleInBaseRate: 1,
  });

  const handleNext = <T extends z.ZodTypeAny>(
    data: Partial<AddRoomType>,
    schema: T,
    nextStep: number
  ) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      return;
    }
    setFormData(prev => ({ ...prev, ...data }));
    console.log(result);
    setStep(nextStep);
  };
  const handlePrevious = () => setStep(step - 1);

  return (
    <section className="flex flex-col md:flex-row md:min-h-screen">
      <HotelCreationSteps current={4} />
      <div className=" flex-1 mt-5 px-5">
        {step === 1 && (
          <StepOneRoom
            defaultValues={formData}
            onNext={data => handleNext(data, StepOneAddRoomSchema, 2)}
          />
        )}
        {step === 2 && (
          <StepTwoAddRoom
            defaultValues={formData}
            onNext={data => handleNext(data, StepTwoAddRoomSchema, 3)}
            onPrevious={handlePrevious}
            stepOneValues={formData}
          />
        )}
      </div>
    </section>
  );
};

export default AddRoomComponent;
