// test-db-connection.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');

    // Test de connexion basique
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Test des tables
    console.log('\n📊 Checking table counts...');

    const salesCount = await prisma.sales.count();
    const influencersCount = await prisma.influencers.count();
    const articlesCount = await prisma.articles.count();
    const brandsCount = await prisma.brands.count();
    const categoriesCount = await prisma.categories.count();
    const colorsCount = await prisma.colors.count();

    console.log(`📈 Sales: ${salesCount} records`);
    console.log(`👥 Influencers: ${influencersCount} records`);
    console.log(`📦 Articles: ${articlesCount} records`);
    console.log(`🏷️  Brands: ${brandsCount} records`);
    console.log(`📂 Categories: ${categoriesCount} records`);
    console.log(`🎨 Colors: ${colorsCount} records`);

    // Test d'une requête simple
    console.log('\n🔍 Testing sample query...');
    const sampleSales = await prisma.sales.findFirst({
      include: {
        influencer: true,
        category: true,
        article: true
      }
    });

    if (sampleSales) {
      console.log('✅ Sample query successful');
      console.log('📋 Sample data:', {
        id: sampleSales.id,
        amount: sampleSales.amount,
        influencer: sampleSales.influencer?.name || 'N/A',
        brand: sampleSales.brand?.name || 'N/A',
        category: sampleSales.category?.nameFr || 'N/A'
      });
    } else {
      console.log('⚠️  No sales data found - database might be empty');
    }

    console.log('\n🎉 Database connection test completed successfully!');

  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le test
testConnection();
