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
import { StepOnePolicyProp } from '.';

const DepositRequiredPolicy = ({ control, watch }: StepOnePolicyProp) => {
  const isDepositRequired = watch('isDepositRequired');
  return (
    <Card>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="isDepositRequired"
          render={({ field }) => (
            <FormItem>
              <YesNoButton
                field={field}
                description="Do you require deposits?"
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
                        <Input
                          {...field}
                          placeholder="Deposit Amount"
                          value={field.value ?? undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default DepositRequiredPolicy;
