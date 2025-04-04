import { Authentication } from "@/constants/types"

export const getUserPage = (user : Authentication) => {
    return `/${user.role}/dashboard`
}

