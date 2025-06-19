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
import { cn } from '@/lib/utils';
import React from 'react';

interface RadioFormProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  data: GeneratedTypes[];
  isBoolean?: boolean;
  className?: string;
  nestedOnValue?: string;
  nestedElement?: React.ReactNode;
}

const RadioForm = <T extends FieldValues>({
  field,
  data,
  label,
  className,
  isBoolean = false,
  nestedOnValue,
  nestedElement,
}: RadioFormProps<T>) => {
  const selectedValue = isBoolean ? String(field.value) : field.value;
  return (
    <FormItem>
      <FormDescription className="font-semibold text-base md:text-xl">
        {label}
      </FormDescription>
      <FormControl>
        <RadioGroup
          onValueChange={val =>
            field.onChange(isBoolean ? val === 'true' : val)
          }
          value={selectedValue}
          className={cn('flex items-center gap-2', className)}
        >
          {data.map(option => (
            <div key={option.value} className="w-full">
              <FormItem className="flex items-center gap-3">
                <FormControl>
                  <RadioGroupItem value={option.value} />
                </FormControl>
                <FormLabel>{option.label}</FormLabel>
              </FormItem>
              {option.value === nestedOnValue &&
                selectedValue === nestedOnValue && (
                  <div className="pl-6 pt-2">{nestedElement}</div>
                )}
            </div>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default RadioForm;
