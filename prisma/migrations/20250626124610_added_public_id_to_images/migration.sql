/*
  Warnings:

  - Added the required column `public_id` to the `hotel_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `room_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hotel_images" ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "room_images" ADD COLUMN     "public_id" TEXT NOT NULL;
