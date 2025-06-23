import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormField } from '@/components/ui/form';
import { SelectFieldForm } from '@/components/select-field-form';
import {
  BATHROOM_OPTIONS,
  RADIO_BOOLEAN,
  ROOM_ESSENTIALS_OPTIONS,
  SHOWER_OPTIONS,
} from '@/lib/constants';
import NumberIncrementButton from '@/components/number-increment-button';
import CheckboxForm from '@/components/checkbox-form';
import RadioForm from '@/components/radio-form';
import { AddRoomControl } from '..';

const BathRoomType = ({ control }: AddRoomControl) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground text-base md:text-xl">
          Bathroom
        </CardTitle>
        <CardDescription>
          An essential for travelers, add as many bathroom details and amenities
          as you can
        </CardDescription>

        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="bathroomType"
            render={({ field }) => (
              <SelectFieldForm
                field={field}
                datas={BATHROOM_OPTIONS}
                label="Bathroom type*"
              />
            )}
          />
          <FormField
            control={control}
            name="bathroomNumber"
            render={({ field }) => (
              <NumberIncrementButton
                field={field}
                label="Number of bathrooms"
              />
            )}
          />
          <hr />

          <FormField
            control={control}
            name="showerType"
            render={({ field }) => {
              return (
                <SelectFieldForm
                  field={field}
                  datas={SHOWER_OPTIONS}
                  label="Does this room have a bath or shower"
                />
              );
            }}
          />
          <hr />
          <FormField
            control={control}
            name="roomEssential"
            render={({ field }) => (
              <CheckboxForm
                field={field}
                data={ROOM_ESSENTIALS_OPTIONS}
                label="Which esentials are provided?"
              />
            )}
          />
          <hr />

          <FormField
            control={control}
            name="isTowelProvided"
            render={({ field }) => (
              <RadioForm
                field={field}
                data={RADIO_BOOLEAN}
                isBoolean={true}
                className="flex-col justify-start items-start"
                label="Do you provide towels?"
              />
            )}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default BathRoomType;
