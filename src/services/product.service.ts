import { ProductRepository } from "../repositories/product.repo";

export const ProductService = {
        getAllProducts: async () => await ProductRepository.getAllProducts(),
        createProduct: async (data: any) => await ProductRepository.createProduct(data),
        updateProduct: async (data: any,id: string) => await ProductRepository.updateProduct(data,id),
        deleteProduct: async (id: any) => await ProductRepository.deleteProduct(id),
};
