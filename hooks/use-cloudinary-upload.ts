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
import { z } from 'zod';
import { cloudinaryImageSchema } from '@/lib/schemas/validator';

export type CloudinaryImagePreviewType = {
  url: string;
  id: string;
  public_id: string;
  isUploading?: boolean;
  progress?: number;
};

type ImageObject = z.infer<typeof cloudinaryImageSchema>;

export const useCloudImageUpload = <T extends FieldValues>(
  form: UseFormReturn<T>,
  fieldName: FieldPath<T>,
  folder: string
) => {
  const [imagePreviews, setImagePreviews] = useState<
    CloudinaryImagePreviewType[]
  >([]);
  const [isPending, setIsPending] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    setIsPending(true);

    const currentImages: ImageObject[] = form.getValues(fieldName) || [];
    const uploadPromises: Promise<ImageObject | null>[] = [];
    const tempPreviews: Array<{ id: string; url: string; file: File }> = [];

    for (const file of files) {
      const tempId = uuidv4();
      const localUrl = URL.createObjectURL(file);

      tempPreviews.push({ id: tempId, url: localUrl, file });

      setImagePreviews(prev => [
        ...prev,
        {
          id: tempId,
          url: localUrl,
          public_id: '',
          isUploading: true,
          progress: 0,
        },
      ]);

      const progressInterval = setInterval(() => {
        setImagePreviews(prev =>
          prev.map(p =>
            p.id === tempId && p.isUploading
              ? {
                  ...p,
                  progress: Math.min(
                    (p.progress || 0) + Math.random() * 20,
                    95
                  ),
                }
              : p
          )
        );
      }, 200);

      const uploadPromise = uploadToCloudinary(file, folder)
        .then(({ secure_url, public_id }) => {
          const imageObj = { imageUrl: secure_url, public_id };
          setImagePreviews(prev =>
            prev.map(p =>
              p.id === tempId
                ? {
                    id: tempId,
                    url: secure_url,
                    public_id,
                    isUploading: false,
                    progress: 100,
                  }
                : p
            )
          );

          URL.revokeObjectURL(localUrl);
          return imageObj;
        })
        .catch(err => {
          clearInterval(progressInterval);
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
          (result): result is PromiseFulfilledResult<ImageObject> =>
            result.status === 'fulfilled' && result.value !== null
        )
        .map(result => result.value);

      if (successfulUrls.length > 0) {
        console.log('Successfully uploaded:', successfulUrls);
        const updatedImages = [...currentImages, ...successfulUrls];
        form.setValue(
          fieldName,
          updatedImages as PathValue<T, typeof fieldName>,
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
    } finally {
      setIsPending(false);
    }
  };

  const removeImage = async (indexToRemove: number) => {
    const imageToRemove = imagePreviews[indexToRemove];
    if (imageToRemove.isUploading) return;

    await axiosInstance.post('cloudinary/delete', {
      public_id: imageToRemove.public_id,
    });
    const currentImages: ImageObject[] = form.getValues(fieldName) || [];
    const updatedImages = currentImages.filter(
      (_, index) => index !== indexToRemove
    );
    form.setValue(fieldName, updatedImages as PathValue<T, typeof fieldName>, {
      shouldValidate: true,
    });

    setImagePreviews(prev =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const resetPreviews = () => {
    setImagePreviews([]);
    setIsPending(false);
    form.setValue(fieldName, [] as PathValue<T, typeof fieldName>, {
      shouldValidate: true,
    });
  };

  return {
    imagePreviews,
    handleFileSelect,
    removeImage,
    resetPreviews,
    isPending,
  };
};
