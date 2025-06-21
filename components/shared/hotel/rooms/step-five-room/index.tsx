import SubmitFormButton from '@/components/submit-form-button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PRICING_MODEL_OPTIONS } from '@/lib/constants';
import { StepFiveAddRoomSchema } from '@/lib/schemas/grouped-validators';
import { PricingExample } from '@/lib/utils';
import { StepFiveAddRoomType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
type StepFiveAddRoomProps = {
  onPrevious: () => void;
};

const StepFiveAddRoom = ({ onPrevious }: StepFiveAddRoomProps) => {
  const form = useForm<StepFiveAddRoomType>({
    resolver: zodResolver(StepFiveAddRoomSchema),
  });

  const { control, formState } = form;
  const isPending = formState.isSubmitting;

  const renderExample = (example: PricingExample) => {
    if ('extraFee' in example) {
      return (
        <>
          <div>
            {example.baseOccupancy} - {example.baseRate}
          </div>
          <div>
            {example.extraFeeLabel}: {example.extraFee}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>{example.baseOccupancy}</div>
          {example.additionalRates.map((rate, idx) => (
            <div key={idx}>
              {rate.guests}: {rate.rate}
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={control}
          name="pricingModel"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col w-full gap-4"
                >
                  {PRICING_MODEL_OPTIONS.map(option => (
                    <Card
                      key={option.value}
                      className={`w-full border ${
                        field.value === option.value
                          ? 'ring-2 ring-primary'
                          : 'hover:border-muted'
                      }`}
                    >
                      <CardHeader className="flex flex-col justify-between space-y-0 p-4 pb-0">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value={option.value} />
                          <span className="font-medium text-lg">
                            {option.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </p>
                      </CardHeader>

                      <CardContent className="pt-2 pb-4 pl-10 space-y-2">
                        <ul className="list-disc text-muted-foreground text-sm ml-4">
                          {option.notes.map((note, idx) => (
                            <li key={idx}>{note}</li>
                          ))}
                        </ul>
                        <div className="bg-accent p-6 rounded-2xl  mt-2">
                          <p className="text-sm font-medium">Example</p>
                          <div className="text-sm mt-1">
                            {renderExample(option.example)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <SubmitFormButton
          action="Submit"
          isPending={isPending}
          showPrevious={true}
          onPrevious={onPrevious}
          showSteps={true}
          currentStep={5}
          totalSteps={5}
        />
      </form>
    </Form>
  );
};

export default StepFiveAddRoom;
