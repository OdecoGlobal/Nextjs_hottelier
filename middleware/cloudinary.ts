// middleware/deleteWithCloudinary.ts
import { deleteFromCloudinary } from '../utils/cloudinary';
import { prisma } from '@/db/prisma';

export async function deleteHotelWithImages(hotelId: string) {
  const hotelWithImages = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: {
      images: true,
      rooms: {
        include: {
          roomImages: true,
        },
      },
    },
  });

  if (!hotelWithImages) return;

  const publicIds: string[] = [];
  publicIds.push(...hotelWithImages.images.map(img => img.public_id));

  for (const room of hotelWithImages.rooms) {
    publicIds.push(...room.roomImages.map(img => img.public_id));
  }

  if (publicIds.length > 0) {
    await deleteFromCloudinary(publicIds);
  }

  await prisma.hotel.delete({
    where: { id: hotelId },
  });
}

export async function deleteRoomWithImages(roomId: string) {
  const roomWithImages = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      roomImages: true,
    },
  });

  if (!roomWithImages) return;

  const publicIds = roomWithImages.roomImages.map(img => img.public_id);

  if (publicIds.length > 0) {
    await deleteFromCloudinary(publicIds);
  }

  await prisma.room.delete({
    where: { id: roomId },
  });
}
