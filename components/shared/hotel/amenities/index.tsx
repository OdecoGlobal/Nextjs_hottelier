'use client';
import { Control, useForm, UseFormWatch } from 'react-hook-form';
import HotelCreationSteps from '../creation-steps';
import { AdminOwnerRole, HotelAmenitiesType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { hotelAmenitiesSchema } from '@/lib/schemas/grouped-validators';
import { Form } from '@/components/ui/form';
import WifiAmenities from './wifi';
import BreakfastAmenities from './breakfast';
import { updateHotelAmenities } from '@/lib/actions/hotel.action';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import SubmitFormButton from '@/components/submit-form-button';
import { defaultHotelAmenities } from '@/lib/constants/hotel-default-values';
import { useEffect } from 'react';
export type HotelAmenitiesProps = {
  control: Control<HotelAmenitiesType>;
  watch: UseFormWatch<HotelAmenitiesType>;
};

const MainAmenitiesForm = ({
  hotelId,
  role,
  hotelAmenities,
}: {
  hotelId: string;
  role: AdminOwnerRole;
  hotelAmenities: HotelAmenitiesType | null;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<HotelAmenitiesType>({
    resolver: zodResolver(hotelAmenitiesSchema),
    defaultValues: defaultHotelAmenities,
  });

  console.log(hotelAmenities);
  useEffect(() => {
    if (hotelAmenities) form.reset(hotelAmenities);
  }, [hotelAmenities, form]);

  const onSubmit = async (values: HotelAmenitiesType) => {
    console.log(values, hotelId);
    const res = await updateHotelAmenities(values, hotelId);
    if (!res.success) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: res.message,
      });
    } else {
      toast({
        title: 'Success',
        description: res.message,
        variant: 'default',
      });
      router.replace(`/${role.toLowerCase()}/onboarding/${hotelId}/photos`);
    }
  };
  const { control, watch, formState } = form;
  const isPending = formState.isSubmitting;

  return (
    <section className="flex flex-col md:flex-row md:min-h-screen">
      <HotelCreationSteps current={2} />

      <div className=" flex-1 py-10 px-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-3xl mx-auto"
          >
            <WifiAmenities control={control} watch={watch} />
            <BreakfastAmenities control={control} watch={watch} />
            <SubmitFormButton isPending={isPending} action="Submit" />
          </form>
        </Form>
      </div>
    </section>
  );
};

export default MainAmenitiesForm;
