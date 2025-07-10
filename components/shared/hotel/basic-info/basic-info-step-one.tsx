import { SelectFieldForm } from '@/components/select-field-form';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ACCEPTED_CURRENCIES, HOTEL_TYPES_OPTIONS } from '@/lib/constants';
import { HotelBasicInfoType } from '@/types';

import { Info } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

const HotelBasicInfoStepOne = ({
  form,
}: {
  form: UseFormReturn<HotelBasicInfoType>;
}) => {
  return (
    <>
      <p className="text-muted-foreground font-semibold">Step 1 of 3</p>
      <h1 className="text-xl md:text-2xl font-bold">
        Tell us a little about your property
      </h1>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Property Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Tell us a little about your property"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="hotelType"
        render={({ field }) => (
          <SelectFieldForm
            field={field}
            datas={HOTEL_TYPES_OPTIONS}
            label="Property Type"
          />
        )}
      />

      <FormField
        control={form.control}
        name="roomUnitTotal"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Number of rooms/units</FormLabel>
            <FormControl>
              <div className="flex justify-center items-center">
                <Input {...field} type="number" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="w-56">
                    <p>
                      Please note that an apartment or house counts as one unit.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Official Website</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                autoComplete="hotel-website"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="acceptedCurrency"
        render={({ field }) => (
          <SelectFieldForm
            field={field}
            datas={ACCEPTED_CURRENCIES}
            label="Accepted Currency"
          />
        )}
      />
    </>
  );
};

export default HotelBasicInfoStepOne;
