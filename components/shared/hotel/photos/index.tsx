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

export type hotelImageUploadType = z.infer<typeof hotelImageUploadSchema>;

const UploadHotelPhotoForm = ({ hotelId }: { hotelId: string }) => {
  const form = useForm<z.infer<typeof hotelImageUploadSchema>>({
    resolver: zodResolver(hotelImageUploadSchema),
    defaultValues: {
      hotelImages: [],
      exterior: [],
      interior: [],
    },
  });
  const { control } = form;
  const hotelImageResetRef = useRef<() => void | null>(null);
  const exteriorResetRef = useRef<() => void | null>(null);
  const interiorResetRef = useRef<() => void | null>(null);
  const onSubmit = (values: z.infer<typeof hotelImageUploadSchema>) => {
    console.log(values, hotelId);
    form.reset();
    if (exteriorResetRef.current) exteriorResetRef.current();
    if (hotelImageResetRef.current) hotelImageResetRef.current();
    if (interiorResetRef.current) interiorResetRef.current();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hotel Photos</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UploadHotelPhotoForm;
