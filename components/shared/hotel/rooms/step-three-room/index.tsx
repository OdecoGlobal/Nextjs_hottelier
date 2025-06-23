import { FormDescription } from '@/components/ui/form';
import { StepThreeAddRoomSchema } from '@/lib/schemas/grouped-validators';
import { Control, UseFormReturn, UseFormWatch } from 'react-hook-form';
import { z } from 'zod';
import BathRoomType from './bathroom-type';
import RoomLayoutForm from './room-layout';
import RoomSize from './room-size';
import RoomView from './room-view';
import OutdoorSpace from './outdoor-space';
import ClimateControl from './climate-control';
import { AddRoomType } from '@/types';
export type StepThreeAddRoomType = z.infer<typeof StepThreeAddRoomSchema>;
type StepThreeAddRoomProp = {
  form: UseFormReturn<AddRoomType>;
};
export type StepThreeRoomFormProps = {
  control: Control<StepThreeAddRoomType>;
  watch: UseFormWatch<StepThreeAddRoomType>;
};
const StepThreeAddRoom = ({ form }: StepThreeAddRoomProp) => {
  const { control } = form;
  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold">
        Attract travelers with room amenities
      </h1>
      <FormDescription>
        Add Room amenities to give travelers of what their stay will be like
      </FormDescription>
      <BathRoomType control={control} />
      <ClimateControl control={control} />
      <RoomView control={control} />
      <RoomSize control={control} />
      <OutdoorSpace control={control} />
      <RoomLayoutForm control={control} />
    </>
  );
};

export default StepThreeAddRoom;
