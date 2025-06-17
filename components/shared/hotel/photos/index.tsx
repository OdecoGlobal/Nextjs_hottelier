'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { hotelImageUploadSchema } from '@/lib/schemas/validator';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import z from 'zod';
import UploadInputButton from '../../images/upload-input-button';
import ImageUploadComponent from '../../images/image-upload';
import { useRef } from 'react';
import HotelCreationSteps from '../creation-steps';
import { addHotelImages } from '@/lib/actions/hotel.action';
import { Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminOwnerRole } from '@/types';
import { useRouter } from 'next/navigation';

export type hotelImageUploadType = z.infer<typeof hotelImageUploadSchema>;

const UploadHotelPhotoForm = ({
  hotelId,
  role,
}: {
  hotelId: string;
  role: AdminOwnerRole;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof hotelImageUploadSchema>>({
    resolver: zodResolver(hotelImageUploadSchema),
    defaultValues: {
      hotelImages: [],
      exterior: [],
      interior: [],
    },
  });
  const { control, formState } = form;
  const { toast } = useToast();
  const hotelImageResetRef = useRef<() => void | null>(null);
  const exteriorResetRef = useRef<() => void | null>(null);
  const interiorResetRef = useRef<() => void | null>(null);
  const onSubmit = async (values: hotelImageUploadType) => {
    const formData = new FormData();
    values.hotelImages.forEach(file => {
      formData.append('hotelImages', file);
    });
    values.exterior.forEach(file => {
      formData.append('exterior', file);
    });
    values.interior.forEach(file => {
      formData.append('interior', file);
    });

    const res = await addHotelImages(formData, hotelId);
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
      router.replace(`/${role.toLowerCase()}/onboarding/${hotelId}/photos`);
    }
    form.reset();
    if (exteriorResetRef.current) exteriorResetRef.current();
    if (hotelImageResetRef.current) hotelImageResetRef.current();
    if (interiorResetRef.current) interiorResetRef.current();
  };

  const isPending = formState.isSubmitting;

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
                  name="hotelImages"
                  render={() => (
                    <ImageUploadComponent
                      form={form}
                      fieldName="hotelImages"
                      maxImages={5}
                      maxSize={5}
                      labelText="hotel"
                      onResetRef={hotelImageResetRef}
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
                    name="exterior"
                    render={() => (
                      <FormItem className="space-y-1">
                        <FormLabel className="inline-block px-4 text-base">
                          Exterior
                        </FormLabel>
                        <UploadInputButton
                          form={form}
                          fieldName="exterior"
                          onResetRef={exteriorResetRef}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="interior"
                    render={() => (
                      <FormItem className="space-y-1">
                        <FormLabel className="inline-block px-4 text-base">
                          Interior
                        </FormLabel>
                        <UploadInputButton
                          form={form}
                          fieldName="interior"
                          onResetRef={interiorResetRef}
                        />
                      </FormItem>
                    )}
                  />
                </Card>
                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UploadHotelPhotoForm;
