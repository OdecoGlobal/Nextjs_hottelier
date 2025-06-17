import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Camera } from 'lucide-react';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import { useCloudImageUpload } from '@/hooks/use-cloudinary-upload';
import CloudinaryImagePreview from './cloud-image-preview';

const SmallCloudinaryUploadButton = <T extends FieldValues>({
  form,
  fieldName,
  onResetRef,
  folder,
}: {
  form: UseFormReturn<T>;
  fieldName: FieldPath<T>;
  onResetRef?: React.RefObject<(() => void) | null>;
  folder: string;
}) => {
  const { handleFileSelect, imagePreviews, removeImage, resetPreviews } =
    useCloudImageUpload(form, fieldName, folder);

  if (onResetRef) onResetRef.current = resetPreviews;
  return (
    <FormItem>
      <FormControl>
        <FormItem>
          <div className="relative px-5">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-blue-600 rounded-lg">
              <Camera className=" h-6 w-6 text-blue-600" />
              <p className="text-muted-foreground font-medium">Add Photos</p>
            </div>
          </div>
          <CloudinaryImagePreview
            imagePreviews={imagePreviews}
            removeImage={removeImage}
          />
        </FormItem>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SmallCloudinaryUploadButton;
