import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StepThreeAddRoomType } from '.';
import { FormField } from '@/components/ui/form';
import RadioForm from '@/components/radio-form';
import { OUTDOOR_SPACE_OPTIONS, RADIO_BOOLEAN } from '@/lib/constants';
import { SelectFieldForm } from '@/components/select-field-form';
import { Control } from 'react-hook-form';

const OutdoorSpace = ({
  control,
}: {
  control: Control<StepThreeAddRoomType>;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground text-base md:text-xl">
          Outdoor Space
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="isOutDoorSpace"
          render={({ field }) => (
            <RadioForm
              field={field}
              className="flex flex-col items-start"
              label="Does this room have outdoor space?"
              data={RADIO_BOOLEAN}
              isBoolean={true}
              nestedOnValue="true"
              nestedElement={
                <FormField
                  control={control}
                  name="outDoorSpaceType"
                  render={({ field }) => (
                    <SelectFieldForm
                      field={field}
                      label="Room view"
                      datas={OUTDOOR_SPACE_OPTIONS}
                      className="w-full"
                    />
                  )}
                />
              }
            />
          )}
        />
      </CardContent>
    </Card>
  );
};

export default OutdoorSpace;
