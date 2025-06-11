import { prisma } from "@/db/prisma";
import { catchAsync } from "@/lib/auth/catch-async";
import { hotelBasicInfoSchema } from "@/lib/schemas/validator";
import { generateSlug } from "@/lib/utils";
import { protect, restrictTo } from "@/middleware/auth";
import { AuthenticatedRequest } from "@/types/custom";
import { NextRequest, NextResponse } from "next/server";

export const POST = catchAsync(async (req: NextRequest) => {
  await protect(req);
  await restrictTo("OWNER", "ADMIN")(req);
  const authReq = req as AuthenticatedRequest;
  const body = await req.json();
  const basicInfoData = hotelBasicInfoSchema.parse(body);
  const slug = generateSlug(basicInfoData.name);
  const result = await prisma.$transaction(async (tx) => {
    const hotel = await tx.hotel.create({
      data: {
        ownerId: authReq.user.id,
        status: "IN_PROGRESS",
        completionSteps: {
          step1_basic_info: true,
          step2_policies: false,
          step3_hotel_images: false,
          step4_rooms: false,
          step5_rates: false,
          step6_amenities: false,
        },
        currentStep: 2,
        totalSteps: 6,
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
      status: "success",
      data: {
        hotel: result.hotel,
        basicInfoData: result.basicInfo,
      },
    },
    { status: 201 }
  );
});
