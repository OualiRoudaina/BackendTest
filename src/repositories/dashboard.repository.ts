import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fonction utilitaire pour construire les conditions de date
const buildDateWhere = (startDate?: Date, endDate?: Date, year?: number) => {
  const where: any = {};
  
  if (year) {
    // Si une année est spécifiée, filtrer par année entière
    const yearStart = new Date(year, 0, 1); // 1er janvier de l'année
    const yearEnd = new Date(year, 11, 31, 23, 59, 59, 999); // 31 décembre de l'année
    where.createdAt = { gte: yearStart, lte: yearEnd };
  } else if (startDate && endDate) {
    // Sinon, utiliser les dates de début et fin
    where.createdAt = { gte: startDate, lte: endDate };
  }
  
  return where;
};

export const getCA = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number) => {
  const where: any = { ...buildDateWhere(startDate, endDate, year) };
  if (brandId) where.brandKey = brandId.toString();

  const result = await prisma.sales.aggregate({
    _sum: { amount: true },
    where,
  });

  return result._sum.amount || 0;
};

export const getTransactions = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number) => {
  const where: any = { ...buildDateWhere(startDate, endDate, year) };
  if (brandId) where.brandKey = brandId.toString();

  return prisma.sales.count({ where });
};

export const getActiveInfluencers = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number) => {
  const where: any = { ...buildDateWhere(startDate, endDate, year) };
  if (brandId) where.brandKey = brandId.toString();

  const result = await prisma.sales.findMany({
    where,
    select: { influencerId: true },
    distinct: ["influencerId"],
  });

  return result.length;
};

export const getTotalInfluencers = async () => {
  return prisma.influencers.count();
};

export const getMostUsedDevice = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number) => {
  const where: any = { ...buildDateWhere(startDate, endDate, year) };
  if (brandId) where.brandKey = brandId.toString();

  const result = await prisma.sales.groupBy({
    by: ["os"],
    _count: { os: true },
    orderBy: { _count: { os: "desc" } },
    where,
    take: 1,
  });

  return result[0]?.os || null;
};

export const getBestColor = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number) => {
  const where: any = { ...buildDateWhere(startDate, endDate, year) };
  if (brandId) where.brandKey = brandId.toString();

  const result = await prisma.sales.groupBy({
    by: ["colorId"],
    _count: { colorId: true },
    orderBy: { _count: { colorId: "desc" } },
    where,
    take: 1,
  });

  return result[0]?.colorId || null;
};

export const getBestCategory = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number) => {
  const where: any = { ...buildDateWhere(startDate, endDate, year) };
  if (brandId) where.brandKey = brandId.toString();

  const result = await prisma.sales.groupBy({
    by: ["categoryId"],
    _count: { categoryId: true },
    orderBy: { _count: { categoryId: "desc" } },
    where,
    take: 1,
  });

  return result[0]?.categoryId || null;
};

export const getTopDayOfWeek = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number) => {
  const where: any = { ...buildDateWhere(startDate, endDate, year) };
  if (brandId) where.brandKey = brandId.toString();

  const sales = await prisma.sales.findMany({
    where,
    select: { createdAt: true },
  });

  const counts: Record<number, number> = {};
  sales.forEach((sale) => {
    const day = sale.createdAt.getDay();
    counts[day] = (counts[day] || 0) + 1;
  });

  const topDay = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  return topDay ? days[parseInt(topDay[0])] : null;
};

export const getBestProduct = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number) => {
  const where: any = { ...buildDateWhere(startDate, endDate, year) };
  if (brandId) where.brandKey = brandId.toString();

  const result = await prisma.sales.groupBy({
    by: ["articleId"],
    _count: { articleId: true },
    orderBy: { _count: { articleId: "desc" } },
    where,
    take: 1,
  });

  return result[0]?.articleId || null;
};

export const getTopTimeOfDay = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number) => {
  const where: any = { ...buildDateWhere(startDate, endDate, year) };
  if (brandId) where.brandKey = brandId.toString();

  const sales = await prisma.sales.findMany({
    where,
    select: { createdAt: true },
  });

  const counts: Record<number, number> = {};
  sales.forEach((sale) => {
    const hour = sale.createdAt.getHours();
    counts[hour] = (counts[hour] || 0) + 1;
  });

  const topHour = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return topHour ? `${topHour[0]}:00` : null;
};

export const getTopCountry = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number) => {
  const where: any = { ...buildDateWhere(startDate, endDate, year) };
  if (brandId) where.brandKey = brandId.toString();

  const result = await prisma.sales.groupBy({
    by: ["countryCode"],
    _count: { countryCode: true },
    orderBy: { _count: { countryCode: "desc" } },
    where,
    take: 1,
  });

  return result[0]?.countryCode || null;
};

export const getTopInfluencer = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number) => {
  const where: any = { ...buildDateWhere(startDate, endDate, year) };
  if (brandId) where.brandKey = brandId.toString();

  const result = await prisma.sales.groupBy({
    by: ["influencerId"],
    _sum: { amount: true },
    orderBy: { _sum: { amount: "desc" } },
    where,
    take: 1,
  });

  return result[0]?.influencerId || null;
};

// Nouvelles fonctions pour récupérer les noms
export const getColorName = async (colorId: string | null) => {
  if (!colorId) return null;
  
  const color = await prisma.colors.findUnique({
    where: { id: colorId },
    select: { nameFr: true, nameEn: true }
  });
  
  if (color?.nameFr) return color.nameFr;
  if (color?.nameEn) return color.nameEn;
  
  // Si pas de couleur trouvée, retourner un nom générique basé sur l'ID
  return `Couleur ${colorId.slice(-4)}`;
};

export const getCategoryName = async (categoryId: string | null) => {
  if (!categoryId) return null;
  
  const category = await prisma.categories.findUnique({
    where: { id: categoryId },
    select: { nameFr: true, nameEn: true }
  });
  
  return category?.nameFr || category?.nameEn || `Catégorie ${categoryId.slice(-4)}`;
};

export const getProductName = async (productId: string | null) => {
  if (!productId) return null;
  
  const product = await prisma.articles.findUnique({
    where: { id: productId },
    select: { uid: true, url: true }
  });
  
  if (product?.uid) return product.uid;
  if (product?.url) {
    // Extraire le nom du produit de l'URL
    const urlParts = product.url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    return lastPart.split('?')[0] || `Produit ${productId.slice(-4)}`;
  }
  
  return `Produit ${productId.slice(-4)}`;
};

export const getInfluencerName = async (influencerId: string | null) => {
  if (!influencerId) return null;
  
  const influencer = await prisma.influencers.findUnique({
    where: { id: influencerId },
    select: { name: true, firstName: true, lastName: true }
  });
  
  if (influencer?.name) return influencer.name;
  if (influencer?.firstName && influencer?.lastName) {
    return `${influencer.firstName} ${influencer.lastName}`;
  }
  if (influencer?.firstName) return influencer.firstName;
  
  return `Influenceur ${influencerId.slice(-4)}`;
};

// Calculer le taux de vente par influenceur
export const getSalesRateByInfluencer = async (startDate?: Date, endDate?: Date, brandId?: string | number, year?: number) => {
  const where: any = { ...buildDateWhere(startDate, endDate, year) };
  if (brandId) where.brandKey = brandId.toString();
  
  // Compter le nombre total de ventes
  const totalSales = await prisma.sales.count({ where });
  
  // Compter le nombre de ventes avec un influenceur (influencerId non null)
  const salesWithInfluencer = await prisma.sales.count({
    where: {
      ...where,
      influencerId: { not: null }
    }
  });
  
  // Calculer le pourcentage
  const salesRate = totalSales > 0 ? (salesWithInfluencer / totalSales) * 100 : 0;
  
  return {
    totalSales,
    salesWithInfluencer,
    salesRate: Math.round(salesRate * 100) / 100 // Arrondir à 2 décimales
  };
};
