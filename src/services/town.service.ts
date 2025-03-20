import { TownRepository } from "../repositories/town.repo";

export const TownService = {
        getAllTowns: async () => await TownRepository.getAllTowns(),
        createTown: async (data: any) => await TownRepository.createTown(data),
        updateTown: async (id: string,data: any) => await TownRepository.updateTown(data,id),
        deleteTown: async (id: any) => await TownRepository.deleteTown(id),
};
