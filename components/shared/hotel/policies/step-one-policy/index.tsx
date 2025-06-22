import { UseFormReturn } from 'react-hook-form';
import PaymentMethodPolicy from './payment-method-policy';
import DepositRequiredPolicy from './deposit-required-policy';
import CancellationPolicy from './cancellation-policy';
import AdditionalFieldPolicy from './additional-field-policy';
import SmokingFieldPolicy from './smoking-field-policy';
import HotelTaxPolicy from './hotel-tax-policy';
import { HotelPolicyType } from '@/types';

const StepOnePolicy = ({ form }: { form: UseFormReturn<HotelPolicyType> }) => {
  const { control, watch } = form;

  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold">Basic Hotel Policies</h1>
      <PaymentMethodPolicy control={control} />
      <DepositRequiredPolicy control={control} watch={watch} />
      <CancellationPolicy control={control} />
      <HotelTaxPolicy control={control} />
      <SmokingFieldPolicy control={control} />
      <AdditionalFieldPolicy control={control} watch={watch} />
    </>
  );
};

export default StepOnePolicy;
