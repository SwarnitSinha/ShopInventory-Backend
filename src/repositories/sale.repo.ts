import { Sale } from "../models/sale.model";
import { Product } from "../models/product.model";

export const SaleRepository = {
        getAllSales: async () => await Sale.find(),
        createSale: async (data: any) => {
                const sale = await Sale.create(data);
                //now decrease the amount of product
                const product = await Product.findById(data.productId);
                if (!product) {
                        throw new Error("Product not found");
                }
                product.quantity = (product.quantity ?? 0) - data.quantity;
                await product.save();
                return sale;

        }
};
