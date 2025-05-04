/*
  Warnings:

  - You are about to drop the `business_cover_images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "business_cover_images" DROP CONSTRAINT "business_cover_images_businessId_fkey";

-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "coverImageUrl" TEXT;

-- DropTable
DROP TABLE "business_cover_images";
