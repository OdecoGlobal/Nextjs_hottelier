import SubmitFormButton from '@/components/submit-form-button';
import { Form, FormDescription } from '@/components/ui/form';
import { StepThreeAddRoomSchema } from '@/lib/schemas/grouped-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useForm, UseFormWatch } from 'react-hook-form';
import { z } from 'zod';
import BathRoomType from './bathroom-type';
import RoomLayoutForm from './room-layout';
import RoomSize from './room-size';
import RoomView from './room-view';
import OutdoorSpace from './outdoor-space';
export type StepThreeAddRoomType = z.infer<typeof StepThreeAddRoomSchema>;
type StepThreeAddRoomProp = {
  onNext: (data: StepThreeAddRoomType) => void;
  onPrevious: () => void;
  defaultValues: StepThreeAddRoomType;
};
export type StepThreeRoomFormProps = {
  control: Control<StepThreeAddRoomType>;
  watch: UseFormWatch<StepThreeAddRoomType>;
};
const StepThreeAddRoom = ({
  onNext,
  onPrevious,
  defaultValues,
}: StepThreeAddRoomProp) => {
  const form = useForm<StepThreeAddRoomType>({
    resolver: zodResolver(StepThreeAddRoomSchema),
    defaultValues,
    shouldUnregister: false,
  });
  const { formState, handleSubmit, control } = form;
  const isPending = formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
        <h1 className="text-xl md:text-2xl font-bold">
          Attract travelers with room amenities
        </h1>
        <FormDescription>
          Add Room amenities to give travelers of what their stay will be like
        </FormDescription>
        <BathRoomType control={control} />
        <RoomView control={control} />
        <RoomSize control={control} />
        <OutdoorSpace control={control} />
        <RoomLayoutForm control={control} />

        <SubmitFormButton
          action="Next"
          isPending={isPending}
          showPrevious={true}
          showSteps={true}
          currentStep={3}
          totalSteps={5}
          onPrevious={onPrevious}
        />
      </form>
    </Form>
  );
};

export default StepThreeAddRoom;
