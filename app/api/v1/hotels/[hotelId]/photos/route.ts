import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { hotelImageUploadSchema } from '@/lib/schemas/validator';
import { generateSlug } from '@/lib/utils';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { uploadImages } from '@/middleware/images';
import { updateHotelProgress } from '@/utils/hotel';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> },
) => {
  try {
    const user = await protect(req);
    restrictTo('ADMIN', 'AGENT')(user);

    const { hotelId } = await params;
    const hotel = await validateHotelAcces(req, hotelId);

    const formData = await req.formData();

    const rawFiles = {
      hotelImages: formData.getAll('hotelImages') as File[],
      exterior: formData.getAll('exterior') as File[],
      interior: formData.getAll('interior') as File[],
    };
    const validatedFiles = hotelImageUploadSchema.parse(rawFiles);

    const files = {
      hotelImages: validatedFiles.hotelImages?.filter(f => f.size > 0),
      exterior: validatedFiles.exterior?.filter(f => f.size > 0),
      interior: validatedFiles.interior?.filter(f => f.size > 0),
    };

    if (
      !files.hotelImages?.length &&
      !files.exterior?.length &&
      !files.interior?.length
    )
      throw new AppError('No images provided', 400);

    const hotelName = generateSlug(hotel.agentId);
    const baseFolder = `hotels/${hotelName}/${hotelId}`;
    const timestamp = Date.now();

    const imageUploadResults: {
      imageUrl: string;
      public_id: string;
      imageType: 'COVER' | 'EXTERIOR' | 'INTERIOR';
    }[] = [];

    if (files.hotelImages?.length) {
      const urls = await uploadImages(
        files.hotelImages,
        `${baseFolder}/hotelImages`,
        `hotelImages-${timestamp}`,
      );
      urls.forEach(url => {
        imageUploadResults.push({
          imageUrl: url,
          imageType: 'COVER',
          public_id: url,
        });
      });
    }
    if (files.exterior?.length) {
      const urls = await uploadImages(
        files.exterior,
        `${baseFolder}/exterior`,
        `exterior-${timestamp}`,
      );
      urls.forEach(url => {
        imageUploadResults.push({
          imageUrl: url,
          imageType: 'EXTERIOR',
          public_id: url,
        });
      });
    }
    if (files.interior) {
      const urls = await uploadImages(
        files.interior,
        `${baseFolder}/interior`,
        `interior-${timestamp}`,
      );
      urls.forEach(url => {
        imageUploadResults.push({
          imageUrl: url,
          imageType: 'INTERIOR',
          public_id: url,
        });
      });
    }

    const result = await prisma.$transaction(async tx => {
      const images = await tx.hotelImages.createMany({
        data: imageUploadResults.map(img => ({
          hotelId,
          imageType: img.imageType,
          imageUrl: img.imageUrl,
          public_id: img.public_id,

          isCompleted: true,
          completedAt: new Date(),
        })),
      });
      return images;
    });

    await updateHotelProgress(hotelId, 'step4_hotel_images', result.count > 0);

    return NextResponse.json(
      {
        status: 'success',
        data: result.count,
      },
      { status: 200 },
    );
  } catch (error) {
    return formatApiError(error);
  }
};
