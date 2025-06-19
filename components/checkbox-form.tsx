import { FormItem, FormControl, FormLabel, FormDescription } from './ui/form';
import { Checkbox } from './ui/checkbox';
import { GeneratedTypes } from '@/types';
import { FieldValues, ControllerRenderProps, Path } from 'react-hook-form';

interface CheckboxProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  label?: string;
  className?: string;
  data: GeneratedTypes[];
}

const CheckboxForm = <T extends FieldValues>({
  field,
  data,
  disabled,
  label,
}: CheckboxProps<T>) => {
  return (
    <>
      <FormDescription className="font-semibold text-base md:text-xl">
        {label}
      </FormDescription>
      {data.map(option => (
        <FormItem
          className="flex flex-row items-center gap-4"
          key={option.value}
        >
          <FormControl>
            <Checkbox
              disabled={disabled}
              checked={field.value?.includes(option.value)}
              onCheckedChange={checked => {
                return checked
                  ? field.onChange([...field.value, option.value])
                  : field.onChange(
                      field.value?.filter(
                        (value: string) => value !== option.value
                      )
                    );
              }}
            />
          </FormControl>
          <FormLabel className="font-normal">{option.label}</FormLabel>
        </FormItem>
      ))}
    </>
  );
};

export default CheckboxForm;
