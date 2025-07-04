import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Property Name</FormLabel>
            <FormControl>
              <div className="flex justify-center items-center">
                <Input {...field} />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="w-56">
                    <p>
                      Use the official name of your property, for example the
                      one you use on your website. Avoid use of special
                      characters. The name should ideally not be less than 35
                      characters for search engine optimization.
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
        name="hotelType"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Property Type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Hotel type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {HOTEL_TYPES_OPTIONS.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
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
        name="acceptedCurrency"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Currency</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select accepted currency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ACCEPTED_CURRENCIES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default HotelBasicInfoStepOne;
