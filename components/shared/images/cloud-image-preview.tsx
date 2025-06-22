import { Button } from '@/components/ui/button';
import { CloudinaryImagePreviewType } from '@/hooks/use-cloudinary-upload';
import { Loader2, X } from 'lucide-react';
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
              <div className="w-full h-full relative">
                <Image
                  src={preview.url}
                  alt={`Preview ${i + 1}`}
                  fill
                  className={`object-cover rounded-md transition-all duration-300 ${
                    preview.isUploading ? 'blur-sm opacity-70' : ''
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
                {preview.isUploading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 rounded-md">
                    <div className="relative w-8 h-8 mb-1">
                      <svg
                        className="w-8 h-8 transform -rotate-90"
                        viewBox="0 0 32 32"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="2"
                          fill="none"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 14}`}
                          strokeDashoffset={`${
                            2 *
                            Math.PI *
                            14 *
                            (1 - (preview.progress || 0) / 100)
                          }`}
                          className="transition-all duration-300 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
                      </div>
                    </div>
                    <span className="text-xs text-white font-medium">
                      {Math.round(preview.progress || 0)}%
                    </span>
                  </div>
                )}
              </div>

              {!preview.isUploading && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeImage(i)}
                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-background p-0 shadow-sm hover:bg-destructive/20"
                >
                  <X className="w-4 h-4 text-destructive" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CloudinaryImagePreview;
