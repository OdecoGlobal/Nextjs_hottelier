import {
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from './ui/form';
import { RadioGroupItem, RadioGroup } from './ui/radio-group';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { GeneratedTypes } from '@/types';

interface RadioFormProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  data: GeneratedTypes[];
}

const RadioForm = <T extends FieldValues>({
  field,
  data,
  label,
}: RadioFormProps<T>) => {
  return (
    <FormItem>
      <FormDescription className="font-semibold text-base">
        {label}
      </FormDescription>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          value={field.value}
          className="flex items-center gap-2"
        >
          {data.map(option => (
            <FormItem key={option.value} className="flex items-center gap-3">
              <FormControl>
                <RadioGroupItem value={option.value} />
              </FormControl>
              <FormLabel>{option.label}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default RadioForm;
