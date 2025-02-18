import { Product } from "../models/product.model";

export const ProductRepository = {
        getAllProducts: async () => await Product.find(),
        createProduct: async (data: any) => await Product.create(data),
};
