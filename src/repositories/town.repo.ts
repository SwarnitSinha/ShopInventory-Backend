import { Town } from "../models/town.model";
import mongoose from 'mongoose'

export const TownRepository = {
  // Retrieve all towns
  getAllTowns: async (shopId: string) => {
    const towns = await Town.find({shopId: shopId}).sort({ name: 1 });
    return towns.map(town => ({
      ...town.toObject(),
      id: town._id,
      _id: undefined, // Remove _id from response
    }));
  },

  // Create a new town
  createTown: async (data: any) => {
    const newTown = new Town(data);
    await newTown.save();
    return { ...newTown.toObject(), id: newTown._id.toString(), _id: undefined };
  },

  // Update an existing town by ID
  updateTown: async (id: string, data: any) => {
    data.country = "India";
    console.log("UPDATING>>>> ",data);
    const updatedTown = await Town.findByIdAndUpdate(id, data, { new: true });
    if (!updatedTown) throw new Error("Town not found");
    return { ...updatedTown.toObject(), id: updatedTown._id.toString(), _id: undefined };
  },

  // Delete a town by ID
  deleteTown: async (id: string) => {
    const deletedTown = await Town.findByIdAndDelete(id);
    if (!deletedTown) throw new Error("Town not found");
    return { message: "Town deleted successfully" };
  },

  renameCollection : async (oldName:string, newName:string) => {
    try {
      const db = mongoose.connection.db;
      if (!db) {
        throw new Error('Database connection is not established.');
      }
      const collections = await db.listCollections({ name: oldName }).toArray();
  
      if (collections.length === 0) {
        return { success: false, message: `Collection '${oldName}' does not exist.` };
      }
  
      await db.collection(oldName).rename(newName);
      return { success: true, message: `Collection renamed from '${oldName}' to '${newName}'` };
    } catch (error) {
      console.error('Error renaming collection:', error);
      return { success: false, message: 'Error renaming collection.', error };
    //   return res.status(404).json({ message: "No record find!", error });
    }
  },

};
