import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { baseHotelSchema } from '@/lib/schemas/validator';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) => {
  try {
    const { hotelId } = await params;
    if (!hotelId) throw new AppError('ID is required', 400);
    const basicInfo = await prisma.hotelBasicInfo.findUnique({
      where: { hotelId },
    });
    if (!basicInfo) throw new AppError('No hotel found', 400);
    return NextResponse.json(
      {
        status: 'success',
        data: basicInfo,
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) => {
  try {
    await protect(req);
    restrictTo('AGENT', 'ADMIN')(req);
    const { hotelId } = await params;
    validateHotelAcces(req, hotelId);
    if (!hotelId) throw new AppError('ID is required', 400);
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
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};
