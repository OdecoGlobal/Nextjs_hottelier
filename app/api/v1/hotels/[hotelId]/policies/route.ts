import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { baseHotelPolicySchema } from '@/lib/schemas/validator';
import { protect, restrictTo, validateHotelAcces } from '@/middleware/auth';
import { updateHotelProgress } from '@/utils/hotel';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) => {
  try {
    await protect(req);
    restrictTo('ADMIN', 'OWNER')(req);
    validateHotelAcces();
    const { hotelId } = await params;
    const body = await req.json();
    const policiesData = baseHotelPolicySchema.parse(body);

    const result = await prisma.$transaction(async tx => {
      const policies = await tx.hotelPolicy.create({
        data: {
          hotelId,
          ...policiesData,
          isCompleted: true,
          completedAt: new Date(),
        },
      });
      await updateHotelProgress(
        hotelId,
        'step2_policies',
        policies.isCompleted
      );
      return policies;
    });

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
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
    restrictTo('ADMIN', 'OWNER')(req);
    validateHotelAcces();
    const { hotelId } = await params;
    const body = await req.json();
    const policiesData = baseHotelPolicySchema.partial().parse(body);

    const policies = await prisma.hotelPolicy.update({
      where: { hotelId },
      data: {
        ...policiesData,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: policies,
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};

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
    const policiesData = baseHotelPolicySchema.parse(body);

    const policies = await prisma.hotelPolicy.upsert({
      where: { hotelId },
      update: {
        ...policiesData,
      },
      create: {
        hotelId,
        ...policiesData,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    await updateHotelProgress(hotelId, 'step2_policies', policies.isCompleted);

    return NextResponse.json(
      {
        success: true,
        data: policies,
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) => {
  try {
    const { hotelId } = await params;
    if (!hotelId) throw new AppError('ID is required', 400);
    const policy = await prisma.hotelPolicy.findUnique({
      where: { hotelId },
    });
    if (!policy) throw new AppError('Hotel not found', 404);
    return NextResponse.json(
      {
        status: 'success',
        data: policy,
      },
      { status: 200 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};
