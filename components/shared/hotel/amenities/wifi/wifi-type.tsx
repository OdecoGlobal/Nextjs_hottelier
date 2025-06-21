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
  HOTEL_AMENITY_CHARGE_OPTION,
  WIFI_SPEED_OPTIONS,
  WIFI_SURCHARGE_DURATION_OPTIONS,
} from '@/lib/constants';
import { SelectFieldForm } from '@/components/select-field-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface WifiComponentProps extends HotelAmenitiesProps {
  prefix: 'room' | 'public';
}

const WifiTypeComponent = ({ control, watch, prefix }: WifiComponentProps) => {
  const fieldName = <T extends string>(name: T): `${typeof prefix}${T}` => {
    return `${prefix}${name}`;
  };
  const isDeviceLimited = watch(fieldName('DeviceLimited'));

  const wifiChargeType = watch(fieldName('WifiChargeType'));
  return (
    <FormField
      control={control}
      name={fieldName('WifiChargeType')}
      render={({ field }) => (
        <div className="space-y-4">
          <FormItem>
            <RadioForm field={field} data={HOTEL_AMENITY_CHARGE_OPTION} />
            <FormMessage />
          </FormItem>
          {wifiChargeType === 'SURCHARGE' && (
            <FormItem className="flex items-center gap-3">
              <FormField
                control={control}
                name={fieldName('WifiSurchargeAmout')}
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
                name={fieldName('WifiSurchargeDuration')}
                render={({ field }) => (
                  <SelectFieldForm
                    field={field}
                    label="Surcharge duration"
                    datas={WIFI_SURCHARGE_DURATION_OPTIONS}
                  />
                )}
              />
            </FormItem>
          )}

          <FormField
            control={control}
            name={fieldName('WifiSpeed')}
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
            name={fieldName('DeviceLimited')}
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
                {isDeviceLimited && (
                  <FormField
                    name={fieldName('DeviceLimitNumber')}
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

export default WifiTypeComponent;
