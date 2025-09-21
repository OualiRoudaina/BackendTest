-- CreateTable
CREATE TABLE "public"."sales" (
    "id" SERIAL NOT NULL,
    "afClickId" TEXT,
    "influencerId" INTEGER,
    "offerId" TEXT,
    "clickId" TEXT,
    "affiliateId" TEXT,
    "amount" DOUBLE PRECISION,
    "commission" DOUBLE PRECISION,
    "commissionAffiliate" DOUBLE PRECISION,
    "commissionAgent" DOUBLE PRECISION,
    "articleId" INTEGER,
    "articleImgUrl" TEXT,
    "articlePathUrl" TEXT,
    "brandId" INTEGER,
    "categoryId" INTEGER,
    "subcategoryId" INTEGER,
    "colorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "countryCode" TEXT,
    "currency" TEXT,
    "deviseType" TEXT,
    "os" TEXT,
    "goal" TEXT,
    "isPrivate" BOOLEAN DEFAULT false,
    "status" TEXT,
    "advertiser" TEXT,
    "commissionReferredInfluencer" DOUBLE PRECISION,
    "customField2" TEXT,
    "customField3" TEXT,
    "customField4" TEXT,
    "customField5" TEXT,
    "customField6" TEXT,
    "paymentStatus" TEXT,
    "salesBillId" TEXT,
    "referralBillId" TEXT,
    "localAmount" DOUBLE PRECISION,
    "localCommission" DOUBLE PRECISION,
    "currencyExchange" DOUBLE PRECISION,
    "referralInfluencerId" INTEGER,
    "smiSalesPaymentStatus" TEXT,
    "smiReferralPaymentStatus" TEXT,
    "customField7" TEXT,
    "voucher" TEXT,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."articles" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "likesNbr" INTEGER,
    "offerId" TEXT,
    "orderNbr" INTEGER,
    "site" TEXT,
    "trackingLink" TEXT,
    "uid" TEXT,
    "url" TEXT,
    "wishlistId" TEXT,
    "hasWishlist" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plugin" TEXT,
    "test" BOOLEAN DEFAULT false,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."brands" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "displayName" TEXT,
    "description" TEXT,
    "premium" BOOLEAN DEFAULT false,
    "href" TEXT,
    "offerId" TEXT,
    "currency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER,
    "brandKey" TEXT,
    "localisation" TEXT,
    "isPrivate" BOOLEAN DEFAULT false,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."colors" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "nameEn" TEXT,
    "nameFr" TEXT,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" SERIAL NOT NULL,
    "nameEn" TEXT,
    "nameFr" TEXT,
    "nameEs" TEXT,
    "namePl" TEXT,
    "img" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."subcategories" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER,
    "nameEn" TEXT,
    "nameFr" TEXT,

    CONSTRAINT "subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."influencers" (
    "id" SERIAL NOT NULL,
    "affiliateId" TEXT,
    "uid" TEXT,
    "kolId" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "name" TEXT,
    "civility" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "phoneCode" TEXT,
    "phoneCountryCode" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "country" TEXT,
    "language" TEXT,
    "isOnline" BOOLEAN DEFAULT false,
    "communitySize" INTEGER,
    "score" DOUBLE PRECISION,
    "verified" BOOLEAN DEFAULT false,
    "newsletter" BOOLEAN DEFAULT false,
    "referredBy" TEXT,
    "agentId" TEXT,
    "favouriteBrands" TEXT[],
    "favouriteBrandsIds" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastConnexion" TIMESTAMP(3),
    "hubspotId" TEXT,
    "stability" TEXT,
    "android" BOOLEAN,
    "ios" BOOLEAN,
    "appVersion" TEXT,
    "hasProducts" BOOLEAN,
    "hasEmptyWishlists" BOOLEAN,
    "amznId" TEXT,
    "activateDirectShortlinks" BOOLEAN,

    CONSTRAINT "influencers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brands_brandKey_key" ON "public"."brands"("brandKey");

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "public"."influencers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_referralInfluencerId_fkey" FOREIGN KEY ("referralInfluencerId") REFERENCES "public"."influencers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "public"."articles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "public"."subcategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sales" ADD CONSTRAINT "sales_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."brands" ADD CONSTRAINT "brands_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subcategories" ADD CONSTRAINT "subcategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
