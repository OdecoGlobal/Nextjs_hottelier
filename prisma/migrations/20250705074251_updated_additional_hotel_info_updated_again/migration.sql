/*
  Warnings:

  - You are about to drop the column `name` on the `hotel_basic_info` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `hotel_basic_info` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `hotel_basic_info` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `hotels` table. All the data in the column will be lost.
  - Made the column `description` on table `hotel_basic_info` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "hotel_basic_info" DROP COLUMN "name",
DROP COLUMN "rating",
DROP COLUMN "slug",
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "hotels" DROP COLUMN "description",
ADD COLUMN     "rating" DECIMAL(3,2) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "hotel_city" ON "hotel_basic_info"("city");

-- CreateIndex
CREATE INDEX "hotel_name" ON "hotels"("name");

-- CreateIndex
CREATE INDEX "location" ON "hotels"("location");
