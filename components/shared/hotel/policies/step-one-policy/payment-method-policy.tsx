import CheckboxForm from '@/components/checkbox-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { FormField, FormItem } from '@/components/ui/form';
import { PAYMENT_METHODS_OPTIONS } from '@/lib/constants';
import { HotelPolicyControl } from '..';

const PaymentMethodPolicy = ({ control }: HotelPolicyControl) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="text-base font-semibold">
          Which payment methods do you accept?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <FormField
          name="paymentMethods"
          control={control}
          render={({ field }) => (
            <FormItem>
              <CheckboxForm field={field} data={PAYMENT_METHODS_OPTIONS} />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default PaymentMethodPolicy;
