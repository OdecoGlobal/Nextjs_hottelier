import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormField } from '@/components/ui/form';
import CheckboxForm from '@/components/checkbox-form';
import { ROOM_LAYOUT_OPTIONS } from '@/lib/constants';
import { Control } from 'react-hook-form';
import { StepThreeAddRoomType } from '.';

const RoomLayoutForm = ({
  control,
}: {
  control: Control<StepThreeAddRoomType>;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground text-base md:text-xl">
          Room layout
        </CardTitle>
        <CardDescription>
          Add any amenity that makes this room special
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="roomLayout"
          render={({ field }) => (
            <CheckboxForm field={field} data={ROOM_LAYOUT_OPTIONS} />
          )}
        />
      </CardContent>
    </Card>
  );
};

export default RoomLayoutForm;
