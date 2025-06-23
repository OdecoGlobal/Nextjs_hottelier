import { AddRoomType } from '@/types';
import { UseFormReturn } from 'react-hook-form';
import RoomBasics from './room-basics';
import BedSpace from './bed-space';
import RoomOccupancy from './occupancy';
import BaseRate from './base-rate';

const StepOneRoom = ({ form }: { form: UseFormReturn<AddRoomType> }) => {
  const { control, watch } = form;

  return (
    <>
      <RoomBasics control={control} />
      <BedSpace control={control} />
      <RoomOccupancy control={control} />
      <BaseRate control={control} watch={watch} />
    </>
  );
};

export default StepOneRoom;
