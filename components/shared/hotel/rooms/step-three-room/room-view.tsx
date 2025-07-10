import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form';
import RadioForm from '@/components/radio-form';
import { BOOLEAN_OPTIONS, ROOM_VIEW_OPTION } from '@/lib/constants';
import { SelectFieldForm } from '@/components/select-field-form';
import { AddRoomControl } from '..';

const RoomView = ({ control }: AddRoomControl) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground text-base md:text-xl">
          Room View
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="isRoomView"
          render={({ field }) => (
            <RadioForm
              field={field}
              className="flex flex-col items-start"
              label="Does this room have view?"
              data={BOOLEAN_OPTIONS}
              isBoolean={true}
              nestedOnValue="true"
              nestedElement={
                <FormField
                  control={control}
                  name="roomViewType"
                  render={({ field }) => (
                    <SelectFieldForm
                      field={field}
                      label="Room view"
                      datas={ROOM_VIEW_OPTION}
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

export default RoomView;
