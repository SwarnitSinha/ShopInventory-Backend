import Sale, { ISale } from '../models/sale.model';
import mongoose from 'mongoose';

import { Product } from '../models/product.model'; // Import the Product model

interface ITown {
  name: string;
  district: string;
  state: string;
  country: string;
}

interface IBuyerPopulated {
  name: string;
  type: 'shopkeeper' | 'technician';
  town: ITown; // this is now fully populated
}

export interface ISalePopulated extends Omit<ISale, 'buyer'>  {
  buyer: IBuyerPopulated; // not just ObjectId, but a populated buyer
}

export const SaleRepository = {

  // Create a new sale
  async createSale(saleData: Partial<ISale>, shopId:string): Promise<ISale> {
    try {
      saleData.shopId = shopId; // Set the shopId from the request
      const sale = new Sale(saleData);
      return await sale.save();
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        // Handle validation errors
        throw new Error(`Validation error: ${error.message}`);
      }
      throw new Error(`Failed to create sale: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  // Soft delete a sale by ID
  deleteSale: async (data: any, shopId:string) => {
    return await Sale.findByIdAndUpdate(data.id, { isDeleted: true }, { new: true });
  },
  
  

  

  /**
   * Get all sales with optional pagination
   * @param page Page number (default: 1)
   * @param limit Number of items per page (default: 10)
   * @returns Array of sale documents with pagination metadata
   */
  async getAllSales(page: number = 1, limit: number = 10, shopId:string): Promise<{ sales: ISale[], total: number, pages: number }> {
    try {
      const skip = (page - 1) * limit;

      // Define the query filter
      const query = { shopId: shopId, isDeleted: false };


      const [sales, total] = await Promise.all([
        Sale.find(query)
          .sort({ saleDate: -1 })
          .skip(skip)
          .limit(limit)
          .populate('buyer')
          .populate('buyer.town', 'name')
          .populate('products.product', 'name price'),
        Sale.countDocuments(query)
      ]);

      
      return {
        sales,
        total,
        pages: Math.ceil(total / limit)
      };
    } catch (error) {
      throw new Error(`Failed to get sales: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  /**
   * Get a sale by its ID
   * @param id Sale ID
   * @returns Sale document or null if not found
   */
  async getSaleById(id: string, shopId:string): Promise<ISale | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid sale ID');
      }
      
      return await Sale.findById(id)
        .populate('buyer', 'name email')
        .populate('products.product', 'name price');
    } catch (error) {
      throw new Error(`Failed to get sale: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  /**
   * Update a sale by its ID
   * @param id Sale ID
   * @param updateData Data to update the sale with
   * @returns Updated sale document or null if not found
   */
  async updateSale(id: string, updateData: Partial<ISale>, shopId:string): Promise<ISale | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid sale ID');
      }
      
      return await Sale.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      )
      .populate('buyer', 'name email')
      .populate('products.product', 'name price');
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new Error(`Validation error: ${error.message}`);
      }
      throw new Error(`Failed to update sale: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  async search(query: any) {
    const sale =  await Sale.find(query).sort({ createdAt: -1 })
    .populate('buyer')
    .populate('buyer.town', 'name')
    .populate('products.product', 'name price');
    return sale;
  }
};