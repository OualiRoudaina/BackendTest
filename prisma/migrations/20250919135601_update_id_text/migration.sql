/*
  Warnings:

  - The primary key for the `articles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `brands` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `colors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `influencers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `subcategories` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."articles" DROP CONSTRAINT "articles_colorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."brands" DROP CONSTRAINT "brands_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sales" DROP CONSTRAINT "sales_articleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sales" DROP CONSTRAINT "sales_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sales" DROP CONSTRAINT "sales_influencerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sales" DROP CONSTRAINT "sales_referralInfluencerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sales" DROP CONSTRAINT "sales_subcategoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."subcategories" DROP CONSTRAINT "subcategories_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."articles" DROP CONSTRAINT "articles_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "colorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "articles_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "articles_id_seq";

-- AlterTable
ALTER TABLE "public"."brands" DROP CONSTRAINT "brands_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "brands_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "brands_id_seq";

-- AlterTable
ALTER TABLE "public"."categories" DROP CONSTRAINT "categories_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "categories_id_seq";

-- AlterTable
ALTER TABLE "public"."colors" DROP CONSTRAINT "colors_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "colors_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "colors_id_seq";

-- AlterTable
ALTER TABLE "public"."influencers" DROP CONSTRAINT "influencers_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "favouriteBrandsIds" SET DATA TYPE TEXT[],
ADD CONSTRAINT "influencers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "influencers_id_seq";

-- AlterTable
ALTER TABLE "public"."sales" DROP CONSTRAINT "sales_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "influencerId" SET DATA TYPE TEXT,
ALTER COLUMN "articleId" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ALTER COLUMN "subcategoryId" SET DATA TYPE TEXT,
ALTER COLUMN "colorId" SET DATA TYPE TEXT,
ALTER COLUMN "referralInfluencerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "sales_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "sales_id_seq";

-- AlterTable
ALTER TABLE "public"."subcategories" DROP CONSTRAINT "subcategories_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "subcategories_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "subcategories_id_seq";

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "public"."influencers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_referralInfluencerId_fkey" FOREIGN KEY ("referralInfluencerId") REFERENCES "public"."influencers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "public"."articles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "public"."subcategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."articles" ADD CONSTRAINT "articles_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."brands" ADD CONSTRAINT "brands_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subcategories" ADD CONSTRAINT "subcategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
