import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { hotelPolicyStepThreeSchema } from '@/lib/schemas/grouped-validators';
import { ALLOWED_PET_TYPE, StepThreePolicyType } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import YesNoButton from '@/components/yes-no-button';
import { PawPrint } from 'lucide-react';

import PetSurcharge from './pet-surcharge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PetDepositField from './pet-deposit';
import PetCleaningField from './pet-cleaning';
import PetFriendlyFeaturesField from './pet-friendly-features';
import PetRestrictionField from './pet-restrictions';

const StepThreePolicy = ({
  onPrevious,
  onSubmit,
  isPending,
  defaultValues,
}: {
  isPending: boolean;
  onPrevious: () => void;
  onSubmit: (FormData: StepThreePolicyType) => void;
  defaultValues: StepThreePolicyType;
}) => {
  const form = useForm<StepThreePolicyType>({
    resolver: zodResolver(hotelPolicyStepThreeSchema),
    defaultValues: defaultValues,
  });
  const { control, watch } = form;
  const isPetAllowed = watch('isPetAllowed');

  return (
    <Card className="max-w-lg flex-1">
      <CardHeader>
        <CardDescription className="font-semibold text-xl">
          Step 3 of 3
        </CardDescription>
        <CardTitle className="text-xl md:text-2xl font-bold">
          Pet Policies
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormItem className="flex flex-col md:flex-row md:items-center max-w-md justify-between">
              <FormDescription className="flex items-center gap-2">
                <PawPrint />
                Are Pets allowed
              </FormDescription>
              <FormField
                control={control}
                name="isPetAllowed"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <YesNoButton field={field} />
                    {isPetAllowed && (
                      <>
                        <PetSurcharge control={control} watch={watch} />
                        <>
                          <FormLabel>
                            Do you have pet type restrictions?
                          </FormLabel>
                          <FormField
                            name="allowedPetType"
                            control={control}
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full max-w-md">
                                      <SelectValue placeholder="--select--" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {ALLOWED_PET_TYPE.map(type => {
                                      const isDog = type === 'ONLY_DOGS';
                                      const isCat = type === 'ONLY_CATS';
                                      return (
                                        <SelectItem key={type} value={type}>
                                          {isDog
                                            ? 'Only dogs'
                                            : isCat
                                            ? 'Only cats'
                                            : 'Only dogs and cats'}{' '}
                                          are allowed
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <PetRestrictionField
                            control={control}
                            watch={watch}
                          />
                          <PetDepositField control={control} watch={watch} />
                          <PetCleaningField control={control} watch={watch} />
                        </>
                        <PetFriendlyFeaturesField control={control} />
                      </>
                    )}
                  </FormItem>
                )}
              />
            </FormItem>

            <div className="flex justify-between">
              <Button type="button" onClick={onPrevious}>
                Previous
              </Button>
              <Button type="submit" disabled={isPending}>
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StepThreePolicy;
