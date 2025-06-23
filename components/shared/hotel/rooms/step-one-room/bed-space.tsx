import NumberIncrementButton from '@/components/number-increment-button';
import { SelectFieldForm } from '@/components/select-field-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormField } from '@/components/ui/form';
import { BED_TYPES_OPTIONS } from '@/lib/constants';
import { AddRoomControl } from '..';

const BedSpace = ({ control }: AddRoomControl) => {
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
              <NumberIncrementButton
                field={field}
                label=" How many of these beds?"
              />
            )}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default BedSpace;
