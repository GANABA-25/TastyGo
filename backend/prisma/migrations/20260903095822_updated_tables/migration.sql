/*
  Warnings:

  - Added the required column `category` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "popular" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "popular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tags" TEXT[];

-- CreateTable
CREATE TABLE "FoodReview" (
    "id" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FoodReview_foodId_idx" ON "FoodReview"("foodId");

-- AddForeignKey
ALTER TABLE "FoodReview" ADD CONSTRAINT "FoodReview_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
