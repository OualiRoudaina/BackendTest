export interface DashboardResponseDTO {
  ca: number;
  transactions: number;
  panierMoyen: number;
  actifsInfluencers: number;
  totalInfluencers: number;
  appareilLePlusUtilise: string | null;
  meilleureCouleur: string | null;
  meilleureCategorie: string | null;
  meilleurJourSemaine: string | null;
  meilleurProduit: string | null;
  meilleurMomentJour: string | null;
  meilleurPays: string | null;
  meilleurInfluencer: string | null;
  totalSales: number;
  salesWithInfluencer: number;
  salesRateByInfluencer: number;
}
