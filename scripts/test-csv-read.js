// test-csv-read.js
import fs from 'fs';
import csv from 'csv-parser';

async function testCSVRead(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    let rowCount = 0;
    
    console.log(`🔍 Testing CSV file: ${filePath}`);
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        rowCount++;
        if (rowCount <= 3) { // Afficher seulement les 3 premières lignes
          console.log(`\n📋 Row ${rowCount}:`);
          console.log('Columns found:', Object.keys(data));
          console.log('Sample data:', {
            key: data.key,
            afclickid: data.afclickid,
            influencer: data.influencer,
            brandname: data.brandname,
            brandkey: data.brandkey,
            amount: data.amount,
            createdat: data.createdat
          });
        }
        results.push(data);
      })
      .on('end', () => {
        console.log(`\n✅ CSV file read successfully!`);
        console.log(`📊 Total rows: ${rowCount}`);
        console.log(`📋 Total columns: ${Object.keys(results[0] || {}).length}`);
        console.log(`🔑 Column names:`, Object.keys(results[0] || {}));
        resolve(results);
      })
      .on('error', (error) => {
        console.error(`❌ Error reading CSV:`, error);
        reject(error);
      });
  });
}

// Fonction principale
async function main() {
  try {
    const csvFile = process.argv[2] || './data/sales.csv';
    
    if (!fs.existsSync(csvFile)) {
      console.error(`❌ File ${csvFile} does not exist`);
      console.log('Usage: node test-csv-read.js [path-to-csv-file]');
      process.exit(1);
    }
    
    await testCSVRead(csvFile);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Exécuter le test
main();



