import { Product } from "../models/product.model";

export const ProductRepository = {
        getAllProducts: async () => {
                const products = await Product.find().sort({ name: 1 });
                return products.map(product => ({
                        ...product.toObject(),
                        id: product._id,
                        _id: undefined, // Remove _id from response
                    }));
        },
        createProduct: async (data: any) => {

                await Product.create(data)
        },
        updateProduct: async (data: any, id: string) => {
                const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
                if (!updatedProduct) throw new Error("Product not found");
                return { ...updatedProduct.toObject(), id: updatedProduct._id.toString(), _id: undefined };
                
        },
        deleteProduct: async (id: string) => {
                const deletedProduct = await Product.findByIdAndDelete(id);
                if (!deletedProduct) throw new Error("Product not found");
                return { message: "Product deleted successfully" };
        },
        searchProductsByName: async (query: string) => {
                // Perform a case-insensitive search for the word in both name and description
                const products = await Product.find({
                    $or: [
                        { name: { $regex: query, $options: "i" } }, // Search in name
                        { description: { $regex: query, $options: "i" } } // Search in description
                    ]
                });
            
                // Map the results to replace _id with id
                return products.map(product => ({
                    ...product.toObject(),
                    id: product._id,
                    _id: undefined, // Remove _id from response
                }));
            },
        
};
