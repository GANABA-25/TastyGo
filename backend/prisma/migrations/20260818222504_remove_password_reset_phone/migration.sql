/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `PasswordResetRequest` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PasswordResetRequest_phoneNumber_idx";

-- AlterTable
ALTER TABLE "PasswordResetRequest" DROP COLUMN "phoneNumber";
