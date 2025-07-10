import { SelectTime } from '@/components/select-time';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { HotelPolicyControl } from '..';
import { TIME_SLOTS_STANDARD } from '@/lib/constants';

const CheckOutPolicy = ({ control }: HotelPolicyControl) => {
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
                selectTime={TIME_SLOTS_STANDARD}
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
