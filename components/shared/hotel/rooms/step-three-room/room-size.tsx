import { Control } from 'react-hook-form';
import { StepThreeAddRoomType } from '.';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SelectFieldForm } from '@/components/select-field-form';
import { ROOM_SIZE_UNIT_OPTIONS } from '@/lib/constants';

const RoomSize = ({ control }: { control: Control<StepThreeAddRoomType> }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-muted-foreground md:text-xl">
          Room size
        </CardTitle>
        <CardDescription>What is the room size</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 items-center">
        <FormField
          name="roomSize"
          control={control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-muted-foreground">Room Size</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="roomSizeUnit"
          control={control}
          render={({ field }) => (
            <SelectFieldForm
              field={field}
              datas={ROOM_SIZE_UNIT_OPTIONS}
              className="w-full"
              label="Unit"
            />
          )}
        />
      </CardContent>
    </Card>
  );
};

export default RoomSize;
