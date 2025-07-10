import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { HotelImageUploadBodySchema } from '@/lib/schemas/validator';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
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
    await validateHotelAcces(hotelId, user);

    const body = await req.json();
    const validatedData = HotelImageUploadBodySchema.parse(body);

    const { images } = validatedData;
    if (!images.length) throw new AppError('No images provided', 400);

    const existingImages = await prisma.hotelImages.findMany({
      where: {
        hotelId,
        imageUrl: {
          in: images.map(img => img.imageUrl),
        },
      },
      select: { imageUrl: true },
    });

    const existingUrls = new Set(existingImages.map(img => img.imageUrl));
    const newImages = images.filter(img => !existingUrls.has(img.imageUrl));

    if (newImages.length === 0) {
      return NextResponse.json(
        {
          status: 'success',
          message: 'All images already exist',
          data: { count: 0, duplicates: images.length },
        },
        { status: 200 },
      );
    }

    const result = await prisma.$transaction(async tx => {
      const images = await tx.hotelImages.createMany({
        data: newImages.map(img => ({
          hotelId,
          imageUrl: img.imageUrl,
          public_id: img.public_id,
          isCompleted: true,
          completedAt: new Date(),
        })),
        skipDuplicates: true,
      });

      await updateHotelProgress(hotelId, 'step4_images', images.count > 0);

      return images;
    });

    const response = {
      status: 'success',
      data: {
        count: result.count,
        duplicatesSkipped: images.length - newImages.length,
        summary: {
          images: newImages.length,
        },
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return formatApiError(error);
  }
};
