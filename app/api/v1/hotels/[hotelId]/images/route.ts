import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import { HotelImageUploadBodySchema } from '@/lib/schemas/validator';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { ImageType } from '@/types';
import { updateHotelProgress } from '@/utils/hotel';
import { NextRequest, NextResponse } from 'next/server';

interface ImageUploadResult {
  public_id: string;
  imageUrl: string;
  imageType: ImageType;
}

const processImageArray = (
  images: { imageUrl: string; public_id: string }[],
  imageType: ImageType,
): ImageUploadResult[] => {
  return images.map(img => ({
    imageUrl: img.imageUrl,
    public_id: img.public_id,
    imageType,
  }));
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> },
) => {
  try {
    const user = await protect(req);
    restrictTo('ADMIN', 'AGENT')(user);

    const { hotelId } = await params;
    await validateHotelAcces(hotelId, user);

    const body = await req.json();
    const validatedData = HotelImageUploadBodySchema.parse(body);

    const { coverImages, exteriorImages, interiorImages } = validatedData;

    const imageUploadResults: ImageUploadResult[] = [
      ...processImageArray(coverImages, 'COVER'),
      ...processImageArray(exteriorImages, 'EXTERIOR'),
      ...processImageArray(interiorImages, 'INTERIOR'),
    ];

    const existingImages = await prisma.hotelImages.findMany({
      where: {
        hotelId,
        imageUrl: {
          in: imageUploadResults.map(img => img.imageUrl),
        },
      },
      select: { imageUrl: true },
    });

    const existingUrls = new Set(existingImages.map(img => img.imageUrl));
    const newImages = imageUploadResults.filter(
      img => !existingUrls.has(img.imageUrl),
    );

    if (newImages.length === 0) {
      return NextResponse.json(
        {
          status: 'success',
          message: 'All images already exist',
          data: { count: 0, duplicates: imageUploadResults.length },
        },
        { status: 200 },
      );
    }

    const result = await prisma.$transaction(async tx => {
      const images = await tx.hotelImages.createMany({
        data: newImages.map(img => ({
          hotelId,
          imageType: img.imageType,
          imageUrl: img.imageUrl,
          public_id: img.public_id,
          isCompleted: true,
          completedAt: new Date(),
        })),
        skipDuplicates: true,
      });

      await updateHotelProgress(
        hotelId,
        'step4_hotel_images',
        images.count > 0,
      );

      return images;
    });

    const response = {
      status: 'success',
      data: {
        count: result.count,
        duplicatesSkipped: imageUploadResults.length - newImages.length,
        breakdown: {
          cover: newImages.filter(img => img.imageType === 'COVER').length,
          exterior: newImages.filter(img => img.imageType === 'EXTERIOR')
            .length,
          interior: newImages.filter(img => img.imageType === 'INTERIOR')
            .length,
        },
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return formatApiError(error);
  }
};
