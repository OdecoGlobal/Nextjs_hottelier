'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { HotelImageUploadBodySchema } from '@/lib/schemas/validator';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import z from 'zod';
import { useCallback, useRef, useState } from 'react';
import HotelCreationSteps from '../creation-steps';
import { addHotelImages } from '@/lib/actions/hotel.action';
import { useToast } from '@/hooks/use-toast';
import { AdminAgentRole } from '@/types';
import { useRouter } from 'next/navigation';
import CloudinaryImageUploader from '../../images/cloud-image-upload';
import SmallCloudinaryUploadButton from '../../images/cloud-small-upload-button';
import SubmitFormButton from '@/components/submit-form-button';

export type hotelImageUploadType = z.infer<typeof HotelImageUploadBodySchema>;

const UploadHotelPhotoForm = ({
  hotelId,
  role,
  userName,
}: {
  hotelId: string;
  userName: string;
  role: AdminAgentRole;
}) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState({
    coverUploading: false,
    exteriorUploading: false,
    interiorUploading: false,
  });

  const form = useForm({
    resolver: zodResolver(HotelImageUploadBodySchema),
    defaultValues: {
      coverImages: [],
      exteriorImages: [],
      interiorImages: [],
    },
  });
  const { control, formState } = form;
  const { toast } = useToast();
  const hotelImageResetRef = useRef<() => void | null>(null);
  const exteriorResetRef = useRef<() => void | null>(null);
  const interiorResetRef = useRef<() => void | null>(null);

  const handleCoverUploadState = useCallback((isPending: boolean) => {
    setIsUploading(prev => ({ ...prev, coverUploading: isPending }));
  }, []);

  const handleInteriorUploadState = useCallback((isPending: boolean) => {
    setIsUploading(prev => ({ ...prev, interiorUploading: isPending }));
  }, []);
  const handleExteriorUploadState = useCallback((isPending: boolean) => {
    setIsUploading(prev => ({ ...prev, exteriorUploading: isPending }));
  }, []);

  const onSubmit = async (values: hotelImageUploadType) => {
    const res = await addHotelImages(values, hotelId);

    if (!res?.success) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: res.message,
      });
    } else {
      toast({
        title: 'Success',
        description: res.message,
        variant: 'default',
      });
      router.replace(`/${role.toLowerCase()}/onboarding/${hotelId}/rooms`);
    }
    form.reset();
    if (exteriorResetRef.current) exteriorResetRef.current();
    if (hotelImageResetRef.current) hotelImageResetRef.current();
    if (interiorResetRef.current) interiorResetRef.current();
  };

  const isPending = formState.isSubmitting;
  const baseFolder = `/hotellier/${userName}/${hotelId}`;

  return (
    <section className="flex flex-col md:flex-row md:min-h-screen">
      <HotelCreationSteps current={3} />
      <div className=" flex-1 py-10  px-5 w-full">
        <Card className="max-w-md mx-auto bg-transparent">
          <CardHeader>
            <CardTitle>Hotel Photos</CardTitle>
          </CardHeader>

          <CardContent className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={control}
                  name="coverImages"
                  render={() => (
                    <CloudinaryImageUploader
                      form={form}
                      fieldName="coverImages"
                      maxImages={5}
                      maxSize={5}
                      labelText="hotel"
                      onResetRef={hotelImageResetRef}
                      folder={`${baseFolder}/cover`}
                      onUploadStateChange={handleCoverUploadState}
                    />
                  )}
                />
                <Card className="space-y-6 px-6">
                  <CardHeader>
                    <CardTitle>
                      Property (upload an exterior and lobby photo)
                    </CardTitle>

                    <CardDescription>
                      Help travelers imagine themselves at your property by
                      showcasing everything you have to offer.
                    </CardDescription>
                  </CardHeader>

                  <FormField
                    control={control}
                    name="exteriorImages"
                    render={() => (
                      <FormItem className="space-y-1">
                        <FormLabel className="inline-block px-4 text-base">
                          Exterior
                        </FormLabel>
                        <SmallCloudinaryUploadButton
                          form={form}
                          fieldName="exteriorImages"
                          onResetRef={exteriorResetRef}
                          folder={`${baseFolder}/exterior`}
                          onUploadStateChange={handleExteriorUploadState}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="interiorImages"
                    render={() => (
                      <FormItem className="space-y-1">
                        <FormLabel className="inline-block px-4 text-base">
                          Interior
                        </FormLabel>
                        <SmallCloudinaryUploadButton
                          form={form}
                          fieldName="interiorImages"
                          onResetRef={interiorResetRef}
                          folder={`${baseFolder}/interior`}
                          onUploadStateChange={handleInteriorUploadState}
                        />
                      </FormItem>
                    )}
                  />
                </Card>
                <SubmitFormButton
                  isPending={isPending}
                  action="Submit"
                  className="flex justify-end"
                  disabled={
                    isUploading.coverUploading ||
                    isUploading.exteriorUploading ||
                    isUploading.interiorUploading
                  }
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
