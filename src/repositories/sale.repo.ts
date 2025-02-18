import { Sale } from "../models/sale.model";

export const SaleRepository = {
        getAllSales: async () => await Sale.find(),
        createSale: async (data: any) => await Sale.create(data),
};
