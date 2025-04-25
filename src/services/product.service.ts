import { ProductRepository } from "../repositories/product.repo";

export const ProductService = {
        getAllProducts: async (shopId: string) => await ProductRepository.getAllProducts(shopId),
        createProduct: async (data: any) => await ProductRepository.createProduct(data),
        updateProduct: async (data: any,id: string) => await ProductRepository.updateProduct(data,id),
        deleteProduct: async (id: any) => await ProductRepository.deleteProduct(id),
        searchProductsByName: async (query: string) => {
                // Clean the query parameter to exclude empty or invalid strings
                if (!query || query.trim() === "") {
                    return []; // Return an empty array if the query is empty or invalid
                }
        
                // Pass the cleaned query to the repository
                return await ProductRepository.searchProductsByName(query.trim());
        },
};
