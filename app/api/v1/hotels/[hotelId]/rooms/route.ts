import { prisma } from '@/db/prisma';
import { formatApiError } from '@/lib/errors';
import AppError from '@/lib/errors/app-error';
import { completeRoomSchema } from '@/lib/schemas/validator';
import { updateHotelProgress } from '@/utils/hotel';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ hotelId: string }> }
) => {
  try {
    const { hotelId } = await params;
    if (!hotelId) throw new AppError('ID is required', 400);

    const hotel = await prisma.hotelBasicInfo.findUnique({
      where: { hotelId },
      select: { hotelId: true },
    });

    if (!hotel) throw new AppError('Hotel not found', 400);
    const body = await req.json();
    const validatedData = completeRoomSchema.parse(body);
    const {
      name,
      roomType,
      roomClass,
      maxOccupancy,
      bedType,
      bedTotal,
      totalRooms,
      baseRate,
      peopleInBaseRate,
      pricingModel,

      bathroomType,
      bathroomNumber,
      showerType,
      roomEssential,
      isTowelProvided,
      climateControl,
      airConditionType,
      heatingType,
      isRoomView,
      roomViewType,
      roomSize,
      roomSizeUnit,
      isOutDoorSpace,
      outDoorSpaceType,
      roomLayout,

      roomImages,
    } = validatedData;

    const result = await prisma.$transaction(async tx => {
      const room = await tx.room.create({
        data: {
          hotelId,
          name,
          roomType,
          roomClass,
          maxOccupancy,
          bedType,
          bedTotal,
          totalRooms,
          baseRate,
          peopleInBaseRate,
          pricingModel,
          isCompleted: true,
          completedAt: new Date(),
        },
      });
      const amenities = await tx.roomAmenity.create({
        data: {
          roomId: room.id,
          bathroomType,
          bathroomNumber,
          showerType,
          roomEssential,
          isTowelProvided,
          climateControl,
          airConditionType,
          heatingType,
          isRoomView,
          roomViewType,
          roomSize,
          roomSizeUnit,
          isOutDoorSpace,
          outDoorSpaceType,
          roomLayout,
        },
      });
      const images = await tx.roomImages.createMany({
        data: roomImages.map(img => ({
          roomId: room.id,
          imageUrl: img,
        })),
        skipDuplicates: true,
      });

      await updateHotelProgress(hotelId, 'step5_rooms', room.isCompleted);
      return { room, amenities, images };
    });

    return NextResponse.json(
      {
        status: 'success',
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    return formatApiError(error);
  }
};
