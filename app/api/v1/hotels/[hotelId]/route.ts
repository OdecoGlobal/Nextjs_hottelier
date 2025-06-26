import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) => {
  try {
    const { hotelId } = await params;
    if (!hotelId) throw new AppError('ID is required', 400);

    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
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
    });
    if (!hotel) throw new AppError('Hotel not found', 404);
    return NextResponse.json(
      {
        data: { hotel },
        status: 'success',
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) => {
  try {
    await protect(req);
    restrictTo('OWNER', 'ADMIN')(req);
    const { hotelId } = await params;
    if (!hotelId) throw new AppError('ID is required', 400);
    validateHotelAcces(req, hotelId);

    await prisma.hotel.delete({
      where: { id: hotelId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return formatApiError(error);
  }
};
