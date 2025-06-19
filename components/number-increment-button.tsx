import { FieldValues, ControllerRenderProps, Path } from 'react-hook-form';
import { Input } from './ui/input';
import { FormControl } from './ui/form';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

interface IncrementButton<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}
const NumberIncrementButton = <T extends FieldValues>({
  field,
  min = 1,
  max = 30,
  step = 1,
  disabled = false,
  className,
}: IncrementButton<T>) => {
  const value = Number(field.value) || min;
  const increment = () => {
    const newValue = Math.min(value + step, max);
    field.onChange(newValue);
  };
  const decrement = () => {
    const newValue = Math.max(value - step, min);
    field.onChange(newValue);
  };
  return (
    <div className={cn('flex gap-2 items-center', className)}>
      <button
        type="button"
        className="flex items-center justify-center h-7 w-7 rounded-full cursor-pointer border border-muted-foreground hover:bg-accent text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={decrement}
        disabled={disabled || value <= min}
      >
        <Minus />
      </button>

      <FormControl>
        <Input
          {...field}
          className="w-12 text-center"
          min={min}
          max={max}
          step={step}
        />
      </FormControl>
      <button
        className="flex items-center justify-center h-7 w-7 rounded-full cursor-pointer border border-muted-foreground hover:bg-accent text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={increment}
        type="button"
        disabled={disabled || value >= max}
      >
        <Plus />
      </button>
    </div>
  );
};

export default NumberIncrementButton;
