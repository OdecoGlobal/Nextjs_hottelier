import { HotelPolicyType } from '@/types';
import { UseFormReturn } from 'react-hook-form';
import FrontDeskPolicy from './front-desk-policy';
import CheckOutPolicy from './check-out-policy';
import AgeRestrictionPolicy from './age-restriction-policy';
import CheckInPolicy from './check-in-policy';

const StepTwoPolicy = ({ form }: { form: UseFormReturn<HotelPolicyType> }) => {
  const { control, watch } = form;

  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold">
        Check-In / Check-Out Policies
      </h1>
      <FrontDeskPolicy control={control} watch={watch} />
      <CheckInPolicy control={control} watch={watch} />
      <CheckOutPolicy control={control} />
      <AgeRestrictionPolicy control={control} />
    </>
  );
};

export default StepTwoPolicy;
