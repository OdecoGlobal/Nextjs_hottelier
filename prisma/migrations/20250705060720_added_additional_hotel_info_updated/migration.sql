/*
  Warnings:

  - You are about to drop the column `Location` on the `hotels` table. All the data in the column will be lost.
  - You are about to drop the column `websitie` on the `hotels` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[officialEmail]` on the table `hotels` will be added. If there are existing duplicate values, this will fail.
  - Made the column `officialEmail` on table `hotels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `hotels` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "hotels" DROP COLUMN "Location",
DROP COLUMN "websitie",
ADD COLUMN     "hotelEmailVerified" TIMESTAMP(6),
ADD COLUMN     "isHotelEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "officialEmail" SET NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "hotel_email_idx" ON "hotels"("officialEmail");
