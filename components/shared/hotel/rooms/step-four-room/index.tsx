import CloudinaryImageUploader from '@/components/shared/images/cloud-image-upload';
import { FormField } from '@/components/ui/form';
import { StepFourAddRoomSchema } from '@/lib/schemas/grouped-validators';
import { AddRoomType } from '@/types';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export type StepFourAddRoomType = z.infer<typeof StepFourAddRoomSchema>;
interface StepFourProps {
  form: UseFormReturn<AddRoomType>;
  hotelId: string;
  userName: string;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
}

const AddRooomImages = ({
  form,
  hotelId,
  userName,
  setIsUploading,
}: StepFourProps) => {
  const { control } = form;
  const baseFolder = `/hotellier/${userName}/${hotelId}/rooms`;

  const handleRoomUploadState = useCallback(
    (isPending: boolean) => {
      setIsUploading(isPending);
    },
    [setIsUploading]
  );

  return (
    <>
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
            onUploadStateChange={handleRoomUploadState}
          />
        )}
      />
    </>
  );
};

export default AddRooomImages;
