import { Request, Response } from 'express';
import { SaleService } from '../services/sale.service';

export const SaleController = {
  // Get all sales
  getSales: async (req: Request, res: Response) => {
    try {
      const sales = await SaleService.getAllSales();
      res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: "Error getting sale", error });
    }
  },

  // Get a sale by ID
  getSaleById: async (req: Request, res: Response) => {
    try {
      const sale = await SaleService.getSaleById(req.params.id);
      res.status(200).json(sale);
    } catch (error) {
        res.status(404).json({ message: "No record find!", error });
    }
  },

  // Create a new sale
  createSale: async (req: Request, res: Response) => {
    try {
      const newSale = await SaleService.createSale(req.body);
      res.status(201).json(newSale);
    } catch (error) {
        res.status(400).json({ message: "Error creating sale", error });
    }
  },

  // Update a sale by ID
  updateSale: async (req: Request, res: Response) => {
    try {
      const updatedSale = await SaleService.updateSale(req.params.id, req.body);
      res.status(200).json(updatedSale);
    } catch (error) {
        res.status(404).json({ message: "Error updating sale", error });
    }
  },

  // Soft delete a sale by ID
  deleteSale: async (req: Request, res: Response) => {
    try {
      await SaleService.deleteSale(req.params.id);
      res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: "Error deleting sale", error });
    }
  },

  // Method to filter sales based on query parameters
  filterSales: async (req: Request, res: Response) => {
        try {
          // Extract query parameters
          const { buyer, town, product, startDate, endDate } = req.query;
    
          // Construct filter object
          const filter: any = {};
    
          if (buyer) filter.buyer = buyer;
          if (town) filter.town = town;
          if (product) filter.product = product;
    
          // Handle date range filtering
          if (startDate || endDate) {
            filter.saleDate = {};
            if (startDate) filter.saleDate.$gte = new Date(startDate as string);
            if (endDate) filter.saleDate.$lte = new Date(endDate as string);
          }
    
          // Fetch filtered sales from the service
          const sales = await SaleService.getFilteredSales(filter);
    
          // Respond with the filtered sales
          res.status(200).json(sales);
        } catch (error) {
                res.status(404).json({ message: "Internal Server Error.", error });
        }
      },
};
