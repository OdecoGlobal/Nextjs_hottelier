import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import { baseHotelAmenitiesSchema } from '@/lib/schemas/validator';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { updateHotelProgress } from '@/utils/hotel';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> },
) => {
  try {
    const user = await protect(req);
    restrictTo('ADMIN', 'AGENT')(user);

    const { hotelId } = await params;

    await validateHotelAcces(hotelId, user);

    const body = await req.json();
    const amenitiesData = baseHotelAmenitiesSchema.parse(body);

    const result = await prisma.$transaction(async tx => {
      const amenities = await tx.hotelAmenity.create({
        data: {
          hotelId,
          ...amenitiesData,
          isCompleted: true,
          completedAt: new Date(),
        },
      });
      await updateHotelProgress(
        hotelId,
        'step3_amenities',
        amenities.isCompleted,
      );

      return amenities;
    });

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 },
    );
  } catch (error) {
    return formatApiError(error);
  }
};
export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> },
) => {
  try {
    const user = await protect(req);
    restrictTo('ADMIN', 'AGENT')(user);
    const { hotelId } = await params;
    await validateHotelAcces(hotelId, user);
    const body = await req.json();
    const amenitiesData = baseHotelAmenitiesSchema.partial().parse(body);
    const amenities = await prisma.hotelAmenity.update({
      where: { hotelId },
      data: {
        ...amenitiesData,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: amenities,
      },
      { status: 200 },
    );
  } catch (error) {
    return formatApiError(error);
  }
};
export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> },
) => {
  try {
    const user = await protect(req);
    restrictTo('ADMIN', 'AGENT')(user);
    const { hotelId } = await params;
    await validateHotelAcces(hotelId, user);

    const body = await req.json();
    const amenitiesData = baseHotelAmenitiesSchema.parse(body);

    const result = await prisma.$transaction(async tx => {
      const amenities = await tx.hotelAmenity.upsert({
        where: { hotelId },
        update: {
          ...amenitiesData,
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
        amenities.isCompleted,
      );

      return amenities;
    });

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 },
    );
  } catch (error) {
    return formatApiError(error);
  }
};
