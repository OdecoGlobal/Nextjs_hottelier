/*
  Warnings:

  - Made the column `slug` on table `hotels` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "hotels" ADD COLUMN     "description" TEXT,
ALTER COLUMN "slug" SET NOT NULL;
