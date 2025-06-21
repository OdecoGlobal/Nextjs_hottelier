import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { StepThreePolicyProp } from '.';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SelectFieldForm } from '@/components/select-field-form';
import { PET_FEE_DURATION_OPTIONS } from '@/lib/constants';

const PetDepositField = ({ control, watch }: StepThreePolicyProp) => {
  const isPetDeposit = watch('isPetDeposit');
  return (
    <FormItem>
      <FormField
        control={control}
        name="isPetDeposit"
        render={({ field }) => (
          <FormItem className="flex items-center gap-3">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Pet Deposit</FormLabel>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-48">
                Guests must pay a refundable deposit to cover potential damages
              </TooltipContent>
            </Tooltip>
            <FormMessage />
          </FormItem>
        )}
      />
      {isPetDeposit && (
        <FormItem className="flex justify-between items-center">
          <FormField
            control={control}
            name="petDepositAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount in NGN</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full max-w-md "
                    value={field.value ?? undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="petDepositType"
            render={({ field }) => (
              <SelectFieldForm
                field={field}
                datas={PET_FEE_DURATION_OPTIONS}
                label="Duration"
              />
            )}
          />
        </FormItem>
      )}
    </FormItem>
  );
};

export default PetDepositField;
