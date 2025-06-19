import CloudinaryImageUploader from '@/components/shared/images/cloud-image-upload';
import SubmitFormButton from '@/components/submit-form-button';
import { Form, FormField } from '@/components/ui/form';
import { StepFourAddRoomSchema } from '@/lib/schemas/grouped-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type StepFourAddRoomType = z.infer<typeof StepFourAddRoomSchema>;
interface StepFourProps {
  onNext: (data: StepFourAddRoomType) => void;
  onPrevious: () => void;
  hotelId: string;
  userName: string;
}

const AddRooomImages = ({
  onNext,
  onPrevious,
  hotelId,
  userName,
}: StepFourProps) => {
  const form = useForm<StepFourAddRoomType>({
    resolver: zodResolver(StepFourAddRoomSchema),
  });

  const { handleSubmit, formState, control } = form;
  const isPending = formState.isSubmitting;
  const baseFolder = `/hotellier/${userName}/${hotelId}/rooms`;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
        <FormField
          control={control}
          name="roomImages"
          render={() => (
            <CloudinaryImageUploader
              form={form}
              fieldName="roomImages"
              maxImages={5}
              maxSize={5}
              folder={baseFolder}
              labelText="Rooms"
            />
          )}
        />
        <SubmitFormButton
          action="Submit"
          isPending={isPending}
          showSteps={true}
          showPrevious={true}
          onPrevious={onPrevious}
          currentStep={4}
          totalSteps={5}
        />
      </form>
    </Form>
  );
};

export default AddRooomImages;
