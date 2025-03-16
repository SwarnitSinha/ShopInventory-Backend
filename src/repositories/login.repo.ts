import { User } from "../models/user.model"

export const LoginRepository = {
    validateUser: async (data: any) => await User.find()
}