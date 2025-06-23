import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) => {
  try {
    await protect(req);
    restrictTo('OWNER', 'ADMIN')(req);
    validateHotelAcces();
    const { roomId } = await params;
    if (!roomId) throw new AppError('ID is required', 400);

    await prisma.room.delete({
      where: { id: roomId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return formatApiError(error);
  }
};
