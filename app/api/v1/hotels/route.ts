import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { createHotelSchema } from '@/lib/schemas/validator';
import { generateSlug } from '@/lib/utils';
import { protect, restrictTo } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const user = await protect(req);
    restrictTo('ADMIN', 'AGENT')(user);

    const existingHotel = await prisma.hotel.findFirst({
      where: {
        agentId: user.id,
        status: {
          in: ['DRAFT', 'IN_PROGRESS', 'PENDING_REVIEW', 'PROCESSING'],
        },
      },
    });

    if (existingHotel)
      throw new AppError(
        'You already have a hotel pending approval. Please complete or wait for approval',
        400,
      );
    const body = await req.json();
    const validatedData = createHotelSchema.parse(body);
    const slug = generateSlug(validatedData.name);
    const hotel = await prisma.hotel.create({
      data: {
        ...validatedData,
        slug,
        agentId: user.id,
        status: 'DRAFT',
        completionSteps: {
          step0_init: true,
          step1_basic_info: false,
          step2_policies: false,
          step3_amenities: false,
          step4_hotel_images: false,
          step5_rooms: false,
          step6_rates_and_availability: false,
          step7_review: false,
        },
        currentStep: 1,
        totalSteps: 8,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: hotel,
      },
      { status: 201 },
    );
  } catch (error) {
    return formatApiError(error);
  }
}
