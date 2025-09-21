/*
  Warnings:

  - You are about to drop the column `categoryId` on the `brands` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."brands" DROP CONSTRAINT "brands_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."brands" DROP COLUMN "categoryId",
ADD COLUMN     "categ" TEXT;
