import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import YesNoButton from '@/components/yes-no-button';
import { Coffee } from 'lucide-react';
import { HotelAmenitiesProps } from '..';
import RadioForm from '@/components/radio-form';
import {
  BREAKFAST_SCHEDULE_OPTIONS,
  HOTEL_CHARGE_OPTION,
  TIME_SLOTS_STANDARD,
  TIME_SLOTS_WITH_NEXT_DAY,
} from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { SelectFieldForm } from '@/components/select-field-form';

const BreakfastAmenities = ({ control, watch }: HotelAmenitiesProps) => {
  const isBreakfast = watch('isBreakfast');
  const breakfastChargeType = watch('breakfastChargeType');
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardDescription className="flex gap-2 text-base font-semibold items-center">
          <Coffee className="w-4 h-4" /> Is Breakfast Available?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          name="isBreakfast"
          control={control}
          render={({ field }) => <YesNoButton field={field} />}
        />

        {isBreakfast && (
          <FormItem className="space-y-4">
            <FormField
              name="breakfastChargeType"
              control={control}
              render={({ field }) => (
                <RadioForm field={field} data={HOTEL_CHARGE_OPTION} />
              )}
            />
            {breakfastChargeType === 'SURCHARGE' && (
              <FormField
                control={control}
                name="breakfastSurchargeAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Surcharge Amount In NGN
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="max-w-md" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={control}
              name="breakfastSchedule"
              render={({ field }) => (
                <RadioForm field={field} data={BREAKFAST_SCHEDULE_OPTIONS} />
              )}
            />
            <FormItem className="flex justify-between gap-6 items-center">
              <FormField
                control={control}
                name="breakfastStartTime"
                render={({ field }) => (
                  <SelectFieldForm
                    field={field}
                    datas={TIME_SLOTS_STANDARD}
                    label="From"
                    className="w-full"
                  />
                )}
              />
              <FormField
                control={control}
                name="breakfastEndTime"
                render={({ field }) => (
                  <SelectFieldForm
                    field={field}
                    datas={TIME_SLOTS_WITH_NEXT_DAY}
                    label="To"
                    className="w-full"
                  />
                )}
              />
            </FormItem>
          </FormItem>
        )}
      </CardContent>
    </Card>
  );
};

export default BreakfastAmenities;
