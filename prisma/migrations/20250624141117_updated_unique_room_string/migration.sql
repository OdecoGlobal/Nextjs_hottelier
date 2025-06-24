/*
  Warnings:

  - A unique constraint covering the columns `[roomType,roomClass]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "rooms_roomType_key";

-- CreateIndex
CREATE UNIQUE INDEX "rooms_roomType_roomClass_key" ON "rooms"("roomType", "roomClass");
