import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) => {
  try {
    await protect(req);
    restrictTo('OWNER', 'ADMIN')(req);
    validateHotelAcces();
    const { hotelId } = await params;
    if (!hotelId) throw new AppError('ID is required', 400);

    await prisma.hotel.delete({
      where: { id: hotelId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return formatApiError(error);
  }
};
