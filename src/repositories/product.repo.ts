import { Product } from "../models/product.model";

export const ProductRepository = {
        getAllProducts: async () => {
                const products = await Product.find();
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
        }
};
