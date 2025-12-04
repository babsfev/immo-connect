-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'ACCOUNTANT';
ALTER TYPE "Role" ADD VALUE 'CONCIERGE';

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "fileHash" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Lease" ADD COLUMN     "accumulatedCredit" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "rentToOwnOption" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sublettingAllowed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "coverImage" TEXT;
