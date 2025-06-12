/*
  Warnings:

  - You are about to drop the column `depsoitAmount` on the `hotel_policies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "hotel_policies" DROP COLUMN "depsoitAmount",
ADD COLUMN     "depositAmount" DECIMAL(65,30);
