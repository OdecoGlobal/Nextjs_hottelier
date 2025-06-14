import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PAYMENT_METHODS_OPTIONS } from '@/lib/constants';
import { StepOnePolicyType } from '@/types';
import { Control } from 'react-hook-form';

const PaymentMethodPolicy = ({
  control,
}: {
  control: Control<StepOnePolicyType>;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="text-base font-semibold">
          Which payment methods do you accept?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <FormItem>
          {PAYMENT_METHODS_OPTIONS.map(method => (
            <FormField
              key={method.value}
              control={control}
              name="paymentMethods"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-center gap-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(method.value)}
                        onCheckedChange={checked => {
                          return checked
                            ? field.onChange([...field.value, method.value])
                            : field.onChange(
                                field.value?.filter(
                                  value => value !== method.value
                                )
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
      </CardContent>
    </Card>
  );
};

export default PaymentMethodPolicy;
