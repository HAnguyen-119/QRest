import { Authentication } from "@/constrants/types"

export const getUserPage = (user : Authentication) => {
    return `/${user.role}/dashboard`
}

