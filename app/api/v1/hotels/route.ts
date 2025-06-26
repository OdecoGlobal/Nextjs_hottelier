import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import { baseHotelSchema } from '@/lib/schemas/validator';
import { generateSlug } from '@/lib/utils';
import { protect, restrictTo } from '@/middleware/auth';
import { AuthenticatedRequest } from '@/types/custom';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    await protect(req);
    restrictTo('OWNER', 'ADMIN')(req);
    const authReq = req as AuthenticatedRequest;
    const body = await req.json();
    const basicInfoData = baseHotelSchema.parse(body);
    const slug = generateSlug(basicInfoData.name);
    const result = await prisma.$transaction(async tx => {
      const hotel = await tx.hotel.create({
        data: {
          ownerId: authReq.user.id,
          status: 'IN_PROGRESS',
          completionSteps: {
            step1_basic_info: true,
            step2_policies: false,
            step3_amenities: false,
            step3_hotel_images: false,
            step5_rooms: false,
            step6_rate_and_availabilty: false,
            step7_review: false,
          },
          currentStep: 2,
          totalSteps: 7,
        },
      });

      const basicInfo = await tx.hotelBasicInfo.create({
        data: {
          ...basicInfoData,
          hotelId: hotel.id,
          slug: slug,
          isCompleted: true,
          completedAt: new Date(),
        },
      });

      return { hotel, basicInfo };
    });
    return NextResponse.json(
      {
        status: 'success',
        data: {
          hotel: result.hotel,
          basicInfoData: result.basicInfo,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};
