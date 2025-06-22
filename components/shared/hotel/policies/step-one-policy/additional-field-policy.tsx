import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { HotelPolicyProp } from '..';

const AdditionalFieldPolicy = ({ control, watch }: HotelPolicyProp) => {
  const hasAdditionalPolicy = watch('hasAdditionalPolicy');
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'additionalPolicy',
  });
  return (
    <Card>
      <CardContent className="space-y-4">
        <CardHeader>
          <CardTitle>Additional Policies</CardTitle>
          <CardDescription>Add your hotels additional policies</CardDescription>
        </CardHeader>
        <FormField
          control={control}
          name="hasAdditionalPolicy"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={checked => {
                      field.onChange(checked);
                      if (checked && fields.length === 0) {
                        append({ value: '' });
                      }
                    }}
                  />
                </FormControl>
                <FormLabel>Add Addtional Policies</FormLabel>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        {hasAdditionalPolicy && (
          <div className="space-y-3">
            {fields.map((field, i) => (
              <FormField
                key={field.id}
                control={control}
                name={`additionalPolicy.${i}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={`Additional policy #${i + 1}`}
                        className="max-w-md"
                      />
                    </FormControl>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(i)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            ))}

            <Button
              onClick={() => append({ value: '' })}
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Plus />
              Add another policy
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdditionalFieldPolicy;
