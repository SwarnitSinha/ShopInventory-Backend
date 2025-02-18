import { SaleRepository } from "../repositories/sale.repo";

export const SaleService = {
        getAllSales: async () => await SaleRepository.getAllSales(),
        createSale: async (data: any) => await SaleRepository.createSale(data),
};
