import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { updateHotelProgress } from '@/utils/hotel';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) => {
  try {
    await protect(req);
    restrictTo('AGENT', 'ADMIN')(req);
    const { hotelId } = await params;
    if (!hotelId) throw new AppError('Hotel id is required', 400);

    validateHotelAcces(req, hotelId);

    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      select: { status: true },
    });

    if (!hotel) throw new AppError('Hotel not found', 404);

    if (['PENDING_REVIEW', 'APPROVED', 'ACTIVE'].includes(hotel.status)) {
      throw new AppError(
        `This hotel has already been submitted for review`,
        400
      );
    }

    const { isFullyCompleted } = await updateHotelProgress(
      hotelId,
      'step7_review',
      true
    );
    if (!isFullyCompleted) {
      throw new AppError(
        'All steps must be completed before submitting for review',
        400
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        message: 'Your hotel has been submitted succesfully for review',
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};
