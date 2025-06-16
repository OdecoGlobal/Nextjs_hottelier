import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import YesNoButton from '@/components/yes-no-button';
import { Wifi } from 'lucide-react';
import { HotelAmenitiesProps } from '..';

const BreakfastAmenities = ({ control, watch }: HotelAmenitiesProps) => {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardDescription className="flex gap-2 text-base font-semibold items-center">
          <Wifi className="w-4 h-4" /> Is Internet Available?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          name="isBreakfast"
          control={control}
          render={({ field }) => (
            <div className="space-y-4">
              <FormItem>
                <FormControl>
                  <YesNoButton field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default BreakfastAmenities;
