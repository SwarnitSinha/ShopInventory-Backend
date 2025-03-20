import { Request, Response } from 'express';
import { SaleService } from '../services/sale.service';
import mongoose from "mongoose"
import {Buyer} from '../models/buyer.model';

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
      await SaleService.deleteSale(req.body);
      res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: "Error deleting sale", error });
    }
  },

  // Method to filter sales based on query parameters
  filterSales: async (req: Request, res: Response): Promise<void> => {
        try {
            // Log the query parameters
            console.log("Query Parameters:", req.query);
    
            // Extract query parameters
            const { buyer, product, town, startDate, endDate } = req.query;
    
            // Construct filter object
            const filter: any = {};
    
            // Handle buyer filter
            if (buyer) {
                if (mongoose.Types.ObjectId.isValid(buyer as string)) {
                    filter.buyer = new mongoose.Types.ObjectId(buyer as string); // Use as ObjectId if valid
                } else {
                    // Find buyers whose names partially match the query
                const buyerDocs = await Buyer.find({ name: { $regex: buyer as string, $options: 'i' } });
                if (buyerDocs.length > 0) {
                    filter.buyer = { $in: buyerDocs.map(buyerDoc => buyerDoc._id) }; // Use the ObjectIds of matching buyers
                } else {
// If buyer not found, return an empty array
res.status(200).json([]);                        return;
                    }
                }
            }
    
            // Handle product filter
            if (product) {
                if (mongoose.Types.ObjectId.isValid(product as string)) {
                    filter.product = new mongoose.Types.ObjectId(product as string); // Use as ObjectId if valid
                } else {
                        res.status(400).json({ message: `Invalid product ID: "${product}".` });
                        return;
                }
            }
    
            // Handle town filter (if applicable)
            if (town) {
                if (mongoose.Types.ObjectId.isValid(town as string)) {
                    filter.town = new mongoose.Types.ObjectId(town as string); // Use as ObjectId if valid
                } else {
                        res.status(400).json({ message: `Invalid town ID: "${town}".` });
                        return; 
                }
            }
    
            // Handle date range filtering
            if (startDate || endDate) {
                filter.saleDate = {};
                if (startDate) filter.saleDate.$gte = new Date(startDate as string);
                if (endDate) filter.saleDate.$lte = new Date(endDate as string);
            }
    
            console.log("Constructed Filter:", filter);
    
            // Fetch filtered sales from the service
            const sales = await SaleService.getFilteredSales(filter);
    
            // Respond with the filtered sales
            res.status(200).json(sales);
        } catch (error) {
            console.error("Error in filterSales:", error);
            res.status(500).json({ message: "Internal Server Error.", error });
        }
    },

};
