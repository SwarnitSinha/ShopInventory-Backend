import { Buyer } from "../models/buyer.model";
import { Town } from "../models/town.model"; // Import the Town model if not already imported

export const BuyerRepository = {
  // Retrieve all buyers
  getAllBuyers: async (shopId: string) => {
    const buyers = await Buyer.find({shopId: shopId, isDeleted: false})
        .populate('town')
        .sort({name: 1});
    return buyers.map(buyer => ({
      ...buyer.toObject(),
      id: buyer._id,
      _id: undefined, // Remove _id from response
    }));
  },

  // Create a new buyer
  createBuyer: async (data: any, shopId: string) => {
    const { name, townId, phone, type } = data;

    // Validate the townId
    if (!townId) {
        throw new Error("Town ID is required");
    }
    const town = await Town.findById(townId);
    if (!town) {
        throw new Error("Invalid townId");
    }

    // Split the comma-separated names into an array
    const buyerNames = name.split(",").map((buyerName: string) => buyerName.trim());

    // Prepare an array of buyer objects to be inserted
    const buyersToCreate = buyerNames.map((buyerName: string) => ({
        name: buyerName,
        shopId,
        phone,
        type,
        town: town._id, // Map townId to town
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
    }));

    // Insert all buyers in one operation
    const createdBuyers = await Buyer.insertMany(buyersToCreate);

    // Return the created buyers with formatted response
    return createdBuyers.map((buyer) => ({
        ...buyer.toObject(),
        id: buyer._id.toString(),
        _id: undefined, // Remove _id from response
    }));
},

  // Update an existing buyer by ID
  updateBuyer: async (id: string, data: any, shopId: string) => {
    if (data.townId) {
      const town = await Town.findById(data.townId);
      if (!town) throw new Error("Invalid townId");
      data.town = town._id; // Map townId to town
      delete data.townId; // Remove townId from the data object
      data.updatedAt = new Date(); // Update the updatedAt field
    }
    const updatedBuyer = await Buyer.findByIdAndUpdate(id, data, { new: true });
    if (!updatedBuyer) throw new Error("Buyer not found");
    return { ...updatedBuyer.toObject(), id: updatedBuyer._id.toString(), _id: undefined };
  },

  // Delete a buyer by ID
  deleteBuyer: async (id: string, shopId: string) => {
    const deletedBuyer = await Buyer.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deletedBuyer) throw new Error("Buyer not found");
    return { message: "Buyer deleted successfully" };
  }
};
