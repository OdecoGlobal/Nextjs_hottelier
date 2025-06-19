import SubmitFormButton from '@/components/submit-form-button';
import { Form } from '@/components/ui/form';
import { StepOneAddRoomSchema } from '@/lib/schemas/grouped-validators';
import { StepOneAddRoomType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import RoomBasics from './room-basics';
import BedSpace from './bed-space';
import RoomOccupancy from './occupancy';
import BaseRate from './base-rate';

const StepOneRoom = ({
  onNext,
  defaultValues,
}: {
  onNext: (data: StepOneAddRoomType) => void;
  defaultValues: StepOneAddRoomType;
}) => {
  const form = useForm<StepOneAddRoomType>({
    resolver: zodResolver(StepOneAddRoomSchema),
    defaultValues,
    shouldUnregister: false,
  });
  const { formState, control, watch } = form;
  const isPending = formState.isSubmitting;

  const onSubmit = async (values: StepOneAddRoomType) => {
    console.log(values);
    onNext(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" mx-auto space-y-4"
      >
        <RoomBasics control={control} />
        <BedSpace control={control} />
        <RoomOccupancy control={control} />
        <BaseRate control={control} watch={watch} />

        <SubmitFormButton
          isPending={isPending}
          action="Next"
          showSteps={true}
          currentStep={1}
          totalSteps={5}
        />
      </form>
    </Form>
  );
};

export default StepOneRoom;
