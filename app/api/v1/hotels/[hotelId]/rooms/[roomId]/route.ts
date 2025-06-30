import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { deleteRoomWithImages } from '@/middleware/cloudinary';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> },
) => {
  try {
    const { roomId } = await params;
    if (!roomId) throw new AppError('ID is required', 400);

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        roomAvailability: true,
        roomImages: true,
        amenities: true,
      },
    });

    if (!room) throw new AppError('Hotel not found', 404);
    return NextResponse.json(
      {
        data: { room },
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
  { params }: { params: Promise<{ hotelId: string; roomId: string }> },
) => {
  try {
    const user = await protect(req);
    restrictTo('AGENT', 'ADMIN')(user);
    const { roomId, hotelId } = await params;
    if (!roomId) throw new AppError('ID is required', 400);

    validateHotelAcces(req, hotelId);
    await deleteRoomWithImages(roomId);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return formatApiError(error);
  }
};
