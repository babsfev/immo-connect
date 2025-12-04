/*
  Warnings:

  - The values [REVIEWING,ACCEPTED] on the enum `AppStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [COMMERCIAL] on the enum `PropertyType` will be removed. If these variants are still used in the database, this will fail.
  - The values [OPEN,RESOLVED,CLOSED] on the enum `TicketStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `method` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `monthlyCharges` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `purchasePrice` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `managerId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyUsage" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'MIXED');

-- CreateEnum
CREATE TYPE "GenderPreference" AS ENUM ('MIXED', 'FEMALE_ONLY', 'MALE_ONLY');

-- CreateEnum
CREATE TYPE "UtilityType" AS ENUM ('INCLUDED', 'SHARED', 'PREPAID');

-- AlterEnum
BEGIN;
CREATE TYPE "AppStatus_new" AS ENUM ('NEW', 'VISIT_SCHEDULED', 'ANALYSIS', 'OFFER', 'SIGNED', 'REJECTED');
ALTER TABLE "Application" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Application" ALTER COLUMN "status" TYPE "AppStatus_new" USING ("status"::text::"AppStatus_new");
ALTER TYPE "AppStatus" RENAME TO "AppStatus_old";
ALTER TYPE "AppStatus_new" RENAME TO "AppStatus";
DROP TYPE "AppStatus_old";
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PropertyType_new" AS ENUM ('APARTMENT', 'HOUSE', 'STUDIO', 'OFFICE', 'RETAIL', 'WAREHOUSE', 'INDUSTRIAL', 'LAND', 'PARKING');
ALTER TABLE "Property" ALTER COLUMN "type" TYPE "PropertyType_new" USING ("type"::text::"PropertyType_new");
ALTER TYPE "PropertyType" RENAME TO "PropertyType_old";
ALTER TYPE "PropertyType_new" RENAME TO "PropertyType";
DROP TYPE "PropertyType_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'AGENCY';
ALTER TYPE "Role" ADD VALUE 'PROSPECT';
ALTER TYPE "Role" ADD VALUE 'NOTARY';

-- AlterEnum
BEGIN;
CREATE TYPE "TicketStatus_new" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');
ALTER TABLE "Ticket" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Ticket" ALTER COLUMN "status" TYPE "TicketStatus_new" USING ("status"::text::"TicketStatus_new");
ALTER TYPE "TicketStatus" RENAME TO "TicketStatus_old";
ALTER TYPE "TicketStatus_new" RENAME TO "TicketStatus";
DROP TYPE "TicketStatus_old";
ALTER TABLE "Ticket" ALTER COLUMN "status" SET DEFAULT 'TODO';
COMMIT;

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_ownerId_fkey";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "propertyId" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Lease" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "deletedAt" TIMESTAMP(3),
DROP COLUMN "method",
ADD COLUMN     "method" TEXT;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "monthlyCharges",
DROP COLUMN "ownerId",
DROP COLUMN "purchasePrice",
ADD COLUMN     "ceilingHeight" DOUBLE PRECISION,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "hasExtraction" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "keyMoney" DOUBLE PRECISION,
ADD COLUMN     "managerId" TEXT NOT NULL,
ADD COLUMN     "retailArea" DOUBLE PRECISION,
ADD COLUMN     "showcase" DOUBLE PRECISION,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "usage" "PropertyUsage" NOT NULL DEFAULT 'RESIDENTIAL',
ADD COLUMN     "vatRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "zoning" TEXT;

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "assigneeId" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'TODO';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kycDocuments" TEXT[],
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY['PROSPECT']::"Role"[];

-- DropEnum
DROP TYPE "PaymentMethod";

-- CreateTable
CREATE TABLE "RoomListing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "deposit" DOUBLE PRECISION,
    "availableFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "surface" DOUBLE PRECISION NOT NULL,
    "isFurnished" BOOLEAN NOT NULL DEFAULT false,
    "hasPrivateBath" BOOLEAN NOT NULL DEFAULT false,
    "hasBalcony" BOOLEAN NOT NULL DEFAULT false,
    "hasAC" BOOLEAN NOT NULL DEFAULT false,
    "genderPref" "GenderPreference" NOT NULL DEFAULT 'MIXED',
    "smokerAllowed" BOOLEAN NOT NULL DEFAULT false,
    "petsAllowed" BOOLEAN NOT NULL DEFAULT false,
    "occupation" TEXT,
    "electricity" "UtilityType" NOT NULL DEFAULT 'SHARED',
    "water" "UtilityType" NOT NULL DEFAULT 'SHARED',
    "internet" "UtilityType" NOT NULL DEFAULT 'INCLUDED',
    "cleaning" "UtilityType" NOT NULL DEFAULT 'SHARED',
    "propertyId" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RoomListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guarantor" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "income" DOUBLE PRECISION NOT NULL,
    "relationship" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "Guarantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "userId" TEXT,
    "details" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "RoomListing_price_idx" ON "RoomListing"("price");

-- CreateIndex
CREATE INDEX "RoomListing_propertyId_idx" ON "RoomListing"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Guarantor_applicationId_key" ON "Guarantor"("applicationId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_entity_idx" ON "AuditLog"("entity");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavorites_AB_unique" ON "_UserFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavorites_B_index" ON "_UserFavorites"("B");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Application_propertyId_idx" ON "Application"("propertyId");

-- CreateIndex
CREATE INDEX "Expense_propertyId_idx" ON "Expense"("propertyId");

-- CreateIndex
CREATE INDEX "Expense_date_idx" ON "Expense"("date");

-- CreateIndex
CREATE INDEX "Lease_propertyId_idx" ON "Lease"("propertyId");

-- CreateIndex
CREATE INDEX "Lease_tenantId_idx" ON "Lease"("tenantId");

-- CreateIndex
CREATE INDEX "Lease_status_idx" ON "Lease"("status");

-- CreateIndex
CREATE INDEX "Payment_tenantId_idx" ON "Payment"("tenantId");

-- CreateIndex
CREATE INDEX "Payment_leaseId_idx" ON "Payment"("leaseId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_dueDate_idx" ON "Payment"("dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");

-- CreateIndex
CREATE INDEX "Property_city_idx" ON "Property"("city");

-- CreateIndex
CREATE INDEX "Property_status_idx" ON "Property"("status");

-- CreateIndex
CREATE INDEX "Property_type_idx" ON "Property"("type");

-- CreateIndex
CREATE INDEX "Property_price_idx" ON "Property"("price");

-- CreateIndex
CREATE INDEX "Property_managerId_idx" ON "Property"("managerId");

-- CreateIndex
CREATE INDEX "Tenant_email_idx" ON "Tenant"("email");

-- CreateIndex
CREATE INDEX "Tenant_lastName_idx" ON "Tenant"("lastName");

-- CreateIndex
CREATE INDEX "Ticket_status_idx" ON "Ticket"("status");

-- CreateIndex
CREATE INDEX "Ticket_propertyId_idx" ON "Ticket"("propertyId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomListing" ADD CONSTRAINT "RoomListing_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lease" ADD CONSTRAINT "Lease_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guarantor" ADD CONSTRAINT "Guarantor_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavorites" ADD CONSTRAINT "_UserFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavorites" ADD CONSTRAINT "_UserFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
