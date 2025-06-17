import { Button } from '@/components/ui/button';
import { CloudinaryImagePreviewType } from '@/hooks/use-cloudinary-upload';
import { X } from 'lucide-react';
import Image from 'next/image';

const CloudinaryImagePreview = ({
  imagePreviews,
  removeImage,
}: {
  imagePreviews: CloudinaryImagePreviewType[];
  removeImage: (indexToRemove: number) => void;
}) => {
  return (
    <>
      {imagePreviews.length > 0 && (
        <div className="flex flex-wrap items-center gap-4 px-4">
          {imagePreviews.map((preview, i) => (
            <div key={preview.id} className="relative w-24 h-24">
              <Image
                src={preview.url}
                alt={`Preview ${i + 1}`}
                fill
                className="object-cover rounder-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeImage(i)}
                className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-background p-0 shadow-sm hover:bg-destructive/20"
              >
                <X className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CloudinaryImagePreview;
