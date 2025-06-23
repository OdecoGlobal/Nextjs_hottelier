import { Card, CardContent } from '@/components/ui/card';
import { FormField } from '@/components/ui/form';

import CheckboxForm from '@/components/checkbox-form';
import {
  AIR_CONDITIONING_OPTIONS,
  CLIMATE_CONTROL_OPTION,
  HEATING_OPTION,
} from '@/lib/constants';
import RadioForm from '@/components/radio-form';
import { AddRoomControl } from '..';

const ClimateControl = ({ control }: AddRoomControl) => {
  return (
    <Card>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="climateControl"
          render={({ field }) => (
            <CheckboxForm
              field={field}
              data={CLIMATE_CONTROL_OPTION}
              nestedElements={{
                AIR_CONDITIONING: (
                  <FormField
                    control={control}
                    name="airConditionType"
                    render={({ field }) => (
                      <RadioForm
                        field={field}
                        data={AIR_CONDITIONING_OPTIONS}
                        className="flex flex-col items-start gap-3 my-2"
                      />
                    )}
                  />
                ),
                HEATING: (
                  <FormField
                    control={control}
                    name="heatingType"
                    render={({ field }) => (
                      <RadioForm
                        field={field}
                        data={HEATING_OPTION}
                        className="flex flex-col items-start gap-3 my-2"
                      />
                    )}
                  />
                ),
              }}
            />
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ClimateControl;
