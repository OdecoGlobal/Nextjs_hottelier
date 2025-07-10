'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import { HotelImageUploadBodySchema } from '@/lib/schemas/validator';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import z from 'zod';
import { useCallback, useRef, useState } from 'react';
import HotelCreationSteps from '../creation-steps';
import CloudinaryImageUploader from '../../images/cloud-image-upload';
import SubmitFormButton from '@/components/submit-form-button';
import {
  useAddHotelImages,
  useOnboardHotelById,
} from '@/hooks/use-onboard-hotels';
import LoadingComponent from '@/components/loading-state';

export type hotelImageUploadType = z.infer<typeof HotelImageUploadBodySchema>;

const UploadHotelPhotoForm = ({
  hotelId,
  userName,
}: {
  hotelId: string;
  userName: string;
}) => {
  const { data, isPending: dataLoading } = useOnboardHotelById({ hotelId });
  const [isUploading, setIsUploading] = useState(false);
  const { mutateAsync, isPending } = useAddHotelImages();

  const form = useForm({
    resolver: zodResolver(HotelImageUploadBodySchema),
    defaultValues: {
      images: [],
    },
  });
  const { control } = form;
  const hotelImageResetRef = useRef<() => void | null>(null);

  const handleImageUploadState = useCallback((isPending: boolean) => {
    setIsUploading(isPending);
  }, []);

  if (dataLoading || !data) {
    return <LoadingComponent />;
  }

  const { status, completionSteps } = data! ?? {};

  const onSubmit = async (data: hotelImageUploadType) => {
    await mutateAsync({ data, hotelId });

    if (hotelImageResetRef.current) hotelImageResetRef.current();
    form.reset();
  };

  const baseFolder = `/hotellier/${userName}/${hotelId}`;

  return (
    <section className="flex flex-col md:flex-row md:min-h-screen">
      <HotelCreationSteps
        current={4}
        hotelId={hotelId}
        status={status}
        completedSteps={completionSteps}
      />
      <div className=" flex-1 wrapper">
        <Card>
          <CardHeader>
            <CardTitle>
              Hotel Photos (You can upload an exterior and lobby photo)
            </CardTitle>

            <CardDescription>
              Help travelers imagine themselves at your property by showcasing
              everything you have to offer.
            </CardDescription>
          </CardHeader>

          <CardContent className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={control}
                  name="images"
                  render={() => (
                    <CloudinaryImageUploader
                      form={form}
                      fieldName="images"
                      maxImages={5}
                      maxSize={5}
                      labelText="hotel"
                      onResetRef={hotelImageResetRef}
                      folder={`${baseFolder}/cover`}
                      onUploadStateChange={handleImageUploadState}
                    />
                  )}
                />
                <SubmitFormButton
                  isPending={isPending}
                  action="Submit"
                  className="flex justify-end"
                  disabled={isUploading}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UploadHotelPhotoForm;
