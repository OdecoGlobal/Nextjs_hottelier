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
import { AddRoomProp } from '..';
import { SelectFieldForm } from '@/components/select-field-form';
import { generateNumbers } from '@/lib/constants';
import { User2Icon } from 'lucide-react';

const BaseRate = ({ control, watch }: AddRoomProp) => {
  const maxNumber = watch('maxOccupancy');
  const baseRate = watch('baseRate');
  const people = watch('peopleInBaseRate');
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set your base rate</CardTitle>
        <CardDescription>
          Travellers will see these rates when searching for rooms.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormItem className="flex items-center gap-2">
          <FormField
            name="baseRate"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Rate in (NGN)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="peopleInBaseRate"
            control={control}
            render={({ field }) => (
              <SelectFieldForm
                field={field}
                datas={generateNumbers(maxNumber)}
                label="Maximum people included in base rate"
              />
            )}
          />
        </FormItem>

        <div className="flex bg-accent gap-2 py-6 px-4 items-center justify-around rounded-2xl">
          <div>
            <h1 className="text-sm font-bold">Ocuppancy</h1>
            <div className="flex items-center gap-3">
              <User2Icon className="w-5 h-5" /> x{people}
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold">Guest pay (NGN)</h1>
            <span className="text-lg">{baseRate}/night</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaseRate;
