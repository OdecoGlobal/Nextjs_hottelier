import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SMOKING_POLICIES } from '@/types';

import { HotelPolicyControl } from '..';

const SmokingFieldPolicy = ({ control }: HotelPolicyControl) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Smoking Policy</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="smokingPolicy"
          render={({ field }) => (
            <FormItem>
              <FormDescription>Is smoking allowed</FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {SMOKING_POLICIES.map(option => {
                    const isAllowed = option === 'SMOKING_ALLOWED';
                    const isDedignated = option === 'DESIGNATED_AREAS';

                    return (
                      <div key={option} className="space-y-3">
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value={option} />
                          </FormControl>
                          <FormLabel>
                            {isAllowed
                              ? 'Smoking is Allowed'
                              : isDedignated
                              ? 'Smoking is restricted to designated area'
                              : 'Smoking is not allowed'}
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      </div>
                    );
                  })}
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

export default SmokingFieldPolicy;
