import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CANCELLATION_FEE_TYPE_OPTIONS,
  CANCELLATION_POLICIES_OPTIONS,
} from '@/lib/constants';
import { StepOnePolicyType } from '@/types';
import { Control } from 'react-hook-form';

const CancellationPolicy = ({
  control,
}: {
  control: Control<StepOnePolicyType>;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cancellation Policy</CardTitle>
        <CardDescription>
          A cancellation window is the amount of time before your local
          cancellation cutoff (18:00) on the day of check-in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="cancellationPolicy"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {CANCELLATION_POLICIES_OPTIONS.map(option => {
                    const isSelected = field.value === option.value;
                    const is24 = option.value === 'HOUR_24';
                    const is48 = option.value === 'HOUR_48';
                    const is72 = option.value === 'HOUR_72';
                    const noRefund = option.value === 'NO_REFUND';
                    const isFree = option.value === 'FREE_CANCELLATION';
                    const needsFeeSelection =
                      is24 || is48 || (is72 && isSelected);

                    return (
                      <div key={option.value} className="space-y-3">
                        <FormItem
                          key={option.value}
                          className="flex items-center gap-3"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel>
                            {is24
                              ? '24-hour cancellation window'
                              : is48
                              ? '48-hour cancellation window'
                              : is72
                              ? '72-hour cancellation window'
                              : noRefund
                              ? 'Non-refundable'
                              : 'Free Cancellation'}
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                        {isSelected && (
                          <div>
                            {noRefund ? (
                              <p className="text-sm text-muted-foreground">
                                Travelers who cancel at any time (including
                                no-shows) are charged 100% of the booking
                                amount.
                              </p>
                            ) : isFree ? (
                              <p className="text-sm text-muted-foreground">
                                Travelers who cancel at any time (including
                                no-shows) are refunded 100% of the booking
                                amount.
                              </p>
                            ) : (
                              <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
                                <li>
                                  Travelers who cancel {option.value.slice(-2)}{' '}
                                  hours or more before 18:00 on the day of
                                  check-in are charged no fee.
                                </li>
                                <li>
                                  Travelers who cancel less than{' '}
                                  {option.value.slice(-2)} hours before 18:00
                                  (including no-shows) are charged:
                                </li>
                              </ul>
                            )}
                            {needsFeeSelection && (
                              <FormField
                                control={control}
                                name="cancellationFeeType"
                                render={({ field: feeField }) => (
                                  <FormItem className="my-3">
                                    <Select
                                      onValueChange={feeField.onChange}
                                      value={feeField.value || ''}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full max-w-md">
                                          <SelectValue placeholder="Select a fee type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {CANCELLATION_FEE_TYPE_OPTIONS.map(
                                          type => {
                                            const is50 =
                                              type.value === 'AMOUNT_50';
                                            const is100 =
                                              type.value === 'AMOUNT_100';
                                            return (
                                              <SelectItem
                                                key={type.value}
                                                value={type.value}
                                              >
                                                {is50
                                                  ? '50% of booking amount'
                                                  : is100
                                                  ? '100% of Booking Amount'
                                                  : '1st night + tax'}
                                              </SelectItem>
                                            );
                                          }
                                        )}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                        )}
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

export default CancellationPolicy;
