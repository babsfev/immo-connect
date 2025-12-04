-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PropertyType" ADD VALUE 'ROOM';
ALTER TYPE "PropertyType" ADD VALUE 'BUILDING';

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
