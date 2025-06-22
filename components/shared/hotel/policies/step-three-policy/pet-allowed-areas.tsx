import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PET_RESTRICTION_TYPE } from '@/types';
import { HotelPolicyControl } from '..';

const PetAllowedAreas = ({
  control,
}: HotelPolicyControl) => {
  return (
    <FormItem className="space-y-2">
      <FormDescription className="font-bold">Pet Allowed Areas</FormDescription>
      {PET_RESTRICTION_TYPE.map(type => {
        const isSpecific = type === 'ONLY_SPECIFIC_AREAS';
        const isUnattended = type === 'CANNOT_BE_LEFT_UNATTENDED';
        const isSmoking = type === 'ONLY_SMOKING_ROOMS';

        return (
          <FormField
            key={type}
            control={control}
            name="petRestrictionType"
            render={({ field }) => {
              const value = field.value || [];
              return (
                <FormItem className="flex flex-row items-center gap-4">
                  <FormControl>
                    <Checkbox
                      checked={value?.includes(type)}
                      onCheckedChange={checked => {
                        return checked
                          ? field.onChange([...value, type])
                          : field.onChange(
                              value?.filter(value => value !== type)
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel>
                    {isSmoking
                      ? 'Pets are allowed in smoking rooms only'
                      : isSpecific
                      ? 'Pets are allowed in specific rooms only'
                      : isUnattended
                      ? 'Pets cannot be left unattended'
                      : 'Other pet restrictions apply'}
                  </FormLabel>
                </FormItem>
              );
            }}
          />
        );
      })}
      <FormMessage />
    </FormItem>
  );
};

export default PetAllowedAreas;
