/*
  Warnings:

  - The `roomWifiChargeType` column on the `hotel_amenities` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `publicWifiChargeType` column on the `hotel_amenities` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `breakfastChargeType` column on the `hotel_amenities` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `lateCheckInType` column on the `hotel_policies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `location` on table `hotels` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "HotelChargeType" AS ENUM ('FREE', 'SURCHARGE');

-- AlterTable
ALTER TABLE "hotel_amenities" DROP COLUMN "roomWifiChargeType",
ADD COLUMN     "roomWifiChargeType" "HotelChargeType",
DROP COLUMN "publicWifiChargeType",
ADD COLUMN     "publicWifiChargeType" "HotelChargeType",
DROP COLUMN "breakfastChargeType",
ADD COLUMN     "breakfastChargeType" "HotelChargeType";

-- AlterTable
ALTER TABLE "hotel_policies" DROP COLUMN "lateCheckInType",
ADD COLUMN     "lateCheckInType" "HotelChargeType";

-- AlterTable
ALTER TABLE "hotels" ALTER COLUMN "location" SET NOT NULL;

-- DropEnum
DROP TYPE "HotelAmenityChargeType";

-- DropEnum
DROP TYPE "LateCheckInFeeType";
