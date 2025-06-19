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
import { StepOneAddRoomType } from '@/types';
import { Control } from 'react-hook-form';

const RoomOccupancy = ({
  control,
}: {
  control: Control<StepOneAddRoomType>;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Ocucpancy</CardTitle>
        <CardDescription>
          We recommend this occupancy based on the the number of bed types you
          added
        </CardDescription>
        <CardContent>
          <FormField
            control={control}
            name="maxOccupancy"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Input {...field} placeholder="Max room occupancy" />
                </FormControl>
                <FormLabel className="text-base text-muted-foreground">
                  persons
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default RoomOccupancy;
