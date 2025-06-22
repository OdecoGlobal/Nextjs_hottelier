import {
  FieldPath,
  FieldValues,
  PathValue,
  UseFormReturn,
} from 'react-hook-form';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { uploadToCloudinary } from '@/lib/actions/cloudinary.actions';
import { axiosInstance } from '@/lib/axios';

export type CloudinaryImagePreviewType = {
  url: string;
  id: string;
  public_id: string;
  isUploading?: boolean;
  progress?: number;
};

export const useCloudImageUpload = <T extends FieldValues>(
  form: UseFormReturn<T>,
  fieldName: FieldPath<T>,
  folder: string
) => {
  const [imagePreviews, setImagePreviews] = useState<
    CloudinaryImagePreviewType[]
  >([]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    const currentUrls: string[] = form.getValues(fieldName) || [];
    const uploadPromises: Promise<string | null>[] = [];
    const tempPreviews: Array<{ id: string; url: string; file: File }> = [];

    for (const file of files) {
      const tempId = uuidv4();
      const localUrl = URL.createObjectURL(file);

      tempPreviews.push({ id: tempId, url: localUrl, file });

      setImagePreviews(prev => [
        ...prev,
        { id: tempId, url: localUrl, public_id: '' },
      ]);

      const uploadPromise = uploadToCloudinary(file, folder)
        .then(({ secure_url, public_id }) => {
          setImagePreviews(prev =>
            prev.map(p =>
              p.id === tempId ? { id: tempId, url: secure_url, public_id } : p
            )
          );

          URL.revokeObjectURL(localUrl);
          return secure_url;
        })
        .catch(err => {
          console.error('Upload error:', err);

          setImagePreviews(prev => prev.filter(p => p.id !== tempId));

          URL.revokeObjectURL(localUrl);
          return null;
        });

      uploadPromises.push(uploadPromise);
    }

    try {
      const results = await Promise.allSettled(uploadPromises);
      const successfulUrls = results
        .filter(
          (result): result is PromiseFulfilledResult<string> =>
            result.status === 'fulfilled' && result.value !== null
        )
        .map(result => result.value);

      if (successfulUrls.length > 0) {
        console.log('Successfully uploaded:', successfulUrls);
        const updatedUrls = [...currentUrls, ...successfulUrls];
        form.setValue(
          fieldName,
          updatedUrls as PathValue<T, typeof fieldName>,
          {
            shouldValidate: true,
          }
        );
      }

      const failedCount = results.filter(
        r =>
          r.status === 'rejected' ||
          (r.status === 'fulfilled' && r.value === null)
      ).length;

      if (failedCount > 0) {
        console.warn(`${failedCount} upload(s) failed`);
      }
    } catch (error) {
      console.error('Unexpected error during upload:', error);

      tempPreviews.forEach(preview => URL.revokeObjectURL(preview.url));
    }
  };

  const removeImage = async (indexToRemove: number) => {
    const imageToRemove = imagePreviews[indexToRemove];
    await axiosInstance.post('cloudinary/delete', {
      public_id: imageToRemove.public_id,
    });
    const currentUrls: string[] = form.getValues(fieldName) || [];
    const updatedUrls = currentUrls.filter(
      (_, index) => index !== indexToRemove
    );
    form.setValue(fieldName, updatedUrls as PathValue<T, typeof fieldName>, {
      shouldValidate: true,
    });

    setImagePreviews(prev =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const resetPreviews = () => {
    setImagePreviews([]);
    form.setValue(fieldName, [] as PathValue<T, typeof fieldName>, {
      shouldValidate: true,
    });
  };

  return { imagePreviews, handleFileSelect, removeImage, resetPreviews };
};
