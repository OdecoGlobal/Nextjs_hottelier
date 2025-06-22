import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { HotelAmenitiesProps } from '..';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import YesNoButton from '@/components/yes-no-button';
import { Wifi } from 'lucide-react';
import { WIFI_AREA_OPTIONS } from '@/lib/constants';
import { Checkbox } from '@/components/ui/checkbox';
import WifiTypeComponent from './wifi-type';

const WifiAmenities = ({ control, watch }: HotelAmenitiesProps) => {
  const isWifi = watch('isWifi');
  const wifiArea = watch('wifiArea');

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardDescription className="flex gap-2 text-base font-semibold items-center">
          <Wifi className="w-4 h-4" /> Is Internet Available?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          name="isWifi"
          control={control}
          render={({ field }) => <YesNoButton field={field} />}
        />
        {isWifi && (
          <FormItem className="space-y-4">
            <FormField
              control={control}
              name="wifiArea"
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  {WIFI_AREA_OPTIONS.map(option => (
                    <div key={option.value} className="space-y-4 ">
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.value)}
                            onCheckedChange={checked => {
                              const checkedValue = field.value || [];
                              return checked
                                ? field.onChange([
                                    ...checkedValue,
                                    option.value,
                                  ])
                                : field.onChange(
                                    checkedValue.filter(
                                      value => value !== option.value
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{option.label}</FormLabel>
                      </FormItem>
                      {wifiArea?.includes(option.value) && (
                        <div className="ml-7">
                          <WifiTypeComponent
                            control={control}
                            watch={watch}
                            prefix={
                              option.value === 'IN_GUEST_ROOM'
                                ? 'room'
                                : 'public'
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </FormItem>
              )}
            />
          </FormItem>
        )}
      </CardContent>
    </Card>
  );
};

export default WifiAmenities;
/*
     {wifiArea?.includes('IN_GUEST_ROOM') && (
          <WifiTypeComponent control={control} watch={watch} prefix={'room'} />
        )}
        {wifiArea?.includes('IN_PUBLIC_AREA') && (
          <WifiTypeComponent
            control={control}
            watch={watch}
            prefix={'public'}
          />
        )}
*/
