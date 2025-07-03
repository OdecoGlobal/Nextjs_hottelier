import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> },
) => {
  try {
    const user = await protect(req);
    restrictTo('AGENT', 'ADMIN')(user);
    const { hotelId } = await params;
    await validateHotelAcces(hotelId, user);

    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: {
        agent: {
          select: {
            email: true,
            id: true,
            isActive: true,
            isEmailVerified: true,
            isSuspended: true,
            role: true,
            image: true,
            userName: true,
          },
        },
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
