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
import { useToast } from '@/hooks/use-toast';
import { updateRoomAvailability } from '@/lib/actions/room.actions';
import { availabilitySchema } from '@/lib/schemas/validator';
import { AdminOwnerRole, AvailabilityType, GetRoomType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type RoomAvailabilityProp = {
  room: GetRoomType;
  hotelId: string;
  roomId: string;
  role: AdminOwnerRole;
  initialData: AvailabilityType;
  onClose: () => void;
};

const RoomAvailabilityForm = ({
  room,
  hotelId,
  roomId,
  role,
  initialData,
  onClose,
}: RoomAvailabilityProp) => {
  const { toast } = useToast();
  const router = useRouter();
  const maxRoomSchema = availabilitySchema.extend({
    inventory: z.coerce
      .number()
      .min(0, 'Inventory cannot be negative')
      .max(
        room.totalRooms,
        `Room inventory cannot exceed ${room.totalRooms} total rooms`
      ),
  });
  const form = useForm<AvailabilityType>({
    resolver: zodResolver(maxRoomSchema),

    defaultValues: {
      ...initialData,
    },
  });

  const { control, handleSubmit, formState } = form;
  const isPending = formState.isSubmitting;

  const onSubmit = async (values: AvailabilityType) => {
    console.log(values, role);

    const res = await updateRoomAvailability(values, hotelId, roomId);
    if (!res.success) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: res.message,
      });
    } else {
      toast({
        title: 'Success',
        description: res.message,
        variant: 'default',
      });
      router.replace(`/${role.toLowerCase()}/onboarding/${hotelId}/reviews`);
    }
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
