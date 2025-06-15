import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import { baseHotelAmenitiesSchema } from '@/lib/schemas/validator';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { updateHotelProgress } from '@/utils/hotel';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) => {
  try {
    await protect(req);
    restrictTo('ADMIN', 'OWNER')(req);
    validateHotelAcces();
    const { hotelId } = await params;
    const body = await req.json();
    const amenitiesData = baseHotelAmenitiesSchema.parse(body);

    const amenities = await prisma.hotelAmenity.upsert({
      where: { hotelId },
      update: {
        ...amenitiesData,
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        hotelId,
        ...amenitiesData,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    await updateHotelProgress(
      hotelId,
      'step3_amenities',
      amenities.isCompleted
    );

    return NextResponse.json(
      {
        success: true,
        data: amenities,
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};
