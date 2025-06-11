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
import { DAYS_OBJ } from '@/lib/constants';

interface SelectTimeProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  selectTime: GeneratedTypes[];
}

const SelectTime = <T extends FieldValues>({
  field,
  disabled,
  selectTime,
  label,
}: SelectTimeProps<T>) => {
  return (
    <FormItem>
      <Select
        onValueChange={field.onChange}
        disabled={disabled}
        value={field.value || ''}
      >
        <FormLabel className="text-muted-foreground">{label}</FormLabel>
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          {selectTime.map(time => (
            <SelectItem key={time.value} value={time.value}>
              {time.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

interface SelectDaysProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  placeholder?: string;
}

const SelectDays = <T extends FieldValues>({
  field,
  disabled,
}: SelectDaysProps<T>) => {
  return (
    <Select
      onValueChange={field.onChange}
      disabled={disabled}
      value={field.value || ''}
    >
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Day" />
        </SelectTrigger>
      </FormControl>

      <SelectContent>
        {DAYS_OBJ.map(day => (
          <SelectItem key={day.value} value={day.value}>
            {day.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SelectDays, SelectTime };
