import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { GeneratedTypes } from '@/types';

interface SelectFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  datas: GeneratedTypes[];
}

export const SelectFieldForm = <T extends FieldValues>({
  field,
  disabled,
  datas,
  label,
  placeholder = '--select--',
}: SelectFieldProps<T>) => {
  return (
    <FormItem className="w-full max-w-md">
      <Select
        onValueChange={field.onChange}
        disabled={disabled}
        value={field.value || ''}
      >
        <FormLabel className="text-muted-foreground">{label}</FormLabel>
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          {datas.map(data => (
            <SelectItem key={data.value} value={data.value}>
              {data.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
