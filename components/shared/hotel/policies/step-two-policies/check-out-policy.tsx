import { SelectTime } from '@/components/select-time';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { selectTime } from '@/lib/utils';
import { StepTwoPolicyType } from '@/types';
import { Control } from 'react-hook-form';

const CheckOutPolicy = ({
  control,
}: {
  control: Control<StepTwoPolicyType>;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>When do guest need to checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="checkOutTime"
          render={({ field }) => (
            <FormItem>
              <SelectTime
                field={field}
                disabled={false}
                selectTime={selectTime}
                label="Check-out time"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default CheckOutPolicy;
