-- DropForeignKey
ALTER TABLE "room_amenities" DROP CONSTRAINT "room_amenities_roomId_fkey";

-- AddForeignKey
ALTER TABLE "room_amenities" ADD CONSTRAINT "room_amenities_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
