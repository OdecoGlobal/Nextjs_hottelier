import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HotelPolicyType } from '@/types';
import { Control, UseFormReturn, UseFormWatch } from 'react-hook-form';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import YesNoButton from '@/components/yes-no-button';
import { PawPrint } from 'lucide-react';
import PetSurcharge from './pet-surcharge';
import PetDepositField from './pet-deposit';
import PetCleaningField from './pet-cleaning';
import PetFriendlyFeaturesField from './pet-friendly-features';
import PetRestrictionField from './pet-restrictions';
import SubmitFormButton from '@/components/submit-form-button';
import { SelectFieldForm } from '@/components/select-field-form';
import { ALLOWED_PET_OPTIONS } from '@/lib/constants';

export type StepThreePolicyProp = {
  control: Control<HotelPolicyType>;
  watch: UseFormWatch<HotelPolicyType>;
};
export type StepThreePolicyControl = {
  control: Control<HotelPolicyType>;
};

const StepThreePolicy = ({
  onPrevious,
  onSubmit,
  isPending,
  form,
}: {
  isPending: boolean;
  onPrevious: () => void;
  onSubmit: () => void;
  form: UseFormReturn<HotelPolicyType>;
}) => {
  const { control, watch } = form;
  const isPetAllowed = watch('isPetAllowed');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold">
          Pet Policies
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormItem className="flex flex-col md:flex-row md:items-center  justify-between">
              <FormDescription className="flex items-center gap-2">
                <PawPrint />
                Are Pets allowed
              </FormDescription>
              <FormField
                control={control}
                name="isPetAllowed"
                render={({ field }) => <YesNoButton field={field} />}
              />
            </FormItem>
            {isPetAllowed && (
              <>
                <PetSurcharge control={control} watch={watch} />
                <FormLabel>Do you have pet type restrictions?</FormLabel>
                <FormField
                  name="allowedPetType"
                  control={control}
                  render={({ field }) => (
                    <SelectFieldForm
                      field={field}
                      datas={ALLOWED_PET_OPTIONS}
                    />
                  )}
                />
                <PetRestrictionField control={control} watch={watch} />
                <PetDepositField control={control} watch={watch} />
                <PetCleaningField control={control} watch={watch} />

                <PetFriendlyFeaturesField control={control} />
              </>
            )}

            <SubmitFormButton
              isPending={isPending}
              action="Submit"
              showPrevious={true}
              onPrevious={onPrevious}
              showSteps={true}
              currentStep={3}
              totalSteps={3}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default StepThreePolicy;
