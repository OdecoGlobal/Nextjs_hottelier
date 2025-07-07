/*

 wifiChargeType: z.enum(HOTEL_CHARGE_TYPE).optional(),
  wifiSpeed: z.enum(WIFI_SPEED_TYPE).optional(),
  wifiSurchargeAmout: z.coerce.number().optional(),
  wifiSurchargeDuration: z.enum(WIFI_SURCHARGE_DURATION_TYPE).optional(),
  isDeviceLimited: z.boolean().optional(),
  deviceLimitNumber: z.coerce.number().optional(),*/

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { HotelAmenitiesProps } from '..';
import RadioForm from '@/components/radio-form';
import {
  generateNumbers,
  HOTEL_CHARGE_OPTION,
  WIFI_SPEED_OPTIONS,
  WIFI_SURCHARGE_DURATION_OPTIONS,
} from '@/lib/constants';
import { SelectFieldForm } from '@/components/select-field-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const GuestRoomWifi = ({ control, watch }: HotelAmenitiesProps) => {
  const isRoomDeviceLimited = watch('roomDeviceLimited');

  const roomWifiChargeType = watch('roomWifiChargeType');
  return (
    <FormField
      control={control}
      name="roomWifiChargeType"
      render={({ field }) => (
        <div className="space-y-4">
          <FormItem>
            <RadioForm field={field} data={HOTEL_CHARGE_OPTION} />
            <FormMessage />
          </FormItem>
          {roomWifiChargeType === 'SURCHARGE' && (
            <FormItem className="flex items-center gap-3">
              <FormField
                control={control}
                name="roomWifiSurchargeAmout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surcharge in NGN</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="roomWifiSurchargeDuration"
                render={({ field }) => (
                  <SelectFieldForm
                    field={field}
                    label="Select surcharge duration"
                    datas={WIFI_SURCHARGE_DURATION_OPTIONS}
                  />
                )}
              />
            </FormItem>
          )}

          <FormField
            control={control}
            name="roomWifiSpeed"
            render={({ field }) => (
              <SelectFieldForm
                field={field}
                label="Minimum Wifi Speed"
                datas={WIFI_SPEED_OPTIONS}
              />
            )}
          />
          <FormField
            control={control}
            name="roomDeviceLimited"
            render={({ field }) => (
              <div>
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Is there Device limit?</FormLabel>
                  <FormMessage />
                </FormItem>
                {isRoomDeviceLimited && (
                  <FormField
                    name="roomDeviceLimitNumber"
                    control={control}
                    render={({ field }) => (
                      <SelectFieldForm
                        field={field}
                        datas={generateNumbers(25)}
                      />
                    )}
                  />
                )}
              </div>
            )}
          />
        </div>
      )}
    />
  );
};

export default GuestRoomWifi;
