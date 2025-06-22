import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { selectTime, timeNextDay } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import YesNoButton from '@/components/yes-no-button';

import {
  LATE_CHECK_IN_FEE_TYPE_OPTIONS,
  SURCHARGE_TYPE_OPTIONS,
} from '@/lib/constants';
import RadioForm from '@/components/radio-form';
import { Input } from '@/components/ui/input';
import { SelectFieldForm } from '@/components/select-field-form';
import { HotelPolicyProp } from '..';

const CheckInPolicy = ({ control, watch }: HotelPolicyProp) => {
  const isOpen24Hours = watch('isOpen24Hours');
  const isLateCheckIn = watch('isLateCheckIn');
  const lateCheckInType = watch('lateCheckInType');
  const surchargeType = watch('surchargeType');
  const isAdvancedNoticeCheckIn = watch('isAdvancedNoticeCheckIn');
  return (
    <Card>
      <CardHeader>
        <CardTitle>Check-In Time</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <FormItem className="flex flex-col md:flex-row md:justify-between max-w-md">
            <FormField
              control={control}
              name="checkInStartTime"
              render={({ field }) => (
                <SelectFieldForm
                  field={field}
                  datas={selectTime}
                  label="From"
                />
              )}
            />
            <FormField
              control={control}
              name="checkInEndTime"
              render={({ field }) => (
                <SelectFieldForm
                  field={field}
                  datas={timeNextDay}
                  label="To"
                  disabled={!!isOpen24Hours}
                />
              )}
            />
          </FormItem>
          <FormField
            control={control}
            name="isOpen24Hours"
            render={({ field }) => (
              <FormItem className="flex gap-2 items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Open 24 hours</FormLabel>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="isLateCheckIn"
          render={({ field }) => (
            <YesNoButton
              field={field}
              description="Is late check-in available?"
              disabled={!!isOpen24Hours}
            />
          )}
        />
        {isLateCheckIn && (
          <FormItem className="space-y-3">
            <FormField
              control={control}
              name="lateCheckInType"
              render={({ field }) => (
                <RadioForm
                  field={field}
                  data={LATE_CHECK_IN_FEE_TYPE_OPTIONS}
                  label="Late check-in cost"
                />
              )}
            />
            {lateCheckInType === 'SURCHARGE' && (
              <FormItem className="space-y-4">
                <FormField
                  control={control}
                  name="surchargeType"
                  render={({ field }) => (
                    <RadioForm field={field} data={SURCHARGE_TYPE_OPTIONS} />
                  )}
                />
                {surchargeType !== 'FEE_VARIES' && (
                  <FormField
                    control={control}
                    name="surchargeAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {surchargeType === 'AMOUNT' ? 'Amount is NGN' : '%'}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormItem>
                  <FormDescription className="text-base font-semibold">
                    When does the late check-in surcharge apply?
                  </FormDescription>
                  <FormItem className="flex flex-col md:flex-row gap-3 md:items-center">
                    <FormField
                      control={control}
                      name="lateCheckInStartTime"
                      render={({ field }) => (
                        <SelectFieldForm
                          field={field}
                          datas={selectTime}
                          label="From"
                        />
                      )}
                    />
                    <FormField
                      control={control}
                      name="lateCheckInEndTime"
                      render={({ field }) => (
                        <SelectFieldForm
                          field={field}
                          datas={timeNextDay}
                          label="To"
                        />
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                  <FormMessage />
                </FormItem>
                <FormMessage />
              </FormItem>
            )}

            <FormField
              control={control}
              name="isAdvancedNoticeCheckIn"
              render={({ field }) => (
                <FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Advanced notice check in</FormLabel>
                    <FormMessage />
                  </FormItem>
                  {isAdvancedNoticeCheckIn && (
                    <FormField
                      control={control}
                      name="advanceNoticeCheckInTime"
                      render={({ field }) => (
                        <SelectFieldForm
                          field={field}
                          datas={selectTime}
                          label="Advanced notice required after"
                        />
                      )}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormItem>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckInPolicy;
