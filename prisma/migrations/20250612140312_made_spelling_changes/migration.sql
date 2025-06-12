/*
  Warnings:

  - You are about to drop the column `advancedNoticeCheckIn` on the `hotel_policies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "hotel_policies" DROP COLUMN "advancedNoticeCheckIn",
ADD COLUMN     "isAdvancedNoticeCheckIn" BOOLEAN DEFAULT false;
