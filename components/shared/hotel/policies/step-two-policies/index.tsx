
import { Form } from '@/components/ui/form';
import { StepTwoPolicyType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useForm, UseFormWatch } from 'react-hook-form';
import FrontDeskPolicy from './front-desk-policy';
import CheckOutPolicy from './check-out-policy';
import AgeRestrictionPolicy from './age-restriction-policy';
import CheckInPolicy from './check-in-policy';
import { hotelPolicyStepTwoSchema } from '@/lib/schemas/grouped-validators';
import SubmitFormButton from '@/components/submit-form-button';

export type StepTwoPolicyProps = {
  control: Control<StepTwoPolicyType>;
  watch: UseFormWatch<StepTwoPolicyType>;
};
const StepTwoPolicy = ({
  onNext,
  onPrevious,
  defaultValues,
}: {
  onNext: (FormData: StepTwoPolicyType) => void;
  onPrevious: () => void;
  defaultValues: StepTwoPolicyType;
}) => {
  const form = useForm<StepTwoPolicyType>({
    resolver: zodResolver(hotelPolicyStepTwoSchema),
    defaultValues: defaultValues,
  });
  const { control, watch, formState } = form;
  const isPending = formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
        <h1 className="text-xl md:text-2xl font-bold">
          Check-In / Check-Out Policies
        </h1>
        <FrontDeskPolicy control={control} watch={watch} />
        <CheckInPolicy control={control} watch={watch} />
        <CheckOutPolicy control={control} />
        <AgeRestrictionPolicy control={control} />
        <div className="flex justify-between">
          <SubmitFormButton
            isPending={isPending}
            action="Next"
            showPrevious={true}
            onPrevious={onPrevious}
            showSteps={true}
            currentStep={2}
            totalSteps={3}
          />
        </div>
      </form>
    </Form>
  );
};

export default StepTwoPolicy;
