import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import { useState } from 'react';

export type ImagePreviewType = {
  file: File;
  url: string;
  id: string;
};

export const useImageUpload = <T extends FieldValues>(
  form: UseFormReturn<T>,
  fieldName: FieldPath<T>
) => {
  const [imagePreviews, setImagePreviews] = useState<ImagePreviewType[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const currentImages = form.getValues(fieldName) || [];
    const newImages = [...currentImages, ...files] as T[keyof T];
    form.setValue(fieldName, newImages);

    const newPreviews = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(2, 9),
    }));

    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (indexToRemove: number) => {
    const currentImages = form.getValues(fieldName) || [];
    const updatedImages = currentImages.filter(
      (_, index) => index !== indexToRemove
    ) as T[keyof T];

    form.setValue(fieldName, updatedImages);
    setImagePreviews(prev => {
      const updated = prev.filter((_, index) => index !== indexToRemove);
      if (prev[indexToRemove]) {
        URL.revokeObjectURL(prev[indexToRemove].url);
      }
      return updated;
    });
  };

  const resetPreviews = () => {
    imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
    setImagePreviews([]);
  };

  return { imagePreviews, handleFileSelect, removeImage, resetPreviews };
};
