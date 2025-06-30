import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import { hotelSchema } from '@/lib/schemas/validator';
import { protect, restrictTo } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> },
) {
  try {
    const user = await protect(req);
    restrictTo('ADMIN')(user);
    const { hotelId } = await params;
    const body = await req.json();
    const { status } = hotelSchema.partial().parse(body);
    const hotel = await prisma.hotel.update({
      where: { id: hotelId, isFullyCompleted: true },
      data: {
        status,
      },
    });
    return NextResponse.json(
      {
        status: 'success',
        data: hotel,
      },
      { status: 200 },
    );
  } catch (error) {
    return formatApiError(error);
  }
}
