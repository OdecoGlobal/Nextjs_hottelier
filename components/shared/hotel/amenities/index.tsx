'use client';
import { Control, useForm, UseFormWatch } from 'react-hook-form';
import HotelCreationSteps from '../creation-steps';
import { HotelAmenitiesType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { hotelAmenitiesSchema } from '@/lib/schemas/grouped-validators';
import { Form } from '@/components/ui/form';
import WifiAmenities from './wifi';
import BreakfastAmenities from './breakfast';
import { updateHotelAmenities } from '@/lib/actions/hotel.action';
import { useRouter } from 'next/navigation';
import SubmitFormButton from '@/components/submit-form-button';
import { defaultHotelAmenities } from '@/lib/constants/hotel-default-values';
import { useOnboardHotelById } from '@/hooks/use-onboard-hotels';
export type HotelAmenitiesProps = {
  control: Control<HotelAmenitiesType>;
  watch: UseFormWatch<HotelAmenitiesType>;
};

const MainAmenitiesForm = ({
  hotelId,
  hotelAmenities,
}: {
  hotelId: string;
  hotelAmenities: HotelAmenitiesType;
}) => {
  const { data, isPending: dataLoading } = useOnboardHotelById({ hotelId });
  const router = useRouter();
  const form = useForm<HotelAmenitiesType>({
    resolver: zodResolver(hotelAmenitiesSchema),
    defaultValues: hotelAmenities ?? defaultHotelAmenities,
  });

  if (dataLoading || !data) {
    return <>Loading</>;
  }
  const { status, completionSteps } = data! ?? {};
  const onSubmit = async (values: HotelAmenitiesType) => {
    await updateHotelAmenities(values, hotelId);

    router.replace(`/onboard//hotel/${hotelId}/photos`);
  };
  const { control, watch, formState } = form;
  const isPending = formState.isSubmitting;

  return (
    <section className="flex flex-col md:flex-row md:min-h-screen">
      <HotelCreationSteps
        current={3}
        hotelId={hotelId}
        status={status}
        completedSteps={completionSteps}
      />

      <div className=" flex-1 wrapper">
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
