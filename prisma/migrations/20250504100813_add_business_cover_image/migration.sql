/*
  Warnings:

  - You are about to drop the column `coverImageUrl` on the `businesses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "businesses" DROP COLUMN "coverImageUrl";

-- CreateTable
CREATE TABLE "business_cover_images" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "business_cover_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "business_cover_images" ADD CONSTRAINT "business_cover_images_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
