import { SelectFieldForm } from '@/components/select-field-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ROOM_CLASS_OPTIONS, ROOM_TYPES_OPTIONS } from '@/lib/constants';
import { AddRoomControl } from '..';

const RoomBasics = ({ control }: AddRoomControl) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Start with the basics</CardTitle>
        <CardDescription>
          Room types are the basic descriptions of a room, like if its single or
          double. if you add a room class make sure to use it consitently across
          all rooms
        </CardDescription>
        <CardContent className="space-y-4">
          <FormItem className="flex justify-between gap-4">
            <FormField
              name="roomType"
              control={control}
              render={({ field }) => (
                <SelectFieldForm
                  field={field}
                  datas={ROOM_TYPES_OPTIONS}
                  placeholder="Room Type"
                  className="w-full"
                />
              )}
            />
            <FormField
              name="roomClass"
              control={control}
              render={({ field }) => (
                <SelectFieldForm
                  field={field}
                  datas={ROOM_CLASS_OPTIONS}
                  placeholder="Room class (optional)"
                  className="w-full"
                />
              )}
            />
          </FormItem>
          <FormField
            control={control}
            name="totalRooms"
            render={({ field }) => (
              <FormItem>
                <FormDescription>
                  How many of these room types do you have
                </FormDescription>

                <div className="flex gap-2 items-center">
                  <FormControl>
                    <Input {...field} placeholder="total rooms" />
                  </FormControl>
                  <FormLabel>Rooms</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default RoomBasics;
