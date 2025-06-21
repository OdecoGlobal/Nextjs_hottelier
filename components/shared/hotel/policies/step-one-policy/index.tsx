import { Form } from '@/components/ui/form';
import { Control, UseFormReturn, UseFormWatch } from 'react-hook-form';
import PaymentMethodPolicy from './payment-method-policy';
import DepositRequiredPolicy from './deposit-required-policy';
import CancellationPolicy from './cancellation-policy';
import AdditionalFieldPolicy from './additional-field-policy';
import SmokingFieldPolicy from './smoking-field-policy';
import HotelTaxPolicy from './hotel-tax-policy';
import { HotelPolicyType } from '@/types';
import SubmitFormButton from '@/components/submit-form-button';

export type StepOnePolicyProp = {
  control: Control<HotelPolicyType>;
  watch: UseFormWatch<HotelPolicyType>;
};
export type StepOnePolicyControl = {
  control: Control<HotelPolicyType>;
};

const StepOnePolicy = ({
  onNext,
  form,
}: {
  onNext: () => void;
  form: UseFormReturn<HotelPolicyType>;
}) => {
  const { control, watch, formState } = form;

  const isPending = formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
        <h1 className="text-xl md:text-2xl font-bold">Basic Hotel Policies</h1>
        <PaymentMethodPolicy control={control} />
        <DepositRequiredPolicy control={control} watch={watch} />
        <CancellationPolicy control={control} />
        <HotelTaxPolicy control={control} />
        <SmokingFieldPolicy control={control} />
        <AdditionalFieldPolicy control={control} watch={watch} />
        <SubmitFormButton
          isPending={isPending}
          action="Next"
          showSteps={true}
          currentStep={1}
          totalSteps={3}
        />
      </form>
    </Form>
  );
};

export default StepOnePolicy;
