/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - The `paymentMethod` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `amenityType` on the `hotel_amenities` table. All the data in the column will be lost.
  - You are about to drop the column `charge` on the `hotel_amenities` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `hotel_amenities` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `hotel_amenities` table. All the data in the column will be lost.
  - You are about to drop the column `isChargeable` on the `hotel_amenities` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `hotel_amenities` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hotelId]` on the table `hotel_amenities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isBreakfast` to the `hotel_amenities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isWifi` to the `hotel_amenities` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WifiAreaType" AS ENUM ('IN_PUBLIC_AREA', 'IN_GUEST_ROOM');

-- CreateEnum
CREATE TYPE "HotelAmenityChargeType" AS ENUM ('FREE', 'SURCHARGE');

-- CreateEnum
CREATE TYPE "WifiSpeedType" AS ENUM ('MBPS_25', 'MBPS_50', 'MBPS_100', 'MBPS_200');

-- CreateEnum
CREATE TYPE "WifiSurchargeDuration" AS ENUM ('PER_STAY', 'PER_HOUR', 'PER_NIGHT', 'PER_DAY', 'PER_WEEK');

-- CreateEnum
CREATE TYPE "BreakfastSchedule" AS ENUM ('DAILY', 'WEEKDAYS', 'WEEKENDS');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "PaymentMethod";

-- AlterTable
ALTER TABLE "hotel_amenities" DROP COLUMN "amenityType",
DROP COLUMN "charge",
DROP COLUMN "description",
DROP COLUMN "isActive",
DROP COLUMN "isChargeable",
DROP COLUMN "name",
ADD COLUMN     "breakfastChargeType" "HotelAmenityChargeType",
ADD COLUMN     "breakfastEndTime" TEXT,
ADD COLUMN     "breakfastSchedule" "BreakfastSchedule",
ADD COLUMN     "breakfastStartTime" TEXT,
ADD COLUMN     "breakfastSurchargeAmount" DECIMAL(65,30),
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "deviceLimitNumber" INTEGER,
ADD COLUMN     "isBreakfast" BOOLEAN NOT NULL,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeviceLimited" BOOLEAN,
ADD COLUMN     "isWifi" BOOLEAN NOT NULL,
ADD COLUMN     "wifiArea" "WifiAreaType",
ADD COLUMN     "wifiChargeType" "HotelAmenityChargeType",
ADD COLUMN     "wifiSpeed" "WifiSpeedType",
ADD COLUMN     "wifiSurchargeAmout" DECIMAL(65,30),
ADD COLUMN     "wifiSurchargeDuration" "WifiSurchargeDuration";

-- DropEnum
DROP TYPE "AmenityType";

-- CreateIndex
CREATE UNIQUE INDEX "hotel_amenities_hotelId_key" ON "hotel_amenities"("hotelId");
