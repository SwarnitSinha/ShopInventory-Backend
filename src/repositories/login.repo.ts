import { Shop } from "../models/shop.model"

export const LoginRepository = {
    validateUser: async (data: any) => await Shop.find()
}