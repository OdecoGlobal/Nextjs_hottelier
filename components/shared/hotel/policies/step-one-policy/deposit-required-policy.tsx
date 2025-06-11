import { Card, CardContent } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import YesNoButton from '@/components/yes-no-button';
import { StepOnePolicyType } from '@/types';
import { Control, UseFormWatch } from 'react-hook-form';

const DepositRequiredPolicy = ({
  control,
  watch,
}: {
  control: Control<StepOnePolicyType>;
  watch: UseFormWatch<StepOnePolicyType>;
}) => {
  const isDepositRequired = watch('isDepositRequired');
  return (
    <Card>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="isDepositRequired"
          render={({ field }) => (
            <YesNoButton field={field} description="Do you require deposits?" />
          )}
        />
        {isDepositRequired && (
          <FormField
            control={control}
            name="depositAmount"
            render={({ field }) => (
              <FormItem className="space-y-3 max-w-md">
                <FormLabel className="text-muted-foreground">
                  What&apos;s the deposit amount
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Deposit Amount" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default DepositRequiredPolicy;
