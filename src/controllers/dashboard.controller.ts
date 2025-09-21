import { Request, Response } from "express"; 
import * as dashboardService from "../services/dashboard.service";

class DashboardController {
  async getDashboard(req: Request, res: Response) {
    try {
      const { startDate, endDate, brandId, year } = req.query;

      // Validation des dates
      let parsedStartDate: Date | undefined;
      let parsedEndDate: Date | undefined;
      
      if (startDate) {
        parsedStartDate = new Date(startDate as string);
        if (isNaN(parsedStartDate.getTime())) {
          return res.status(400).json({ 
            message: "Invalid startDate format. Use ISO 8601 format (YYYY-MM-DD)" 
          });
        }
      }
      
      if (endDate) {
        parsedEndDate = new Date(endDate as string);
        if (isNaN(parsedEndDate.getTime())) {
          return res.status(400).json({ 
            message: "Invalid endDate format. Use ISO 8601 format (YYYY-MM-DD)" 
          });
        }
      }

      // Validation de brandId (peut être un string ou un number)
      let parsedBrandId: string | number | undefined;
      if (brandId) {
        // Essayer de convertir en nombre d'abord
        const numericBrandId = parseInt(brandId as string, 10);
        if (!isNaN(numericBrandId)) {
          parsedBrandId = numericBrandId;
        } else {
          // Si ce n'est pas un nombre, garder comme string (pour les IDs MongoDB)
          parsedBrandId = brandId as string;
        }
      }

      // Validation de l'année
      let parsedYear: number | undefined;
      if (year && year !== 'null' && year !== 'undefined') {
        parsedYear = parseInt(year as string, 10);
        if (isNaN(parsedYear) || parsedYear < 1900 || parsedYear > 2100) {
          return res.status(400).json({ 
            message: "Invalid year format. Use a valid year between 1900 and 2100" 
          });
        }
      }

      console.log('Dashboard request received:', { 
        startDate: parsedStartDate, 
        endDate: parsedEndDate, 
        brandId: parsedBrandId,
        year: parsedYear,
        originalQuery: req.query
      });

      const kpis = await dashboardService.getDashboardAPI(
        parsedStartDate,
        parsedEndDate,
        parsedBrandId,
        parsedYear
      );

      res.status(200).json(kpis);
    } catch (error) {
      console.error('Dashboard controller error:', error);
      res.status(500).json({ 
        message: "Internal server error", 
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }
}

export default new DashboardController();
