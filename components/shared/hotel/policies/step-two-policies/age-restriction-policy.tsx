import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StepTwoPolicyControl } from '.';

const AgeRestrictionPolicy = ({ control }: StepTwoPolicyControl) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Restriction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="minCheckInAgeAllowed"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                value={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="w-full max-w-md min-h-fit">
                    <SelectValue placeholder="Select minimum age requirement" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 11 }, (_, i) => i + 15).map(num => {
                    return (
                      <SelectItem key={num} value={String(num)}>
                        {num}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default AgeRestrictionPolicy;
