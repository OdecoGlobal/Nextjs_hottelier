/*
  Warnings:

  - You are about to drop the column `rejectionReason` on the `hotels` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `hotels` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `hotels` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "hotels" DROP COLUMN "rejectionReason",
ADD COLUMN     "additionalNotes" TEXT,
ADD COLUMN     "slug" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "hotel_official_name_idx" ON "hotels"("name");
