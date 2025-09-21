/*
  Warnings:

  - You are about to drop the column `brandId` on the `sales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."sales" DROP CONSTRAINT "sales_brandId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sales" DROP CONSTRAINT "sales_colorId_fkey";

-- AlterTable
ALTER TABLE "public"."articles" ADD COLUMN     "colorId" INTEGER;

-- AlterTable
ALTER TABLE "public"."sales" DROP COLUMN "brandId",
ADD COLUMN     "brandKey" TEXT,
ADD COLUMN     "brandName" TEXT;

-- AddForeignKey
ALTER TABLE "public"."articles" ADD CONSTRAINT "articles_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
