import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { StepTwoPolicyProps } from '.';
import YesNoButton from '@/components/yes-no-button';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { SELF_CHECK_IN } from '@hotellier/shared';
import { SELF_CHECK_IN_OPTIONS } from '@/lib/constants';

const SelfCheckInPolicy = ({ control, watch }: StepTwoPolicyProps) => {
  const isSelfCheckIn = watch('isSelfCheckIn');
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="isSelfCheckIn"
        render={({ field }) => (
          <FormItem>
            <YesNoButton
              field={field}
              description="Is self check-in available?"
              info={true}
              infoText="Guest can check in without assistance from the front desk or property staff"
            />
          </FormItem>
        )}
      />
      {isSelfCheckIn && (
        <FormField
          control={control}
          name="selfCheckInType"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full max-w-md min-h-fit">
                    <SelectValue placeholder="Select your self check in time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SELF_CHECK_IN.map(type => {
                    return (
                      <SelectItem key={type} value={type}>
                        <div className="flex flex-col">
                          <h1 className="font-semibold text-base">
                            {SELF_CHECK_IN_OPTIONS[type].label}
                          </h1>

                          <p className="font-medium text-muted-foreground">
                            {SELF_CHECK_IN_OPTIONS[type].description}
                          </p>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default SelfCheckInPolicy;
