import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> },
) => {
  try {
    const { hotelId } = await params;
    if (!hotelId) throw new AppError('ID is required', 400);

    const hotel = await prisma.hotel.findFirst({
      where: { id: hotelId, status: 'ACTIVE' },
      include: {
        basicInfo: true,
        policies: true,
        images: true,
        amenities: true,
        rooms: {
          include: {
            roomAvailability: true,
            roomImages: true,
            amenities: true,
          },
        },
      },
      cacheStrategy: {
        ttl: 10 * 60,
      },
    });
    if (!hotel) throw new AppError('Hotel not found', 404);
    return NextResponse.json(
      {
        data: { hotel },
        status: 'success',
      },
      { status: 200 },
    );
  } catch (error) {
    return formatApiError(error);
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> },
) => {
  try {
    const user = await protect(req);
    restrictTo('AGENT', 'ADMIN')(user);
    const { hotelId } = await params;
    await validateHotelAcces(hotelId, user);

    await prisma.hotel.delete({
      where: { id: hotelId },
    });

    revalidateTag('hotel_onboard');
    revalidateTag('hotel_onboard_id');
    revalidateTag(`hotel_onboard_${hotelId}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return formatApiError(error);
  }
};
