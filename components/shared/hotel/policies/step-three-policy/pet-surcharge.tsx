import RadioForm from '@/components/radio-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SelectFieldForm } from '@/components/select-field-form';
import {
  PET_FEE_DURATION_OPTIONS,
  PET_SURCHARGE_TYPE_OPTIONS,
  BOOLEAN_OPTIONS,
} from '@/lib/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { HotelPolicyProp } from '..';

const PetSurcharge = ({ control, watch }: HotelPolicyProp) => {
  const isPetSurcharged = watch('isPetSurcharged');
  const isMaxFeePerStay = watch('isMaxFeePerStay');

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <FormField
          control={control}
          name="isPetSurcharged"
          render={({ field }) => (
            <FormItem>
              <>
                <FormControl>
                  <RadioForm
                    field={field}
                    label="Do you have a surcharge for pets?"
                    isBoolean={true}
                    data={BOOLEAN_OPTIONS}
                  />
                </FormControl>
                <FormMessage />
              </>
              {isPetSurcharged && (
                <div className="space-y-4">
                  <FormItem className="flex flex-col md:flex-row gap-3 md:items-center">
                    <FormField
                      control={control}
                      name="petSurchargeAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount in NGN</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="petSurchargeType"
                      render={({ field }) => (
                        <SelectFieldForm
                          field={field}
                          datas={PET_SURCHARGE_TYPE_OPTIONS}
                          label="Type"
                        />
                      )}
                    />
                    <FormField
                      control={control}
                      name="petSurchargeDuration"
                      render={({ field }) => (
                        <SelectFieldForm
                          field={field}
                          datas={PET_FEE_DURATION_OPTIONS}
                          label="Duration"
                        />
                      )}
                    />
                  </FormItem>

                  <FormItem>
                    <div className="space-y-4">
                      <FormField
                        control={control}
                        name="isMaxFeePerStay"
                        render={({ field }) => (
                          <FormItem>
                            <FormItem className="flex gap-3 items-center">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-base">
                                Maximum Fee per stay
                              </FormLabel>
                              <FormMessage />
                            </FormItem>
                            {isMaxFeePerStay && (
                              <FormField
                                control={control}
                                name="maxFeePerStayAmount"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Amount in NGN</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        value={field.value ?? undefined}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={control}
                      name="isPetFeeVaried"
                      render={({ field }) => (
                        <FormItem className="flex gap-3 items-center">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-base">
                            Pet fee may vary based on length of stay
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                </div>
              )}
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PetSurcharge;
