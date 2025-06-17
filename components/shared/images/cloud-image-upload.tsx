import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCloudImageUpload } from '@/hooks/use-cloudinary-upload';
import CloudinaryImagePreview from './cloud-image-preview';

const CloudinaryImageUploader = <T extends FieldValues>({
  form,
  fieldName,
  maxImages,
  maxSize,
  labelText,
  onResetRef,
  folder,
}: {
  form: UseFormReturn<T>;
  fieldName: FieldPath<T>;
  maxImages: number;
  maxSize: number;
  labelText: string;
  folder: string;
  onResetRef?: React.RefObject<(() => void) | null>;
}) => {
  const { handleFileSelect, imagePreviews, removeImage, resetPreviews } =
    useCloudImageUpload(form, fieldName, folder);

  if (onResetRef) onResetRef.current = resetPreviews;

  return (
    <FormItem>
      <FormControl>
        <FormItem className="space-y-4">
          <Card>
            <CardContent className="relative">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-blue-600 rounded-lg">
                <Plus className=" h-12 w-12 text-blue-600" />
                <p className="text-muted-foreground font-medium">
                  Click to add {labelText} images
                </p>
                <p className="text-muted-foreground text-sm">
                  Or drag and drop images here
                </p>
                <p className="text-muted-foreground text-xs">
                  Maximum {maxImages} images, {maxSize} each
                </p>
              </div>
            </CardContent>
          </Card>

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

export default CloudinaryImageUploader;
