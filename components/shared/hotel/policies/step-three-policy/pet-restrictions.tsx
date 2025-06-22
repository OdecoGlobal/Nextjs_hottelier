import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import PetAllowedAreas from './pet-allowed-areas';
import { HotelPolicyProp } from '..';

const PetRestrictionField = ({ control, watch }: HotelPolicyProp) => {
  const isPetRestricted = watch('isPetRestricted');
  const isMaxWeightPerPet = watch('isMaxWeightPerPet');
  return (
    <FormItem>
      <FormField
        control={control}
        name="isPetRestricted"
        render={({ field }) => (
          <FormItem className=" flex items-center gap-3">
            <FormControl>
              <Checkbox
                onCheckedChange={field.onChange}
                checked={field.value}
              />
            </FormControl>
            <FormLabel className="text-base">Restrictions</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
      {isPetRestricted && (
        <>
          <FormItem>
            <FormField
              control={control}
              name="isMaxWeightPerPet"
              render={({ field }) => (
                <>
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-base">
                      Maximum weight per pet
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                  {isMaxWeightPerPet && (
                    <FormField
                      control={control}
                      name="petMaxWeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max weight (in kg)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full max-w-md"
                              value={field.value ?? undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <PetAllowedAreas control={control} />
                </>
              )}
            />
          </FormItem>
        </>
      )}
    </FormItem>
  );
};

export default PetRestrictionField;
