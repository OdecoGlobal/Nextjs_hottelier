import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form';
import RadioForm from '@/components/radio-form';
import { OUTDOOR_SPACE_OPTIONS, BOOLEAN_OPTIONS } from '@/lib/constants';
import { SelectFieldForm } from '@/components/select-field-form';
import { AddRoomControl } from '..';

const OutdoorSpace = ({ control }: AddRoomControl) => {
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
              data={BOOLEAN_OPTIONS}
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
