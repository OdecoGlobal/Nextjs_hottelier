import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { StepOnePolicyControl } from '.';

const HotelTaxPolicy = ({ control }: StepOnePolicyControl) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Taxes and fees</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="isTaxIncludedInRoomRates"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={val => field.onChange(val === 'true')}
                  value={String(field.value)}
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel>Yes, taxes are included in rate</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel>No, add these taxes to the rate</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default HotelTaxPolicy;
