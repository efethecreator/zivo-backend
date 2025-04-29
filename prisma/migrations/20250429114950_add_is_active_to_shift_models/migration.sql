-- AlterTable
ALTER TABLE "business_shifts" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "shift_times" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
