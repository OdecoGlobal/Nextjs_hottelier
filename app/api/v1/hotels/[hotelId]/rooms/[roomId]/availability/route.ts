import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { availabilitySchema } from '@/lib/schemas/validator';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { updateHotelProgress } from '@/utils/hotel';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string; roomId: string }> }
) => {
  try {
    await protect(req);
    restrictTo('ADMIN', 'OWNER')(req);
    validateHotelAcces();
    const { roomId, hotelId } = await params;
    if (!roomId) throw new AppError('ID is required', 400);
    const body = await req.json();
    const parsedData = availabilitySchema.parse(body);
    const { date, price, inventory, isAvailable } = parsedData;

    const result = await prisma.$transaction(async tx => {
      const availability = await tx.roomAvailability.upsert({
        where: {
          roomId_date: {
            roomId,
            date: new Date(date),
          },
        },
        update: {
          price,
          inventory,
          isAvailable,
        },
        create: {
          roomId,
          date: new Date(date),
          price,
          isAvailable,
          inventory,
          isCompleted: true,
          completedAt: new Date(),
        },
      });
      await updateHotelProgress(
        hotelId,
        'step6_rate_and_availability',
        availability.isCompleted
      );
      return availability;
    });

    return NextResponse.json(
      {
        status: 'success',
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};
