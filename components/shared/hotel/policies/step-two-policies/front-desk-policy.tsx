import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { StepTwoPolicyProps } from '.';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SelectDays, SelectTime } from '@/components/select-time';
import { selectTime, timeNextDay } from '@/lib/utils';
import YesNoButton from '@/components/yes-no-button';
import SelfCheckInPolicy from './self-checkin-policy';
import { Checkbox } from '@/components/ui/checkbox';

const FrontDeskPolicy = ({ control, watch }: StepTwoPolicyProps) => {
  const isFrontDesk = watch('isFrontDesk');
  const isFrontDeskEveryDay = watch('isFrontDeskEveryDay');
  const isFrontDeskOpen24Hours = watch('isFrontDeskOpen24Hours');

  return (
    <Card>
      <CardHeader>
        <CardTitle>FrontDesk Policies</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="isFrontDesk"
          render={({ field }) => (
            <YesNoButton
              field={field}
              description="Is there a front desk at your property?"
            />
          )}
        />
        {isFrontDesk && (
          <div className="space-y-3">
            <FormField
              control={control}
              name="isFrontDeskEveryDay"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    What is the front desk schedule?
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={val => field.onChange(val === 'true')}
                      value={String(field.value)}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel>Everyday</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel>Selected Days</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isFrontDeskEveryDay && (
              <FormItem className="flex flex-col md:flex-row md: justify-between max-w-md">
                <FormField
                  control={control}
                  name="frontDeskScheduleStartDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <SelectDays
                        field={field}
                        disabled={!!isFrontDeskEveryDay}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="frontDeskScheduleEndDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <SelectDays
                        field={field}
                        disabled={!!isFrontDeskEveryDay}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
            )}
            <FormItem className="flex flex-col md:flex-row md:justify-between max-w-md">
              <FormField
                control={control}
                name="frontDeskStartTime"
                render={({ field }) => (
                  <FormItem>
                    <SelectTime
                      field={field}
                      disabled={!isFrontDesk || isFrontDeskOpen24Hours}
                      selectTime={selectTime}
                      label="Desk Opens"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="frontDeskEndTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <SelectTime
                      field={field}
                      disabled={!isFrontDesk || isFrontDeskOpen24Hours}
                      selectTime={timeNextDay}
                      label="Desk Closes"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>

            <FormField
              control={control}
              name="isFrontDeskOpen24Hours"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Open 24 hours</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <SelfCheckInPolicy control={control} watch={watch} />
      </CardContent>
    </Card>
  );
};

export default FrontDeskPolicy;
