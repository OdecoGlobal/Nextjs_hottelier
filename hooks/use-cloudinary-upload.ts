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
    const currentUrls: string[] = form.getValues(fieldName) || [];

    const uploadedUrls: string[] = [];
    const newPreviews: CloudinaryImagePreviewType[] = [];

    for (const file of files) {
      try {
        const { secure_url, public_id } = await uploadToCloudinary(
          file,
          folder
        );
        uploadedUrls.push(secure_url);
        newPreviews.push({ id: uuidv4(), url: secure_url, public_id });
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    const updatedUrls = [...currentUrls, ...uploadedUrls];
    form.setValue(fieldName, updatedUrls as PathValue<T, typeof fieldName>, {
      shouldValidate: true,
    });
    setImagePreviews(prev => [...prev, ...newPreviews]);
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
