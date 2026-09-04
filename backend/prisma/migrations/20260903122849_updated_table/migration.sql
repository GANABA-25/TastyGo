/*
  Warnings:

  - You are about to drop the column `reviews` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "reviews";

-- CreateTable
CREATE TABLE "RestaurantReview" (
    "id" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RestaurantReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RestaurantReview_restaurantId_idx" ON "RestaurantReview"("restaurantId");

-- AddForeignKey
ALTER TABLE "RestaurantReview" ADD CONSTRAINT "RestaurantReview_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
