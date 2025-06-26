import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) => {
  try {
    await protect(req);
    restrictTo('OWNER', 'ADMIN')(req);
    const { hotelId } = await params;
    if (!hotelId) throw new AppError('Hotel id is required', 400);
    validateHotelAcces(req, hotelId);
    return NextResponse.json(
      {
        status: 'success',
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};
