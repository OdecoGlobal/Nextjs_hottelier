/*
  Warnings:

  - Made the column `isOpen24Hours` on table `hotel_policies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `hotels` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "hotel_policies" ALTER COLUMN "isOpen24Hours" SET NOT NULL;

-- AlterTable
ALTER TABLE "hotels" ADD COLUMN     "Location" TEXT,
ADD COLUMN     "officialEmail" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "websitie" TEXT,
ALTER COLUMN "description" SET NOT NULL;
