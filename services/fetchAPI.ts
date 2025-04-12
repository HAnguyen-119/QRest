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
    postOrder: (data: OrderProps) => {
        return axiosClient.post('orders', data)
    }
}