import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fonction de conversion générique
function convertValue(value, field) {
  if (!value || value === '') {
    if (field.toLowerCase().includes('date') || field.toLowerCase().includes('at')) {
      return null;
    }
    return null;
  }

  const booleanFields = [
    'isprivate','premium','haswishlist','isonline','verified','test',
    'android','ios','hasproducts','hasemptywishlists','activedirectshortlinks','newsletter'
  ];
  if (booleanFields.includes(field.toLowerCase())) {
    return value.toString().toLowerCase() === 'true' || value.toString() === '1' || value.toString().toLowerCase() === 'yes';
  }

  if (field.toLowerCase().includes('date') || field.toLowerCase().includes('at')) {
    let date;
    if (!isNaN(value)) {
      date = new Date(parseInt(value) * 1000);
    } else {
      date = new Date(value);
    }
    if (isNaN(date.getTime()) || date.getFullYear() < 1900 || date.getFullYear() > 2100) {
      return null;
    }
    return date;
  }

  if (!isNaN(parseFloat(value))) return parseFloat(value);

  return value.toString().trim();
}

// Fonction d'import CSV
async function importCSV(filePath, tableName) {
  const rows = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => rows.push(data))
      .on('end', resolve)
      .on('error', reject);
  });

  console.log(`📊 ${rows.length} rows read for ${tableName}`);

  for (const row of rows) {
    let data = {};

    switch (tableName) {
      case 'Sales':
        console.log("📥 Importing Sale row:", row);

        // Relations facultatives pour d'autres tables
        const brandSale = row.brandkey
          ? await prisma.brands.findUnique({ where: { brandKey: row.brandkey } })
          : null;
        const categorySale = row.categ
          ? await prisma.categories.findFirst({ where: { id: row.categ } })
          : null;
        const subcategorySale = row.subcateg
          ? await prisma.subcategories.findFirst({ where: { id: row.subcateg } })
          : null;
        const colorSale = row.maincolor
          ? await prisma.colors.findFirst({ where: { id: row.maincolor } })
          : null;

        let articleId = null;
        if (row.articleid) {
          const article = await prisma.articles.findFirst({ where: { id: row.articleid } });
          articleId = article?.id || null;
        }

        data = {
          id: row.key || row.id,
          influencerId: row.influencer || null,           // juste stocke l'UID
          referralInfluencerId: row.referral_influencer || null, // juste stocke l'UID
          offerId: row.offerid || null,
          amount: convertValue(row.amount, 'amount'),
          commission: convertValue(row.commission, 'commission'),
          commissionAffiliate: row.commissionaffiliate ? parseFloat(row.commissionaffiliate) : null,
          commissionAgent: row.commissionagent ? parseFloat(row.commissionagent) : null,
          articleImgUrl: row.articleimgurl || null,
          articlePathUrl: row.articlepathurl || null,
          brandName: row.brandname || null,
          brandKey: row.brandkey || null,
          articleId: row.articleid || null,
          categoryId: row.categ || null,        
          subcategoryId: row.subcateg || null,  
          colorId: row.maincolor || null,       
          createdAt: convertValue(row.createdat, 'createdAt'),
          updatedAt: convertValue(row.lastmodified, 'updatedAt') || new Date(),
          countryCode: row.countrycode || null,
          currency: row.currency || null,
          deviseType: row.devisetype || null,
          os: row.os || null,
          goal: row.goal || null,
          isPrivate: convertValue(row.isprivate, 'isPrivate'),
          status: row.status || null,
          advertiser: row.advertiser || null,
          commissionReferredInfluencer: row.commissionreferredinfluencer ? parseFloat(row.commissionreferredinfluencer) : null,
          customField2: row.customfield2 || null,
          customField3: row.customfield3 || null,
          customField4: row.customfield4 || null,
          customField5: row.customfield5 || null,
          customField6: row.customfield6 || null,
          paymentStatus: row.paiement_status || null,
          salesBillId: row.sales_bill_id || null,
          referralBillId: row.referral_bill_id || null,
          localAmount: convertValue(row.local_amount, 'localAmount'),
          localCommission: convertValue(row.local_commission, 'localCommission'),
          currencyExchange: convertValue(row.currency_exchange, 'currencyExchange'),
          smiSalesPaymentStatus: row.smi_sales_payment_status || null,
          smiReferralPaymentStatus: row.smi_referral_payment_status || null,
          customField7: row.customfield7 || null,
          voucher: row.voucher || null,
          afClickId: row.afclickid || null,
          clickId: row.clickid || null,
          affiliateId: row.affiliateid || null,
        };
        

        await prisma.sales.create({ data });
        break;

      default:
        console.log(`⚠️ Table ${tableName} non gérée pour l'instant`);
        break;
    }
  }

  console.log(`✅ Import completed for ${tableName}`);
}

// Exécution principale
async function main() {
  try {
    await importCSV('./data/sales.csv', 'Sales');
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
