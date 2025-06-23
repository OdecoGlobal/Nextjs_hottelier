/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `room_amenities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "room_amenities_roomId_key" ON "room_amenities"("roomId");
