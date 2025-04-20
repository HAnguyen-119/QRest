import { OrderProps } from "@/constants/types";
import axiosClient from "./axiosClient";

export const fetchAPI = {
    getOrders: () => {
        return axiosClient.get('orders')
    },
    getFood: () => {
        return axiosClient.get('foods')
    },
    getCategories: () => {
        return axiosClient.get('categories')
    },
    getTables: () => {
        return axiosClient.get('restaurant_tables')
    },
    postOrder: (data: OrderProps | null) => {
        return axiosClient.post('orders', data)
    }
}