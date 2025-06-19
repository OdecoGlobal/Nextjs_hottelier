import NumberIncrementButton from '@/components/number-increment-button';
import { SelectFieldForm } from '@/components/select-field-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { BED_TYPES_OPTIONS } from '@/lib/constants';
import { StepOneAddRoomType } from '@/types';
import { Control } from 'react-hook-form';

const BedSpace = ({ control }: { control: Control<StepOneAddRoomType> }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set up sleeping spaces</CardTitle>
        <CardDescription>
          Adding the number of bed and bed types sets the occupancy for this
          room
        </CardDescription>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="bedType"
            render={({ field }) => (
              <SelectFieldForm field={field} datas={BED_TYPES_OPTIONS} />
            )}
          />
          <FormField
            control={control}
            name="bedTotal"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="text-muted-foreground text-base flex-wrap  tracking-tight">
                  How many of these beds?
                </FormLabel>
                <NumberIncrementButton field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default BedSpace;
