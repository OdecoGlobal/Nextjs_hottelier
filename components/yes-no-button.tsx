import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { Button } from './ui/button';
import { FormControl, FormDescription, FormItem, FormMessage } from './ui/form';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Info } from 'lucide-react';

interface YesNoButtonProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  description?: string;
  info?: boolean;
  infoText?: string;
  disabled?: boolean;
}
const YesNoButton = <T extends FieldValues>({
  field,
  description,
  info,
  infoText,
  disabled,
}: YesNoButtonProps<T>) => {
  return (
    <FormItem>
      <div className="flex gap-3 items-center">
        <FormDescription className="font-bold text-lg md:text-xl">
          {description}
        </FormDescription>
        {info && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-44">{infoText}</TooltipContent>
          </Tooltip>
        )}
      </div>
      <FormControl>
        <div className="flex gap-3">
          <Button
            type="button"
            disabled={disabled}
            variant={field.value === true ? 'default' : 'outline'}
            className={`rounded-full ${
              field.value === true
                ? 'bg-blue-600 text-gray-100 hover:bg-blue-800'
                : ''
            }`}
            onClick={() => field.onChange(true)}
          >
            Yes
          </Button>
          <Button
            type="button"
            disabled={disabled}
            variant={field.value === false ? 'default' : 'outline'}
            className={`rounded-full ${
              field.value === false
                ? 'bg-blue-600 text-gray-100 hover:bg-blue-800'
                : ''
            }`}
            onClick={() => field.onChange(false)}
          >
            No
          </Button>
        </div>
      </FormControl>

      <FormMessage />
    </FormItem>
  );
};

export default YesNoButton;
