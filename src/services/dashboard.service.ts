
import * as repo from "../repositories/dashboard.repository";
import { DashboardResponseDTO } from "../dtos/dashboard.dto";

export const getDashboardAPI = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number): Promise<DashboardResponseDTO> => {
    console.log('Starting dashboard API with filters:', { startDate, endDate, brandId, year });
    
    const startTime = Date.now();
    
    const ca = await repo.getCA(startDate, endDate, brandId, year);
    console.log('CA query completed in:', Date.now() - startTime, 'ms');
    
    const transactions = await repo.getTransactions(startDate, endDate, brandId, year);
    console.log('Transactions query completed in:', Date.now() - startTime, 'ms');
    
    const panierMoyen = transactions > 0 ? ca / transactions : 0;
    const actifsInfluencers = await repo.getActiveInfluencers(startDate, endDate, brandId, year);
    console.log('Active influencers query completed in:', Date.now() - startTime, 'ms');
    
    const totalInfluencers = await repo.getTotalInfluencers();
    console.log('Total influencers query completed in:', Date.now() - startTime, 'ms');
    
    const appareilLePlusUtilise = await repo.getMostUsedDevice(startDate, endDate, brandId, year);
    console.log('Most used device query completed in:', Date.now() - startTime, 'ms');
    
    // Récupérer les données de base d'abord
    const meilleureCouleurId = await repo.getBestColor(startDate, endDate, brandId, year);
    console.log('Best color query completed in:', Date.now() - startTime, 'ms');
    
    const meilleureCategorieId = await repo.getBestCategory(startDate, endDate, brandId, year);
    console.log('Best category query completed in:', Date.now() - startTime, 'ms');
    
    const meilleurProduitId = await repo.getBestProduct(startDate, endDate, brandId, year);
    console.log('Best product query completed in:', Date.now() - startTime, 'ms');
    
    const meilleurInfluencerId = await repo.getTopInfluencer(startDate, endDate, brandId, year);
    console.log('Top influencer query completed in:', Date.now() - startTime, 'ms');
    
    // Enrichir avec les noms (avec gestion d'erreur)
    let meilleureCouleur = meilleureCouleurId;
    let meilleureCategorie = meilleureCategorieId;
    let meilleurProduit = meilleurProduitId;
    let meilleurInfluencer = meilleurInfluencerId;
    
    try {
        meilleureCouleur = await repo.getColorName(meilleureCouleurId);
    } catch (error) {
        console.log('Erreur getColorName:', error);
    }
    
    try {
        meilleureCategorie = await repo.getCategoryName(meilleureCategorieId);
    } catch (error) {
        console.log('Erreur getCategoryName:', error);
    }
    
    try {
        meilleurProduit = await repo.getProductName(meilleurProduitId);
    } catch (error) {
        console.log('Erreur getProductName:', error);
    }
    
    try {
        meilleurInfluencer = await repo.getInfluencerName(meilleurInfluencerId);
    } catch (error) {
        console.log('Erreur getInfluencerName:', error);
    }
    
    const meilleurJourSemaine = await repo.getTopDayOfWeek(startDate, endDate, brandId, year);
    const meilleurMomentJour = await repo.getTopTimeOfDay(startDate, endDate, brandId, year);
    const meilleurPays = await repo.getTopCountry(startDate, endDate, brandId, year);
    
    // Calculer le taux de vente par influenceur
    const salesRateData = await repo.getSalesRateByInfluencer(startDate, endDate, brandId, year);
    console.log('Sales rate query completed in:', Date.now() - startTime, 'ms');
    
    console.log('Total dashboard API time:', Date.now() - startTime, 'ms');
    
    return {
        ca,
        transactions,
        panierMoyen,
        actifsInfluencers,
        totalInfluencers,
        appareilLePlusUtilise,
        meilleureCouleur,
        meilleureCategorie,
        meilleurJourSemaine,
        meilleurProduit,
        meilleurMomentJour,
        meilleurPays,
        meilleurInfluencer,
        // Nouvelles données pour le taux de vente par influenceur
        totalSales: salesRateData.totalSales,
        salesWithInfluencer: salesRateData.salesWithInfluencer,
        salesRateByInfluencer: salesRateData.salesRate
    };
}