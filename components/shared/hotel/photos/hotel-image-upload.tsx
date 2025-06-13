import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { hotelImageUploadType } from '.';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { useImageUpload } from '@/hooks/use-image-upload';

const HotelImageUpload = ({
  form,
}: {
  form: UseFormReturn<hotelImageUploadType>;
}) => {
  const { imagePreviews, handleFileSelect, removeImage } = useImageUpload(
    form,
    'hotelImages'
  );

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
                  Click to add images
                </p>
                <p className="text-muted-foreground text-sm">
                  Or drag and drop images here
                </p>
                <p className="text-muted-foreground text-xs">
                  Maximum 5 images, 5MB each
                </p>
              </div>
            </CardContent>
          </Card>

          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap items-center gap-4">
              {imagePreviews.map((preview, i) => (
                <Card key={preview.id} className="relative w-24 h-24">
                  <Image
                    src={preview.url}
                    alt={`Preview ${i + 1}`}
                    fill
                    className="object-cover rounder-md"
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
                </Card>
              ))}
            </div>
          )}
        </FormItem>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default HotelImageUpload;
