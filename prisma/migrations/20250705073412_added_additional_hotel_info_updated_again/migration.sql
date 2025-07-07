/*
  Warnings:

  - You are about to drop the column `website` on the `hotels` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `hotels` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "hotel_name_idx";

-- DropIndex
DROP INDEX "hotel_slug_idx";

-- AlterTable
ALTER TABLE "hotel_basic_info" ADD COLUMN     "description" TEXT,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "hotels" DROP COLUMN "website",
ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "hotel_slug_idx" ON "hotels"("slug");

-- RenameIndex
ALTER INDEX "hotel_official_name_idx" RENAME TO "hotel_name_idx";
