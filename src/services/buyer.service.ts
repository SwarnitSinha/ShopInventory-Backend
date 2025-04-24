import { BuyerRepository } from "../repositories/buyer.repo";

export const buyerService = {
        getAllBuyers: async (shopId: string) => await BuyerRepository.getAllBuyers(shopId),
        createBuyer: async (data: any,shopId: string) => await BuyerRepository.createBuyer(data,shopId),
        updateBuyer: async (id: string,data: any, shopId: string) => await BuyerRepository.updateBuyer(data,id,shopId),
        deleteBuyer: async (id: any, shopId: string) => await BuyerRepository.deleteBuyer(id,shopId),
};
