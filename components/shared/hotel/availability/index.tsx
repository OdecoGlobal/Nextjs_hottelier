'use client';
import SubmitFormButton from '@/components/submit-form-button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAddRoomAvailability } from '@/hooks/use-onboard-hotels';
import { availabilitySchema } from '@/lib/schemas/validator';
import { AvailabilityType, GetRoomType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type RoomAvailabilityProp = {
  room: GetRoomType;
  hotelId: string;
  roomId: string;
  initialData: AvailabilityType;
  onClose: () => void;
};

const RoomAvailabilityForm = ({
  room,
  hotelId,
  roomId,
  initialData,
  onClose,
}: RoomAvailabilityProp) => {
  const { mutateAsync, isPending } = useAddRoomAvailability();
  const maxRoomSchema = availabilitySchema.extend({
    inventory: z.coerce
      .number()
      .min(0, 'Inventory cannot be negative')
      .max(
        room.totalRooms,
        `Room inventory cannot exceed ${room.totalRooms} total rooms`,
      ),
  });
  const form = useForm<AvailabilityType>({
    resolver: zodResolver(maxRoomSchema),

    defaultValues: {
      ...initialData,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: AvailabilityType) => {
    await mutateAsync({ data, hotelId, roomId });

    onClose();
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  value={new Date(field.value).toLocaleDateString()}
                  disabled
                  readOnly
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="isAvailable"
          control={control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
              </FormControl>
              <FormLabel>Available</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          name="inventory"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inventory</FormLabel>
              <Input type="number" {...field} min={0} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="price"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <Input type="number" step="0.01" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitFormButton action="Save Availability" isPending={isPending} />
      </form>
    </Form>
  );
};

export default RoomAvailabilityForm;
