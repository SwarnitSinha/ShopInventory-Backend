import { ISalePopulated, SaleRepository } from '../repositories/sale.repo';
import { Product } from '../models/product.model';
import Sale, { ISale, ISaleProduct } from '../models/sale.model';
import mongoose from 'mongoose';
import { Buyer } from '../models/buyer.model';
import { Town } from '../models/town.model';

export interface InsertSaleDto {
  products: Array<{
    product: string;
    quantity: number;
    pricePerUnit: number;
    totalAmount: number;
  }>;
  buyer: string;
  amountPaid: number;
  grandTotal: number;
  status: 'completed' | 'due';
  saleDate: Date | null;
}

// This interface represents the data coming from the frontend
export interface InsertSaleDto {
  products: Array<{
    product: string;
    quantity: number;
    pricePerUnit: number;
    totalAmount: number;
  }>;
  buyer: string;
  amountPaid: number;
  grandTotal: number;
  status: 'completed' | 'due';
  saleDate: Date | null;
}

// This interface represents update data
export interface UpdateSaleDto {
  products?: Array<{
    product: string;
    quantity: number;
    pricePerUnit: number;
    totalAmount: number;
  }>;
  buyer?: string;
  amountPaid?: number;
  grandTotal?: number;
  status?: 'completed' | 'due';
  saleDate?: string | Date | null;
}

export interface PaginationParams {
  page?: string | number;
  limit?: string | number;
}

export const SaleService = {
  // Fetch all sales
  /**
   * Get all sales with pagination
   * @param params Pagination parameters
   * @returns Sales with pagination metadata
   */
  async getAllSales(params: PaginationParams = {}) {
    try {
      const page = params.page ? Number(params.page) : 1;
      const limit = params.limit ? Number(params.limit) : 10;

      if (isNaN(page) || page < 1) {
        throw new Error('Invalid page parameter');
      }

      if (isNaN(limit) || limit < 1 || limit > 100) {
        throw new Error('Invalid limit parameter (must be between 1 and 100)');
      }
      console.log(page,limit);
      return await SaleRepository.getAllSales(page, limit);
    } catch (error) {
      throw new Error(`Service error: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  /**
   * Get a sale by ID
   * @param id Sale ID
   * @returns The sale if found
   */
  async getSaleById(id: string): Promise<ISale> {
    try {
      const sale = await SaleRepository.getSaleById(id);

      if (!sale) {
        throw new Error(`Sale with ID ${id} not found`);
      }

      return sale;
    } catch (error) {
      throw new Error(`Service error: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  // Create a new sale
  async createSale(saleData: InsertSaleDto): Promise<ISale> {
    try {
      // Convert string IDs to ObjectIds
      const preparedData = {
        ...saleData,
        products: saleData.products.map(product => ({
          ...product,
          product: new mongoose.Types.ObjectId(product.product)
        })),
        buyer: new mongoose.Types.ObjectId(saleData.buyer),
        // Convert string date to Date object if needed
        saleDate: saleData.saleDate ? new Date(saleData.saleDate) : null
      };

      //decrease the amount of product 
      // Decrease product quantity
    for (const p of preparedData.products) {
      const product = await Product.findById(p.product);
      if (!product) throw new Error("Product not found");
      console.log("prev quantity: ", product.quantity);
      console.log("quantity to be decreased: ", p.quantity);
      product.quantity -= p.quantity;
      console.log("new quantity: ", product.quantity);

      if (product.quantity < 0) {
        throw new Error("Available quantity is less.");
      }

      await product.save(); // Save updated product
    }

      return await SaleRepository.createSale(preparedData);

    } catch (error) {
      throw new Error(`Service error: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  /**
  * Update a sale by ID
  * @param id Sale ID
  * @param updateData Data to update the sale with
  * @returns The updated sale
  */
  async updateSale(id: string, updateData: UpdateSaleDto): Promise<ISale> {
    try {
      // Prepare data - handle ObjectIds and Date conversions
      const preparedData: any = { ...updateData };

      // Convert products if provided
      if (updateData.products) {
        preparedData.products = updateData.products.map(product => ({
          ...product,
          product: new mongoose.Types.ObjectId(product.product)
        }));
      }

      // Convert buyer if provided
      if (updateData.buyer) {
        preparedData.buyer = new mongoose.Types.ObjectId(updateData.buyer);
      }

      // Convert date if provided
      if (updateData.saleDate) {
        preparedData.saleDate = new Date(updateData.saleDate);
      }

      const updatedSale = await SaleRepository.updateSale(id, preparedData);

      if (!updatedSale) {
        throw new Error(`Sale with ID ${id} not found`);
      }

      return updatedSale;
    } catch (error) {
      throw new Error(`Service error: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  // Update a sale by ID
  // updateSale: async (id: string, data: any) => {
  //   const updatedSale = await SaleRepository.updateSale(id, data);
  //   if (!updatedSale) {
  //     throw new Error('Sale not found');
  //   }
  //   return updatedSale;
  // },

  // Soft delete a sale by ID
  deleteSale: async (data: any) => {
    const deletedSale = await SaleRepository.deleteSale(data);
    if (!deletedSale) {
      throw new Error('Sale not found');
    }
    return { message: 'Sale deleted successfully' };
  },

  // Search sales by filters
  searchSales: async (filters: any) => {
    const query: any = {};

    if (filters.startDate || filters.endDate) {
      query.saleDate = {};
      if (filters.startDate) query.saleDate.$gte = new Date(filters.startDate);
      if (filters.endDate) query.saleDate.$lte = new Date(filters.endDate);
    }
    
    let buyersIds: any[] = [];
    if(filters.townName!=null && filters.townName.trim() != ''){
      const towns = await Town.find({ name: { $regex: filters.townName, $options: 'i' } });
      //buyer is array of buyers
  
      if (towns.length > 0) {
        const townsIds = towns.map((b:any)=>b._id);
        const buyersSameTown = await Buyer.find({ town: {$in: townsIds} });

        //now you have buyer's ids of the town 
        //so now you have to find sales on basis of buyer ids
        buyersIds = buyersSameTown.map((buyer:any)=>buyer._id);
      }
    }

    if(filters.buyerName!=null && filters.buyerName.trim() != ''){
      const buyers = await Buyer.find({ name: { $regex: filters.buyerName, $options: 'i' } });
      //buyer is array of buyers
  
      if (buyers.length > 0) {
        buyersIds.push(...buyers.map((b: any) => b._id));
      }
    }
    
    if (buyersIds.length > 0) {
      query.buyer = { $in: buyersIds };
    }

    //productName
    if(filters.productName!=null && filters.productName.trim() != ''){
      const products = await Product.find({ name: { $regex: filters.productName, $options: 'i' } });
      //buyer is array of buyers
      const productIds = products.map((p:any)=>p._id);

      query['products.product'] = { $in: productIds };
      
    }

    //invoiceNumber
    if(filters.invoiceNumber!=null && filters.invoiceNumber.trim() != ''){
      query.invoiceNumber = { $regex: filters.invoiceNumber, $options: 'i' };
    }

    const sale = await SaleRepository.search(query);
    return sale;
    
  },
};
