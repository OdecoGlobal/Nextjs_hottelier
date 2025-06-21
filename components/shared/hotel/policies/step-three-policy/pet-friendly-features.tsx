import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PET_FRIENDLY_FEATURES_OPTIONS } from '@/lib/constants';

import { StepThreePolicyControl } from '.';

const PetFriendlyFeaturesField = ({ control }: StepThreePolicyControl) => {
  return (
    <FormItem className="space-y-2">
      <FormDescription className="font-bold">
        Pet Friendly Features
      </FormDescription>
      {PET_FRIENDLY_FEATURES_OPTIONS.map(method => (
        <FormField
          key={method.value}
          control={control}
          name="petFriendlyFeatures"
          render={({ field }) => {
            const value = field.value || [];
            return (
              <FormItem className="flex flex-row items-center gap-4">
                <FormControl>
                  <Checkbox
                    checked={value?.includes(method.value)}
                    onCheckedChange={checked => {
                      return checked
                        ? field.onChange([...value, method.value])
                        : field.onChange(
                            value?.filter(value => value !== method.value)
                          );
                    }}
                  />
                </FormControl>
                <FormLabel>{method.label}</FormLabel>
              </FormItem>
            );
          }}
        />
      ))}
      <FormMessage />
    </FormItem>
  );
};

export default PetFriendlyFeaturesField;
