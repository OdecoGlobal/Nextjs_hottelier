import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { baseHotelSchema } from '@/lib/schemas/validator';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { updateHotelProgress } from '@/utils/hotel';
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

    const basicInfo = await prisma.hotelBasicInfo.findUnique({
      where: { hotelId },
    });

    if (!basicInfo) throw new AppError('No hotel found', 400);
    return NextResponse.json(
      {
        status: 'success',
        data: basicInfo,
      },
      { status: 200 },
    );
  } catch (error) {
    return formatApiError(error);
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> },
) => {
  try {
    const user = await protect(req);
    restrictTo('AGENT', 'ADMIN')(user);
    const { hotelId } = await params;
    await validateHotelAcces(hotelId, user);
    const body = await req.json();
    const basicInfoData = baseHotelSchema.parse(body);
    const result = await prisma.$transaction(async tx => {
      const basicInfo = await tx.hotelBasicInfo.create({
        data: {
          ...basicInfoData,
          hotelId,
          isCompleted: true,
          completedAt: new Date(),
        },
      });
      await updateHotelProgress(
        hotelId,
        'step1_basic_info',
        basicInfo.isCompleted,
      );
      return basicInfo;
    });

    return NextResponse.json(
      {
        status: 'success',
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
    restrictTo('AGENT', 'ADMIN')(user);
    const { hotelId } = await params;

    await validateHotelAcces(hotelId, user);

    const body = await req.json();
    const updatedBasicInfoData = baseHotelSchema.partial().parse(body);
    const basicInfo = await prisma.hotelBasicInfo.update({
      where: { hotelId },
      data: updatedBasicInfoData,
    });

    return NextResponse.json(
      {
        status: 'success',
        data: basicInfo,
      },
      { status: 200 },
    );
  } catch (error) {
    return formatApiError(error);
  }
};
