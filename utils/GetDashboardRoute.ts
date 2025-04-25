import { Authentication } from "@/constants/Types/authentication"

export const getUserPage = (user : Authentication) => {
    return `/${user.role}/dashboard`
}

