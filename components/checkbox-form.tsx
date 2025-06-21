import {
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormMessage,
} from './ui/form';
import { Checkbox } from './ui/checkbox';
import { GeneratedTypes } from '@/types';
import { FieldValues, ControllerRenderProps, Path } from 'react-hook-form';

interface CheckboxProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  label?: string;
  className?: string;
  data: GeneratedTypes[];
  nestedElements?: Record<string, React.ReactNode>;
}

const CheckboxForm = <T extends FieldValues>({
  field,
  data,
  disabled,
  label,
  nestedElements = {},
}: CheckboxProps<T>) => {
  const selectedValues: string[] = field.value || [];
  return (
    <>
      <FormDescription className="font-semibold text-base md:text-xl">
        {label}
      </FormDescription>
      <FormMessage />
      {data.map(option => {
        const isChecked = selectedValues?.includes(option.value);
        return (
          <div key={option.value}>
            <FormItem className="flex flex-row items-center gap-4">
              <FormControl>
                <Checkbox
                  disabled={disabled}
                  checked={isChecked}
                  onCheckedChange={checked => {
                    const updated = checked
                      ? [...selectedValues, option.value]
                      : selectedValues.filter(v => v !== option.value);
                    field.onChange(updated);
                  }}
                />
              </FormControl>
              <FormLabel className="font-normal">{option.label}</FormLabel>
            </FormItem>

            {isChecked && nestedElements[option.value] && (
              <div className="ml-5"> {nestedElements[option.value]}</div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default CheckboxForm;
