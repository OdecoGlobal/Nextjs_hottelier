import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { hotelImageUploadSchema } from '@/lib/schemas/validator';
import { generateSlug } from '@/lib/utils';
import { uploadImages } from '@/middleware/images';
import { updateHotelProgress } from '@/utils/hotel';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) => {
  try {
    const { hotelId } = await params;
    if (!hotelId) throw new AppError('ID is required too upload images', 400);

    const hotel = await prisma.hotelBasicInfo.findUnique({
      where: { hotelId },
    });
    if (!hotel) throw new AppError('Hotel not found', 400);
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

    const hotelName = generateSlug(hotel.name);
    const baseFolder = `hotels/${hotelName}/${hotelId}`;
    const timestamp = Date.now();

    const imageUploadResults: {
      imageUrl: string;
      imageType: 'COVER' | 'EXTERIOR' | 'INTERIOR';
    }[] = [];

    if (files.hotelImages?.length) {
      const urls = await uploadImages(
        files.hotelImages,
        `${baseFolder}/hotelImages`,
        `hotelImages-${timestamp}`
      );
      urls.forEach(url => {
        imageUploadResults.push({ imageUrl: url, imageType: 'COVER' });
      });
    }
    if (files.exterior?.length) {
      const urls = await uploadImages(
        files.exterior,
        `${baseFolder}/exterior`,
        `exterior-${timestamp}`
      );
      urls.forEach(url => {
        imageUploadResults.push({ imageUrl: url, imageType: 'EXTERIOR' });
      });
    }
    if (files.interior) {
      const urls = await uploadImages(
        files.interior,
        `${baseFolder}/interior`,
        `interior-${timestamp}`
      );
      urls.forEach(url => {
        imageUploadResults.push({ imageUrl: url, imageType: 'INTERIOR' });
      });
    }

    const images = await prisma.hotelImages.createMany({
      data: imageUploadResults.map(img => ({
        hotelId,
        imageType: img.imageType,
        imageUrl: img.imageUrl,
        isCompleted: true,
        completedAt: new Date(),
      })),
    });
    await updateHotelProgress(hotelId, 'step4_hotel_images', images.count > 0);

    return NextResponse.json(
      {
        status: 'success',
        data: images,
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};
