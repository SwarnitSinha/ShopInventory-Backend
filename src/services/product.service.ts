import { ProductRepository } from "../repositories/product.repo";

export const ProductService = {
        getAllProducts: async () => await ProductRepository.getAllProducts(),
        createProduct: async (data: any) => await ProductRepository.createProduct(data),
};
