'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { CityData, CountryData, HotelBasicInfoType, StateData } from '@/types';
import { LocationSelector } from '@/components/location-selctor';

const HotelBasicInfoStepTwo = ({
  form,
}: {
  form: UseFormReturn<HotelBasicInfoType>;
}) => {
  const countryId = form.watch('countryCode');
  const stateId = form.watch('stateCode');
  return (
    <>
      <p className="text-muted-foreground font-semibold">Step 2 of 3</p>
      <h1 className="text-xl md:text-2xl font-bold">Property Address</h1>

      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Country</FormLabel>
            <LocationSelector
              level="country"
              selectedValue={field.value}
              onSelect={country => {
                form.setValue('country', (country as CountryData).name);
                form.setValue('countryCode', (country as CountryData).iso2);
                form.setValue('state', '');
                form.setValue('city', '');
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>State</FormLabel>

            <LocationSelector
              level="state"
              selectedValue={field.value}
              parentId={countryId}
              onSelect={state => {
                form.setValue('state', (state as StateData).name);
                form.setValue('stateCode', (state as StateData).state_code);
                form.setValue('city', '');
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>City</FormLabel>
            <LocationSelector
              level="city"
              selectedValue={field.value}
              parentId={stateId}
              onSelect={city => {
                form.setValue('city', (city as CityData).name);
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel> Street Address</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your street address" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="zipCode"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel> Zip Code</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your zip code" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default HotelBasicInfoStepTwo;
