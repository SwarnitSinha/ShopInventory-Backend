import { SaleRepository } from '../repositories/sale.repo';

export const SaleService = {
  // Fetch all sales
  getAllSales: async () => {
    return await SaleRepository.getAllSales();
  },

  // Fetch a sale by ID
  getSaleById: async (id: string) => {
    const sale = await SaleRepository.getSaleById(id);
    if (!sale || sale.isDeleted) {
      throw new Error('Sale not found');
    }
    return sale;
  },

  // Create a new sale
  createSale: async (data: any) => {
    return await SaleRepository.createSale(data);
  },

  // Update a sale by ID
  updateSale: async (id: string, data: any) => {
    const updatedSale = await SaleRepository.updateSale(id, data);
    if (!updatedSale) {
      throw new Error('Sale not found');
    }
    return updatedSale;
  },

  // Soft delete a sale by ID
  deleteSale: async (id: string) => {
    const deletedSale = await SaleRepository.deleteSale(id);
    if (!deletedSale) {
      throw new Error('Sale not found');
    }
    return { message: 'Sale deleted successfully' };
  },

  getFilteredSales: async (filter: any) => {
        return await SaleRepository.getSalesByFilter(filter);
      },
};
