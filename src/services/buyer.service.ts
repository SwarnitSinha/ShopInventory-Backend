import { BuyerRepository } from "../repositories/buyer.repo";

export const buyerService = {
        getAllBuyers: async () => await BuyerRepository.getAllBuyers(),
        createBuyer: async (data: any) => await BuyerRepository.createBuyer(data),
        updateBuyer: async (id: string,data: any) => await BuyerRepository.updateBuyer(data,id),
        deleteBuyer: async (id: any) => await BuyerRepository.deleteBuyer(id),
};
