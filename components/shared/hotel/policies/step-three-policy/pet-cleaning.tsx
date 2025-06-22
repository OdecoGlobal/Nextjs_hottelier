import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { HotelPolicyProp } from '..';

const PetCleaningField = ({ control, watch }: HotelPolicyProp) => {
  const isPetCleaningFee = watch('isPetCleaningFee');
  return (
    <FormItem>
      <FormField
        control={control}
        name="isPetCleaningFee"
        render={({ field }) => (
          <FormItem className="flex gap-3 items-center">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>

            <FormLabel className="text-base">Pet cleaning fee</FormLabel>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-48">
                Guests will be charged a fee for additional cleaning after pets
                stay.
              </TooltipContent>
            </Tooltip>
            <FormMessage />
          </FormItem>
        )}
      />
      {isPetCleaningFee && (
        <FormField
          control={control}
          name="petCleaningFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Amount in NGN</FormLabel>
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
    </FormItem>
  );
};

export default PetCleaningField;
