import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getRoomTypeLabel, getRoomClassLabel } from '@/lib/constants';
import { AddRoomType } from '@/types';
import { Check, Info, Pencil, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface StepTwoProps {
  form: UseFormReturn<AddRoomType>;
}

const StepTwoAddRoom = ({ form }: StepTwoProps) => {
  const [isEditable, setIsEditable] = useState(false);

  const roomTypeLabel = getRoomTypeLabel(form.getValues('roomType'));
  const roomClassLabel = getRoomClassLabel(form.getValues('roomClass'));
  const generatedName = [roomClassLabel, roomTypeLabel, 'Room']
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    form.setValue('name', generatedName);
  }, [generatedName, form]);

  const { control, reset } = form;

  const handleToggleEdit = () => {
    if (isEditable) {
      reset({ name: generatedName });
    }
    setIsEditable(!isEditable);
  };

  const handleSaveEdit = () => {
    setIsEditable(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review your name</CardTitle>
        <CardDescription>
          This name was created based on your previous selction, using details
          travelers find important. It is easier for rooms to be compared when
          they names are standardized. We advice that you don&apos;t make any
          changes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel>Room Name</FormLabel>
                {!isEditable ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleEdit}
                    className="text-primary gap-1"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleSaveEdit}
                      className="text-green-600 gap-1"
                    >
                      <Check className="h-4 w-4" />
                      Save
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleToggleEdit}
                      className="text-destructive gap-1"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="relative">
                <FormControl>
                  <Input
                    {...field}
                    readOnly={!isEditable}
                    className={
                      isEditable
                        ? 'pr-12 bg-background'
                        : 'pr-12 bg-muted cursor-not-allowed opacity-70'
                    }
                    placeholder={generatedName}
                  />
                </FormControl>
              </div>
              <FormMessage />

              {!isEditable && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Preview:</span>{' '}
                  {field.value || generatedName}
                </p>
              )}
            </FormItem>
          )}
        />
        <div className="bg-accent p-5 rounded-2xl text-sm md:text-base">
          <h3 className="text-sm font-semibold flex items-center gap-3">
            <Info className="w-4 h-4" /> A quick note
          </h3>
          <p>We recommend a standard room name for a few reason</p>
          <li className="list-disc">
            It&lsquo;s created based on of infromation you gave us
          </li>
          <li className=" list-disc">
            It&lsquo;s consistent across the site, making it easier for
            travlelers to find and compare rooms{' '}
          </li>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepTwoAddRoom;
