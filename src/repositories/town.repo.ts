import { Town } from "../models/town.model";
import mongoose from 'mongoose'

export const TownRepository = {
  // Retrieve all towns
  getAllTowns: async (shopId: string) => {
    const towns = await Town.find({shopId: shopId, isDeleted: false}).sort({ name: 1 });
    return towns.map(town => ({
      ...town.toObject(),
      id: town._id,
      _id: undefined, // Remove _id from response
    }));
  },

  // Create a new town
  createTown: async (data: any) => {
    const { name, district, state, country = "India", shopId } = data;

    // Split the comma-separated names into an array
    const townNames = name.split(",").map((townName: string) => townName.trim());

    // Prepare an array of town objects to be inserted
    const townsToCreate = townNames.map((townName: string) => ({
        name: townName,
        district,
        state,
        country,
        shopId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
    }));

    // Insert all towns in one operation
    const createdTowns = await Town.insertMany(townsToCreate);

    // Return the created towns with formatted response
    return createdTowns.map((town) => ({
        ...town.toObject(),
        id: town._id.toString(),
        _id: undefined, // Remove _id from response
    }));
},

  // Update an existing town by ID
  updateTown: async (id: string, data: any) => {
    data.country = "India";
    console.log("UPDATING>>>> ",data);
    data.updatedAt = new Date();
    const updatedTown = await Town.findByIdAndUpdate(id, data, { new: true });
    if (!updatedTown) throw new Error("Town not found");
    return { ...updatedTown.toObject(), id: updatedTown._id.toString(), _id: undefined };
  },

  // Delete a town by ID
  deleteTown: async (id: string) => {
    const deletedTown = await Town.findByIdAndUpdate(id, {isDeleted: true}, { new: true });
    if (!deletedTown) throw new Error("Town not found");
    return { message: "Town deleted successfully" };
  },

  // renameCollection : async (oldName:string, newName:string) => {
  //   try {
  //     const db = mongoose.connection.db;
  //     if (!db) {
  //       throw new Error('Database connection is not established.');
  //     }
  //     const collections = await db.listCollections({ name: oldName }).toArray();
  
  //     if (collections.length === 0) {
  //       return { success: false, message: `Collection '${oldName}' does not exist.` };
  //     }
  
  //     await db.collection(oldName).rename(newName);
  //     return { success: true, message: `Collection renamed from '${oldName}' to '${newName}'` };
  //   } catch (error) {
  //     console.error('Error renaming collection:', error);
  //     return { success: false, message: 'Error renaming collection.', error };
  //   //   return res.status(404).json({ message: "No record find!", error });
  //   }
  // },

};
