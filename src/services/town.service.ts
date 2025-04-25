import { TownRepository } from "../repositories/town.repo";

export const TownService = {
        getAllTowns: async (shopId: string) => await TownRepository.getAllTowns(shopId),
        createTown: async (data: any) => await TownRepository.createTown(data),
        updateTown: async (id: string,data: any) => await TownRepository.updateTown(data,id),
        deleteTown: async (id: any) => await TownRepository.deleteTown(id),
};
