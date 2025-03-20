import { Sale } from '../models/sale.model';
import { Product } from '../models/product.model'; // Import the Product model

export const SaleRepository = {
  // Retrieve all sales
  getAllSales: async () => {
    return await Sale.find({ isDeleted: false }).populate('buyer product').sort({ createdAt: -1 });
  },

  // Retrieve a sale by ID
  getSaleById: async (id: string) => {
    return await Sale.findOne({ _id: id, isDeleted: false }).populate('buyer product');
  },

  // Create a new sale
  createSale: async (data: any) => {
    const product = await Product.findById(data.product);
    if (!product) throw new Error("Product not found");

    // Check if enough quantity is available
    if (product.quantity < data.quantity) {
      throw new Error("Insufficient product quantity");
    }

    // Decrease product quantity
    product.quantity -= data.quantity;
    await product.save();

    const newSale = new Sale(data);
    await newSale.save();

    return await Sale.findById(newSale._id).populate('buyer product');
  },

  // Update an existing sale by ID
  updateSale: async (id: string, data: any) => {
    const existingSale = await Sale.findById(id);
    if (!existingSale) throw new Error("Sale not found");

    const product = await Product.findById(data.product || existingSale.product);
    if (!product) throw new Error("Product not found");

    // Calculate the quantity difference
    const quantityDifference = (data.quantity || existingSale.quantity) - existingSale.quantity;

    // Adjust product quantity based on the difference
    if (quantityDifference > 0) {
      // Decrease product quantity if the new quantity is greater
      if (product.quantity < quantityDifference) {
        throw new Error("Insufficient product quantity");
      }
      product.quantity -= quantityDifference;
    } else {
      // Increase product quantity if the new quantity is less
      product.quantity += Math.abs(quantityDifference);
    }

    await product.save();

     // Update the sale
     await Sale.findByIdAndUpdate(id, data, { new: true });

     // Populate buyer and product details before returning
     return await Sale.findById(id).populate('buyer product');
   },

  // Soft delete a sale by ID
  deleteSale: async (data: any) => {
    return await Sale.findByIdAndUpdate(data.id, { isDeleted: true }, { new: true });
  },

  // Method to retrieve sales based on a filter
  getSalesByFilter: async (filter: any) => {
    return await Sale.find(filter)
      .populate('buyer product')
      .sort({ createdAt: -1 })
      .exec();
  },
};